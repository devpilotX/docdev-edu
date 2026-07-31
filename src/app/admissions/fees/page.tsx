import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { ButtonLink } from "@/components/ui/button"
import { Section, SectionHeading } from "@/components/ui/section"
import { feesNotes, scholarships } from "@/content/admissions"
import { programmes } from "@/content/programmes"
import { formatCurrencyINR } from "@/lib/format"

export const metadata: Metadata = {
  title: "Fees and funding",
  description:
    "Tuition for every DarkDev EDU programme, payment terms, and the scholarships and bursaries available.",
}

export default function FeesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Fees and funding"
        title="What study costs, in full"
        lede="Tuition is quoted per academic year and fixed for the duration of the programme. There are no compulsory additional charges."
      />

      <Section>
        <SectionHeading eyebrow="Tuition" title="Fees by programme" />
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Annual tuition by programme</caption>
            <thead>
              <tr className="border-b border-line bg-surface text-[12px] tracking-[0.08em] text-muted uppercase">
                <th scope="col" className="px-4 py-3 font-semibold">Programme</th>
                <th scope="col" className="px-4 py-3 font-semibold">Level</th>
                <th scope="col" className="px-4 py-3 font-semibold">Duration</th>
                <th scope="col" className="px-4 py-3 font-semibold">Tuition, per year</th>
              </tr>
            </thead>
            <tbody>
              {programmes.map((programme) => (
                <tr key={programme.slug} className="border-b border-line last:border-0">
                  <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                    {programme.title}
                  </th>
                  <td className="px-4 py-3">{programme.level}</td>
                  <td className="px-4 py-3">{programme.durationMonths} months</td>
                  <td className="px-4 py-3 font-medium text-ink">
                    {formatCurrencyINR(programme.annualFeeINR)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className="mt-6 space-y-2 text-sm text-muted">
          {feesNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" width="narrow">
        <SectionHeading eyebrow="Support" title="Reducing the cost" />
        <dl className="space-y-5">
          {scholarships.map((scholarship) => (
            <div key={scholarship.name} className="border-t border-line pt-4">
              <dt className="font-semibold text-ink">
                {scholarship.name} — {scholarship.award}
              </dt>
              <dd className="mt-1 text-sm text-muted">{scholarship.eligibility}</dd>
            </div>
          ))}
        </dl>
        <ButtonLink href="/admissions/enquiry" className="mt-8">
          Ask about funding
        </ButtonLink>
      </Section>
    </>
  )
}
