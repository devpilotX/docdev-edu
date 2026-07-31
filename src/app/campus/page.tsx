import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Card } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/ui/section"
import { campusFacilities, studentSupport } from "@/content/campus"

export const metadata: Metadata = {
  title: "Campus",
  description:
    "Facilities, housing, sport and student support on the DarkDev EDU campus in Patna.",
}

export default function CampusPage() {
  return (
    <>
      <PageHeader
        eyebrow="Campus"
        title="One campus, open to every school"
        lede="Workshops, studios, laboratories and the library are shared. Access is by induction, not by department."
      />

      <Section>
        <SectionHeading eyebrow="Facilities" title="What is on site" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {campusFacilities.map((facility) => (
            <li key={facility.title}>
              <Card className="h-full">
                <h3 className="text-lg">{facility.title}</h3>
                <p className="mt-2 text-sm text-muted">{facility.detail}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" width="narrow">
        <SectionHeading eyebrow="Support" title="Help when you need it" />
        <dl>
          {studentSupport.map((item) => (
            <div key={item.title} className="border-t border-line py-4">
              <dt className="font-semibold text-ink">{item.title}</dt>
              <dd className="mt-1 text-sm text-muted">{item.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  )
}
