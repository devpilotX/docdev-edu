import type { Metadata } from "next"

import { PageHeader } from "@/components/site/page-header"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { faculty } from "@/content/faculty"

export const metadata: Metadata = {
  title: "Faculty",
  description: "Academic staff at DarkDev EDU, their research interests and teaching.",
}

export default function FacultyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Faculty"
        title="The people who teach here"
        lede="Practising academics and practitioners. Every member of faculty teaches at least one undergraduate module."
      />

      <Section>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faculty.map((member) => (
            <li key={member.slug}>
              <Card className="h-full">
                <span
                  aria-hidden="true"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink font-serif text-lg text-white"
                >
                  {member.initials}
                </span>
                <h2 className="mt-4 text-lg">{member.name}</h2>
                <p className="text-[13px] text-muted">
                  {member.title} · {member.school}
                </p>
                <p className="mt-3 text-sm">{member.biography}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {member.interests.map((interest) => (
                    <li
                      key={interest}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-ink-soft"
                    >
                      {interest}
                    </li>
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
