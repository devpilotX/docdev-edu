import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"

export const metadata: Metadata = {
  title: "Terms of use",
  description: "The terms that apply to use of the DarkDev EDU website.",
}

const clauses = [
  {
    heading: "Accuracy of information",
    body: "Programme structures, fees and deadlines are published in good faith and are correct at the time of publication. Where a change is unavoidable, applicants holding an offer are notified in writing.",
  },
  {
    heading: "Acceptable use",
    body: "Automated scraping, load testing and attempts to circumvent the enquiry rate limit are not permitted. Security research is welcome under the disclosure process in SECURITY.md.",
  },
  {
    heading: "Intellectual property",
    body: "The institute name, wordmark and school marks are the property of the institute. The source code of this website is released under the MIT licence.",
  },
  {
    heading: "Liability",
    body: "The website is provided without warranty of uninterrupted availability. Nothing in these terms limits liability that cannot be limited in law.",
  },
]

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Terms of use" />
      <Section width="narrow">
        <div className="space-y-8">
          {clauses.map((clause) => (
            <section key={clause.heading}>
              <h2 className="text-xl">{clause.heading}</h2>
              <p className="mt-2 text-[17px]">{clause.body}</p>
            </section>
          ))}
        </div>
      </Section>
    </>
  )
}
