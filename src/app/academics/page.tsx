import type { Metadata } from "next"
import Link from "next/link"

import { SchoolMark } from "@/components/brand/school-mark"
import { PageHeader } from "@/components/site/page-header"
import { ProgrammeCard } from "@/components/site/programme-card"
import { Card } from "@/components/ui/card"
import { Section, SectionHeading } from "@/components/ui/section"
import { programmeLevels, programmes, schools } from "@/content/programmes"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Undergraduate, graduate and professional programmes across the six schools of DarkDev EDU.",
}

export default async function AcademicsPage({
  searchParams,
}: {
  searchParams: Promise<{ level?: string }>
}) {
  const { level } = await searchParams
  const activeLevel = programmeLevels.find((value) => value === level)
  const visible = activeLevel
    ? programmes.filter((programme) => programme.level === activeLevel)
    : programmes

  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Programmes taught by people who practise them"
        lede="Every programme publishes its structure, entry requirements and assessment model in full before you apply."
      />

      <Section>
        <SectionHeading eyebrow="Schools" title="Where the teaching happens" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <li key={school.slug}>
              <Card className="h-full">
                <SchoolMark slug={school.slug} size={40} />
                <h3 className="mt-3 text-lg">{school.name}</h3>
                <p className="mt-2 text-sm text-muted">{school.summary}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface" id="programmes">
        <SectionHeading
          eyebrow="Programmes"
          title="Find a programme"
          lede="Filter by level, then read the full structure on the programme page."
        />

        <nav aria-label="Filter by level" className="mb-8 flex flex-wrap gap-2">
          <FilterLink href="/academics#programmes" active={!activeLevel}>
            All levels ({programmes.length})
          </FilterLink>
          {programmeLevels.map((value) => (
            <FilterLink
              key={value}
              href={`/academics?level=${encodeURIComponent(value)}#programmes`}
              active={activeLevel === value}
            >
              {value} (
              {programmes.filter((programme) => programme.level === value).length})
            </FilterLink>
          ))}
        </nav>

        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((programme) => (
            <li key={programme.slug}>
              <ProgrammeCard programme={programme} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string
  active: boolean
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={cn(
        "inline-flex min-h-11 items-center rounded-lg border px-4 text-sm font-medium",
        active
          ? "border-ink bg-ink text-white"
          : "border-line bg-white text-ink hover:bg-surface-2",
      )}
    >
      {children}
    </Link>
  )
}
