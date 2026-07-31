import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { InquiryForm } from "@/components/inquiry/inquiry-form"
import { PageHeader } from "@/components/site/page-header"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { getProgramme, programmes } from "@/content/programmes"
import { formatCurrencyINR } from "@/lib/format"

export function generateStaticParams(): Array<{ slug: string }> {
  return programmes.map((programme) => ({ slug: programme.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const programme = getProgramme(slug)
  if (!programme) return { title: "Programme not found" }

  return {
    title: programme.title,
    description: programme.summary,
    openGraph: { title: programme.title, description: programme.summary },
  }
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const programme = getProgramme(slug)
  if (!programme) notFound()

  const related = programmes
    .filter((item) => item.school === programme.school && item.slug !== programme.slug)
    .slice(0, 3)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: programme.title,
    description: programme.summary,
    educationalCredentialAwarded: programme.award,
    provider: {
      "@type": "CollegeOrUniversity",
      name: "DarkDev EDU",
    },
  }

  return (
    <>
      <PageHeader
        eyebrow={programme.school}
        title={programme.title}
        lede={programme.summary}
      />

      <div className="border-b border-line bg-white">
        <dl className="mx-auto grid max-w-[1120px] grid-cols-2 gap-6 px-6 py-6 sm:px-8 lg:grid-cols-5">
          <Fact label="Award" value={programme.award} />
          <Fact label="Duration" value={`${programme.durationMonths} months`} />
          <Fact label="Credits" value={String(programme.credits)} />
          <Fact label="Mode" value={programme.mode} />
          <Fact
            label="Tuition, per year"
            value={formatCurrencyINR(programme.annualFeeINR)}
          />
        </dl>
      </div>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <h2 className="text-2xl">Overview</h2>
            <div className="mt-4 space-y-4 text-[17px]">
              {programme.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h2 className="mt-12 text-2xl">Structure</h2>
            <ol className="mt-4">
              {programme.structure.map((item) => (
                <li key={item.title} className="border-t border-line py-4">
                  <h3 className="font-sans text-[15px] font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{item.detail}</p>
                </li>
              ))}
            </ol>

            <h2 className="mt-12 text-2xl">Entry requirements</h2>
            <ul className="mt-4 space-y-2 text-[15px]">
              {programme.entryRequirements.map((requirement) => (
                <li key={requirement} className="border-t border-line py-3">
                  {requirement}
                </li>
              ))}
            </ul>

            <h2 className="mt-12 text-2xl">Where graduates go</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {programme.careers.map((career) => (
                <li
                  key={career}
                  className="rounded-full bg-surface-2 px-3 py-1.5 text-sm text-ink-soft"
                >
                  {career}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <InquiryForm defaultProgramme={programme.title} />
          </div>
        </div>
      </Section>

      {related.length > 0 ? (
        <Section tone="surface">
          <h2 className="mb-6 text-2xl">Also in the {programme.school}</h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Card as="article" className="relative h-full">
                  <h3 className="text-lg">
                    <Link
                      href={`/academics/${item.slug}`}
                      className="after:absolute after:inset-0 hover:underline"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted">{item.summary}</p>
                </Card>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[12px] tracking-[0.08em] text-muted uppercase">{label}</dt>
      <dd className="mt-1 text-[15px] font-medium text-ink">{value}</dd>
    </div>
  )
}
