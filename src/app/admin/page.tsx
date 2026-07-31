import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"

import { signOut } from "@/app/admin/actions"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { prisma } from "@/lib/db"
import { formatDateTime } from "@/lib/format"
import { PRIORITY_LABELS, STATUS_LABELS, inquiryStatusValues } from "@/lib/inquiry"
import { getAdminSession } from "@/lib/session"

export const metadata: Metadata = {
  title: "Enquiry queue",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  const session = await getAdminSession()
  if (!session) redirect("/admin/login")

  const { status, q } = await searchParams
  const activeStatus = inquiryStatusValues.find((value) => value === status)
  const query = q?.trim()

  const [inquiries, counts, total] = await Promise.all([
    prisma.inquiry.findMany({
      where: {
        ...(activeStatus ? { status: activeStatus } : {}),
        ...(query
          ? {
              OR: [
                { name: { contains: query, mode: "insensitive" as const } },
                { email: { contains: query, mode: "insensitive" as const } },
                { reference: { contains: query, mode: "insensitive" as const } },
              ],
            }
          : {}),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.inquiry.groupBy({ by: ["status"], _count: { _all: true } }),
    prisma.inquiry.count(),
  ])

  const countFor = (value: string): number =>
    counts.find((row) => row.status === value)?._count._all ?? 0

  return (
    <div className="min-h-[80vh] bg-surface py-10">
      <Container width="wide">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl">Enquiry queue</h1>
            <p className="mt-1 text-sm text-muted">
              Signed in as {session.email} · {total} enquiries recorded
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/api/inquiries/export"
              className="inline-flex min-h-11 items-center rounded-lg border border-line bg-white px-5 text-sm font-semibold text-ink hover:bg-surface-2"
            >
              Export CSV
            </a>
            <form action={signOut}>
              <Button variant="secondary" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>

        <form className="mt-6 flex flex-wrap items-center gap-2" action="/admin">
          <input
            type="search"
            name="q"
            defaultValue={query ?? ""}
            placeholder="Search name, email or reference"
            className="h-11 min-w-[260px] flex-1 rounded-lg border border-line bg-white px-3 text-sm"
          />
          <select
            name="status"
            defaultValue={activeStatus ?? ""}
            className="h-11 rounded-lg border border-line bg-white px-3 text-sm"
          >
            <option value="">All statuses</option>
            {inquiryStatusValues.map((value) => (
              <option key={value} value={value}>
                {STATUS_LABELS[value]} ({countFor(value)})
              </option>
            ))}
          </select>
          <Button type="submit" variant="secondary">
            Filter
          </Button>
        </form>

        <div className="mt-6 overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Admissions enquiries</caption>
            <thead>
              <tr className="border-b border-line text-[12px] tracking-[0.08em] text-muted uppercase">
                <th scope="col" className="px-4 py-3 font-semibold">
                  Reference
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Applicant
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Programme
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Priority
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 font-semibold">
                  Received
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-muted">
                    No enquiries match this filter.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-3 font-mono text-[13px]">
                      <Link
                        href={`/admin/inquiries/${inquiry.id}`}
                        className="font-semibold text-accent hover:underline"
                      >
                        {inquiry.reference}
                      </Link>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block font-medium text-ink">{inquiry.name}</span>
                      <span className="block text-[13px] text-muted">{inquiry.email}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="block">{inquiry.programme}</span>
                      <span className="block text-[13px] text-muted">{inquiry.intake}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        tone={
                          inquiry.priority === "HOT"
                            ? "attention"
                            : inquiry.priority === "WARM"
                              ? "accent"
                              : "neutral"
                        }
                      >
                        {PRIORITY_LABELS[inquiry.priority]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{STATUS_LABELS[inquiry.status]}</td>
                    <td className="px-4 py-3 text-muted">
                      {formatDateTime(inquiry.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  )
}
