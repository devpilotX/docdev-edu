import { Prisma } from "@prisma/client"
import { NextResponse } from "next/server"

import { jsonError, toFieldErrors } from "@/lib/api-response"
import { prisma } from "@/lib/db"
import { inquiryUpdateSchema, STATUS_LABELS } from "@/lib/inquiry"
import { getAdminSession } from "@/lib/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const session = await getAdminSession()
  if (!session) return jsonError(401, "Authentication required.")

  const { id } = await context.params
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { events: { orderBy: { createdAt: "asc" } } },
  })

  if (!inquiry) return jsonError(404, "Enquiry not found.")
  return NextResponse.json({ inquiry })
}

/** Status, priority and note updates. Every change writes an audit event. */
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const session = await getAdminSession()
  if (!session) return jsonError(401, "Authentication required.")

  const { id } = await context.params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError(400, "The request body must be valid JSON.")
  }

  const parsed = inquiryUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return jsonError(422, "Invalid update.", toFieldErrors(parsed.error.issues))
  }

  const { status, priority, note } = parsed.data
  if (!status && !priority && !note) {
    return jsonError(422, "Provide a status, a priority or a note.")
  }

  const existing = await prisma.inquiry.findUnique({ where: { id } })
  if (!existing) return jsonError(404, "Enquiry not found.")

  const events: Prisma.InquiryEventCreateWithoutInquiryInput[] = []
  if (status && status !== existing.status) {
    events.push({
      type: "STATUS_CHANGED",
      message: `Status changed from ${STATUS_LABELS[existing.status]} to ${STATUS_LABELS[status]}.`,
      actor: session.email,
    })
  }
  if (priority && priority !== existing.priority) {
    events.push({
      type: "STATUS_CHANGED",
      message: `Priority changed from ${existing.priority} to ${priority}.`,
      actor: session.email,
    })
  }
  if (note) {
    events.push({ type: "NOTE_ADDED", message: note, actor: session.email })
  }

  const updated = await prisma.inquiry.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(priority ? { priority } : {}),
      ...(events.length > 0 ? { events: { create: events } } : {}),
    },
    include: { events: { orderBy: { createdAt: "asc" } } },
  })

  return NextResponse.json({ inquiry: updated })
}
