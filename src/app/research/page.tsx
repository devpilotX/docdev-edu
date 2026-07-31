import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Card } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/ui/section"
import { researchCentres } from "@/content/research"

export const metadata: Metadata = {
  title: "Research",
  description:
    "Research centres and laboratories at DarkDev EDU, their leads, and what they publish.",
}

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Work that leaves the building"
        lede="Eighteen centres and laboratories, each with a published output commitment. Undergraduates can join a centre from the second year."
      />

      <Section>
        <SectionHeading eyebrow="Centres" title="Where the research happens" />
        <ul className="grid gap-4 md:grid-cols-2">
          {researchCentres.map((centre) => (
            <li key={centre.slug}>
              <Card className="h-full">
                <h3 className="text-lg">{centre.name}</h3>
                <p className="mt-1 text-[13px] text-muted">Led by {centre.lead}</p>
                <p className="mt-3 text-sm">{centre.summary}</p>
                <h4 className="mt-5 font-sans text-[12px] font-semibold tracking-[0.08em] text-muted uppercase">
                  Published output
                </h4>
                <ul className="mt-2 space-y-1 text-sm text-ink-soft">
                  {centre.outputs.map((output) => (
                    <li key={output}>{output}</li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
