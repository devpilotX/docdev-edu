import { toCsv } from "@/lib/csv"
import { jsonError } from "@/lib/api-response"
import { prisma } from "@/lib/db"
import { getAdminSession } from "@/lib/session"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const COLUMNS = [
  "reference",
  "received_at",
  "name",
  "email",
  "phone",
  "programme",
  "level",
  "intake",
  "status",
  "priority",
  "source",
  "consent",
  "message",
] as const

/** CSV export of the enquiry queue for reporting and CRM import. */
export async function GET(): Promise<Response> {
  const session = await getAdminSession()
  if (!session) return jsonError(401, "Authentication required.")

  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 5000,
  })

  const rows = inquiries.map((inquiry) => ({
    reference: inquiry.reference,
    received_at: inquiry.createdAt.toISOString(),
    name: inquiry.name,
    email: inquiry.email,
    phone: inquiry.phone,
    programme: inquiry.programme,
    level: inquiry.level,
    intake: inquiry.intake,
    status: inquiry.status,
    priority: inquiry.priority,
    source: inquiry.source,
    consent: inquiry.consent ? "yes" : "no",
    message: inquiry.message,
  }))

  const filename = `darkdev-edu-enquiries-${new Date().toISOString().slice(0, 10)}.csv`

  return new Response(toCsv(rows, [...COLUMNS]), {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="${filename}"`,
      "cache-control": "no-store",
    },
  })
}
