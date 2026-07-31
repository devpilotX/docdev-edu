import Link from "next/link"

import { SchoolMark } from "@/components/brand/school-mark"
import { InquiryForm } from "@/components/inquiry/inquiry-form"
import { ProgrammeCard } from "@/components/site/programme-card"
import { StatBand } from "@/components/site/stat-band"
import { StepList } from "@/components/site/step-list"
import { ButtonLink } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Container } from "@/components/ui/container"
import { Section, SectionHeading } from "@/components/ui/section"
import { admissionSteps } from "@/content/admissions"
import { news } from "@/content/news"
import { programmes, schools } from "@/content/programmes"
import { instituteStats, site } from "@/content/site"
import { formatDate } from "@/lib/format"

const featured = programmes.slice(0, 3)
const latest = news.slice(0, 3)

export default function HomePage() {
  return (
    <>
      <section className="border-b border-line bg-ink">
        <Container>
          <div className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="mb-5 text-xs font-semibold tracking-[0.18em] text-accent-light uppercase">
                Admissions open · Autumn 2026
              </p>
              <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] text-white">
                {site.tagline}
              </h1>
              <p className="mt-6 max-w-[58ch] text-[17px] text-white/70">
                Six schools, forty-two degree programmes and a teaching model built
                around evidence: coursework that runs, laboratories that are open, and
                supervisors who know your name.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/admissions/enquiry" size="lg" variant="secondary">
                  Make an enquiry
                </ButtonLink>
                <ButtonLink href="/academics" size="lg" variant="inverse">
                  Browse programmes
                </ButtonLink>
              </div>
            </div>

            <Card className="bg-white/[0.04] text-white/70 backdrop-blur">
              <h2 className="font-sans text-[13px] font-semibold tracking-[0.14em] text-white uppercase">
                Key dates
              </h2>
              <dl className="mt-4 text-sm">
                {[
                  ["Applications open", "2 June 2026"],
                  ["Open day", "16 August 2026"],
                  ["Application deadline", "5 September 2026"],
                  ["Term begins", "5 October 2026"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-t border-line-inverse py-3 first:border-0 first:pt-0"
                  >
                    <dt>{label}</dt>
                    <dd className="font-medium text-white">{value}</dd>
                  </div>
                ))}
              </dl>
            </Card>
          </div>
        </Container>
      </section>

      <StatBand stats={instituteStats} />

      <Section>
        <SectionHeading
          eyebrow="Schools"
          title="Six schools, one campus"
          lede="Every school shares the same workshops, laboratories and library, so interdisciplinary work is the default rather than the exception."
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <li key={school.slug}>
              <Card className="h-full">
                <SchoolMark slug={school.slug} />
                <h3 className="mt-4 text-lg">{school.name}</h3>
                <p className="mt-2 text-sm text-muted">{school.summary}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {school.focus.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-surface-2 px-2.5 py-1 text-[12px] text-ink-soft"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Study"
            title="Programmes for the Autumn intake"
            lede="Undergraduate, graduate and professional routes, all assessed on work you can show."
            className="mb-0"
          />
          <Link
            href="/academics"
            className="mb-2 text-sm font-semibold text-accent hover:underline"
          >
            All 42 programmes →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((programme) => (
            <li key={programme.slug}>
              <ProgrammeCard programme={programme} />
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Admissions"
              title="Four steps, no guesswork"
              lede="Published criteria, a single deadline, and a written decision within ten working days of interview."
            />
            <StepList steps={admissionSteps} />
            <ButtonLink href="/admissions" variant="secondary" className="mt-6">
              Read the full process
            </ButtonLink>
          </div>
          <div id="enquiry">
            <InquiryForm />
          </div>
        </div>
      </Section>

      <Section tone="surface">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="News"
            title="From the institute"
            className="mb-0"
          />
          <Link href="/news" className="mb-2 text-sm font-semibold text-accent hover:underline">
            All news →
          </Link>
        </div>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {latest.map((post) => (
            <li key={post.slug}>
              <Card as="article" className="relative h-full">
                <p className="text-[12px] tracking-[0.08em] text-muted uppercase">
                  {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h3 className="mt-3 text-lg">
                  <Link
                    href={`/news/${post.slug}`}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
