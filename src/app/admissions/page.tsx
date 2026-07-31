import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { StepList } from "@/components/site/step-list"
import { ButtonLink } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/ui/section"
import { admissionDeadlines, admissionSteps, scholarships } from "@/content/admissions"

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "How to apply to DarkDev EDU: entry routes, deadlines, interviews, scholarships and the enquiry service.",
}

export default function AdmissionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="One application, published criteria, a written decision"
        lede="We assess evidence of work alongside the academic record. Every applicant is read by two academics."
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <SectionHeading eyebrow="Process" title="How to apply" />
            <StepList steps={admissionSteps} />
          </div>
          <Card className="h-fit">
            <h3 className="text-lg">Talk to the admissions office</h3>
            <p className="mt-2 text-sm text-muted">
              Enquiries are answered in writing within one working day, Monday to
              Saturday, 09:00 to 21:00 IST.
            </p>
            <div className="mt-5 flex flex-col gap-3">
              <ButtonLink href="/admissions/enquiry">Make an enquiry</ButtonLink>
              <ButtonLink href="/admissions/fees" variant="secondary">
                Fees and funding
              </ButtonLink>
            </div>
          </Card>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Dates" title="Deadlines by intake" />
        <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line bg-white">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">Application deadlines by intake</caption>
            <thead>
              <tr className="border-b border-line text-[12px] tracking-[0.08em] text-muted uppercase">
                <th scope="col" className="px-4 py-3 font-semibold">Intake</th>
                <th scope="col" className="px-4 py-3 font-semibold">Apply by</th>
                <th scope="col" className="px-4 py-3 font-semibold">Interviews</th>
                <th scope="col" className="px-4 py-3 font-semibold">Term begins</th>
              </tr>
            </thead>
            <tbody>
              {admissionDeadlines.map((row) => (
                <tr key={row.intake} className="border-b border-line last:border-0">
                  <th scope="row" className="px-4 py-3 text-left font-medium text-ink">
                    {row.intake}
                  </th>
                  <td className="px-4 py-3">{row.applyBy}</td>
                  <td className="px-4 py-3">{row.interviews}</td>
                  <td className="px-4 py-3">{row.termBegins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Funding"
          title="Scholarships and bursaries"
          lede="Every applicant is considered automatically. There is no separate scholarship application."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {scholarships.map((scholarship) => (
            <li key={scholarship.name}>
              <Card className="h-full">
                <h3 className="text-lg">{scholarship.name}</h3>
                <p className="mt-1 text-sm font-medium text-accent">{scholarship.award}</p>
                <p className="mt-2 text-sm text-muted">{scholarship.eligibility}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
