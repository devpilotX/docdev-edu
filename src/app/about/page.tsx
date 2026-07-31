import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { StatBand } from "@/components/site/stat-band"
import { Card } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/ui/section"
import { instituteStats, site } from "@/content/site"

export const metadata: Metadata = {
  title: "About the institute",
  description:
    "How DarkDev EDU is organised, what it teaches, and the principles behind its assessment and admissions practice.",
}

const principles = [
  {
    title: "Assess the work, not the essay",
    detail:
      "Coursework that runs, builds or measures carries more weight than written examinations in every taught programme.",
  },
  {
    title: "Publish the criteria",
    detail:
      "Entry requirements, marking rubrics and graduate outcomes are published in full, with the methodology attached.",
  },
  {
    title: "Teach in small groups",
    detail:
      "A one-to-eight staff ratio, with a named personal tutor for the full duration of every programme.",
  },
  {
    title: "Keep the doors open",
    detail:
      "Workshops, laboratories and the library are open to every school. Access is not rationed by department.",
  },
]

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="An institute organised around evidence"
        lede={`Founded in ${site.founded}, ${site.legalName} teaches technology and applied sciences to roughly 6,400 students on a single campus in Patna.`}
      />

      <StatBand stats={instituteStats} />

      <Section width="narrow">
        <SectionHeading eyebrow="Purpose" title="What the institute is for" />
        <div className="space-y-4 text-[17px]">
          <p>
            The institute exists to produce graduates who can do the work: specify a
            system, build it, measure it and explain it to someone who has to fund it.
            That commitment shapes the curriculum, the assessment model and the
            admissions process.
          </p>
          <p>
            Teaching is delivered by practising academics and practitioners. Every
            taught programme has at least one module assessed by a public presentation,
            because work that cannot be explained is not finished.
          </p>
          <p>
            Research is concentrated in eighteen centres and laboratories. Undergraduates
            can join a centre from the second year, and roughly a third do.
          </p>
        </div>
      </Section>

      <Section tone="surface">
        <SectionHeading eyebrow="Principles" title="Four commitments we hold ourselves to" />
        <ul className="grid gap-4 md:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title}>
              <Card className="h-full">
                <h3 className="text-lg">{principle.title}</h3>
                <p className="mt-2 text-sm text-muted">{principle.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section width="narrow">
        <SectionHeading eyebrow="Governance" title="How decisions are made" />
        <p className="text-[17px]">
          The institute is governed by a board of trustees, an academic senate and a
          student council with voting rights on teaching matters. Minutes of the senate
          are published within ten working days of each meeting, and the annual report,
          including audited accounts, is available on request from the registrar.
        </p>
      </Section>
    </>
  )
}
