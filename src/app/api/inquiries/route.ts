import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

import { jsonError, toFieldErrors } from "@/lib/api-response"
import { prisma } from "@/lib/db"
import { env } from "@/lib/env"
import { forwardInquiry } from "@/lib/forward-inquiry"
import {
  buildReference,
  derivePriority,
  inquiryInputSchema,
  normalisePhone,
  resolveProgramme,
} from "@/lib/inquiry"
import { checkRateLimit } from "@/lib/rate-limit"
import { clientFingerprint } from "@/lib/request"
import { getAdminSession } from "@/lib/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const MAX_REFERENCE_ATTEMPTS = 4

/**
 * Public enquiry endpoint.
 *
 * The submission is durable in PostgreSQL before any outbound delivery is
 * attempted, so a downstream outage can never lose a prospective student.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const fingerprint = clientFingerprint(request)
  const limit = checkRateLimit(
    `inquiry:${fingerprint}`,
    env.rateLimitMax,
    env.rateLimitWindowMs,
  )

  if (!limit.allowed) {
    return jsonError(
      429,
      "Too many enquiries from this connection. Please try again shortly or email admissions directly.",
      undefined,
      { "retry-after": String(limit.retryAfterSeconds) },
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError(400, "The request body must be valid JSON.")
  }

  const parsed = inquiryInputSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(
      422,
      "Please correct the highlighted fields.",
      toFieldErrors(parsed.error.issues),
    )
  }

  const input = parsed.data

  // Honeypot hit: acknowledge without persisting so the bot learns nothing.
  if (input.company) {
    return NextResponse.json(
      { reference: buildReference(), status: "NEW" },
      { status: 201 },
    )
  }

  const { slug, level } = resolveProgramme(input.programme)
  const priority = derivePriority({
    message: input.message,
    programme: input.programme,
    intake: input.intake,
  })

  const created = await createWithUniqueReference({
    name: input.name,
    email: input.email,
    phone: normalisePhone(input.phone),
    programme: input.programme,
    programmeSlug: slug,
    level,
    intake: input.intake,
    message: input.message,
    source: input.source,
    consent: input.consent,
    priority,
    ipHash: fingerprint,
    userAgent: request.headers.get("user-agent")?.slice(0, 255) ?? null,
  })

  if (!created) {
    return jsonError(
      503,
      "We could not record your enquiry just now. Please try again in a moment.",
    )
  }

  const forwarded = await forwardInquiry({
    enquiry_id: created.reference,
    name: created.name,
    email: created.email,
    phone: created.phone,
    course: created.programme,
    intake: created.intake,
    message: created.message,
    source: created.source,
    consent: created.consent,
    received_at: created.createdAt.toISOString(),
  })

  if (forwarded.status === "delivered") {
    await prisma.inquiry.update({
      where: { id: created.id },
      data: {
        forwardedAt: new Date(),
        events: {
          create: { type: "FORWARDED", message: "Delivered to the configured endpoint." },
        },
      },
    })
  } else if (forwarded.status === "failed") {
    await prisma.inquiryEvent.create({
      data: {
        inquiryId: created.id,
        type: "FORWARD_FAILED",
        message: `Delivery failed: ${forwarded.reason}`,
      },
    })
  }

  return NextResponse.json(
    {
      reference: created.reference,
      status: created.status,
      priority: created.priority,
      receivedAt: created.createdAt.toISOString(),
    },
    { status: 201 },
  )
}

/** Authenticated queue read used by the admissions console. */
export async function GET(request: Request): Promise<NextResponse> {
  const session = await getAdminSession()
  if (!session) return jsonError(401, "Authentication required.")

  const url = new URL(request.url)
  const status = url.searchParams.get("status")
  const priority = url.searchParams.get("priority")
  const query = url.searchParams.get("q")?.trim()
  const takeParam = Number(url.searchParams.get("limit") ?? "50")
  const take = Number.isFinite(takeParam)
    ? Math.min(Math.max(Math.trunc(takeParam), 1), 200)
    : 50

  const where: Prisma.InquiryWhereInput = {}
  if (status && isStatus(status)) where.status = status
  if (priority && isPriority(priority)) where.priority = priority
  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
      { reference: { contains: query, mode: "insensitive" } },
      { programme: { contains: query, mode: "insensitive" } },
    ]
  }

  const inquiries = await prisma.inquiry.findMany({
    where,
    orderBy: [{ createdAt: "desc" }],
    take,
  })

  return NextResponse.json({ count: inquiries.length, inquiries })
}

async function createWithUniqueReference(
  data: Omit<Prisma.InquiryUncheckedCreateInput, "reference">,
) {
  for (let attempt = 0; attempt < MAX_REFERENCE_ATTEMPTS; attempt += 1) {
    try {
      return await prisma.inquiry.create({
        data: {
          ...data,
          reference: buildReference(),
          events: {
            create: {
              type: "CREATED",
              message: `Enquiry received from ${data.source ?? "website-form"}.`,
            },
          },
        },
      })
    } catch (error) {
      const isDuplicateReference =
        error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002"
      if (!isDuplicateReference) throw error
    }
  }
  return null
}

function isStatus(value: string): value is Prisma.InquiryWhereInput["status"] & string {
  return [
    "NEW",
    "IN_REVIEW",
    "CONTACTED",
    "APPLICATION_SENT",
    "ENROLLED",
    "CLOSED",
  ].includes(value)
}

function isPriority(
  value: string,
): value is Prisma.InquiryWhereInput["priority"] & string {
  return ["HOT", "WARM", "NURTURE"].includes(value)
}
