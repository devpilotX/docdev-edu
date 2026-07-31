import type { Metadata } from "next"
import Link from "next/link"
import { notFound, redirect } from "next/navigation"

import { updateInquiry } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Badge, Card } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Field, SelectInput, TextArea } from "@/components/ui/field"
import { prisma } from "@/lib/db"
import { formatDateTime } from "@/lib/format"
import {
  PRIORITY_LABELS,
  STATUS_LABELS,
  inquiryPriorityValues,
  inquiryStatusValues,
} from "@/lib/inquiry"
import { getAdminSession } from "@/lib/session"

export const metadata: Metadata = {
  title: "Enquiry detail",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function InquiryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const session = await getAdminSession()
  if (!session) redirect("/admin/login")

  const { id } = await params
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { events: { orderBy: { createdAt: "asc" } } },
  })

  if (!inquiry) notFound()

  return (
    <div className="min-h-[80vh] bg-surface py-10">
      <Container width="wide">
        <Link href="/admin" className="text-sm font-semibold text-accent hover:underline">
          ← Back to the queue
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h1 className="font-mono text-2xl">{inquiry.reference}</h1>
          <Badge>{STATUS_LABELS[inquiry.status]}</Badge>
          <Badge tone="neutral">{PRIORITY_LABELS[inquiry.priority]}</Badge>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-6">
            <Card>
              <h2 className="text-lg">Applicant</h2>
              <dl className="mt-4 grid gap-4 sm:grid-cols-2">
                <DetailItem label="Name" value={inquiry.name} />
                <DetailItem label="Email" value={inquiry.email} href={`mailto:${inquiry.email}`} />
                <DetailItem label="Phone" value={inquiry.phone} href={`tel:${inquiry.phone}`} />
                <DetailItem label="Programme" value={inquiry.programme} />
                <DetailItem label="Level" value={inquiry.level} />
                <DetailItem label="Intake" value={inquiry.intake} />
                <DetailItem label="Source" value={inquiry.source} />
                <DetailItem
                  label="Consent"
                  value={inquiry.consent ? "Given" : "Not given"}
                />
                <DetailItem
                  label="Received"
                  value={formatDateTime(inquiry.createdAt)}
                />
                <DetailItem
                  label="Forwarded"
                  value={
                    inquiry.forwardedAt ? formatDateTime(inquiry.forwardedAt) : "Not forwarded"
                  }
                />
              </dl>
              <div className="mt-5 border-t border-line pt-4">
                <h3 className="text-[13px] font-semibold text-ink">Message</h3>
                <p className="mt-2 text-sm whitespace-pre-line text-ink-soft">
                  {inquiry.message}
                </p>
              </div>
            </Card>

            <Card>
              <h2 className="text-lg">Audit trail</h2>
              <ol className="mt-4">
                {inquiry.events.map((event) => (
                  <li key={event.id} className="border-t border-line py-3 first:border-0 first:pt-0">
                    <p className="text-sm text-ink">{event.message}</p>
                    <p className="mt-1 text-[12px] text-muted">
                      {event.actor} · {formatDateTime(event.createdAt)}
                    </p>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <Card>
            <h2 className="text-lg">Update</h2>
            <form action={updateInquiry} className="mt-4">
              <input type="hidden" name="id" value={inquiry.id} />
              <Field label="Status" htmlFor="status">
                <SelectInput id="status" name="status" defaultValue={inquiry.status}>
                  {inquiryStatusValues.map((value) => (
                    <option key={value} value={value}>
                      {STATUS_LABELS[value]}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field label="Priority" htmlFor="priority">
                <SelectInput id="priority" name="priority" defaultValue={inquiry.priority}>
                  {inquiryPriorityValues.map((value) => (
                    <option key={value} value={value}>
                      {PRIORITY_LABELS[value]}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <Field
                label="Note"
                htmlFor="note"
                hint="Added to the audit trail with your name and the time."
              >
                <TextArea id="note" name="note" rows={4} />
              </Field>
              <Button type="submit" className="w-full">
                Save update
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  )
}

function DetailItem({
  label,
  value,
  href,
}: {
  label: string
  value: string
  href?: string
}) {
  return (
    <div>
      <dt className="text-[12px] tracking-[0.08em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-sm text-ink">
        {href ? (
          <a href={href} className="text-accent hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  )
}
