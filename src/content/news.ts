export type NewsPost = {
  slug: string
  title: string
  category: "Admissions" | "Research" | "Campus" | "Institute"
  publishedAt: string
  author: string
  excerpt: string
  body: ReadonlyArray<string>
}

export const news: ReadonlyArray<NewsPost> = [
  {
    slug: "autumn-2026-admissions-open",
    title: "Applications open for the Autumn 2026 intake",
    category: "Admissions",
    publishedAt: "2026-06-02",
    author: "Office of Admissions",
    excerpt:
      "Undergraduate, graduate and professional applications are open, with a single deadline of 5 September 2026 across all schools.",
    body: [
      "Applications for the Autumn 2026 intake are now open across all six schools. The institute continues to operate a single application deadline: 5 September 2026, 23:59 IST.",
      "Applicants submit an academic record, evidence of prior work and a short technical statement. Interviews are held on a rolling basis from July, on campus or online, and conditional offers are issued within ten working days of interview.",
      "Scholarship decisions are made alongside the academic decision. Applicants do not need to submit a separate scholarship form.",
    ],
  },
  {
    slug: "microgrid-laboratory-commissioned",
    title: "Microgrid laboratory commissioned on the north campus",
    category: "Research",
    publishedAt: "2026-05-14",
    author: "School of Engineering",
    excerpt:
      "A 180 kW live microgrid, including battery storage and a protection test bench, is now available to taught and research students.",
    body: [
      "The microgrid laboratory has completed commissioning and is now supplying a portion of the north campus load under supervision.",
      "The facility includes battery storage, a photovoltaic array, a protection test bench and a control room instrumented for teaching. MEng Power Systems students will use it for the term-three project from September.",
    ],
  },
  {
    slug: "open-air-quality-dataset-2026",
    title: "Fourth annual air quality dataset released",
    category: "Research",
    publishedAt: "2026-04-28",
    author: "Urban Air Quality Network",
    excerpt:
      "Twelve months of calibrated readings from 64 city sensors, published openly with the full calibration methodology.",
    body: [
      "The Urban Air Quality Network has published its fourth annual dataset: twelve months of calibrated readings from 64 sensors across the city.",
      "The release includes raw readings, calibrated series, sensor metadata and the calibration code, so that results can be reproduced independently.",
    ],
  },
  {
    slug: "security-clinic-annual-report",
    title: "Security clinic completes 31 reviews for civic organisations",
    category: "Institute",
    publishedAt: "2026-03-19",
    author: "School of Computing",
    excerpt:
      "Student teams completed 31 supervised security reviews this academic year, all at no cost to the organisations involved.",
    body: [
      "The security clinic has published its annual report. Thirty-one supervised reviews were completed for non-profit and civic organisations during the academic year.",
      "Each review produced a written report, a remediation plan and a follow-up session. Aggregated, anonymised findings are published so that other organisations can act on the same patterns.",
    ],
  },
  {
    slug: "degree-show-2026",
    title: "Degree show 2026 opens to the public",
    category: "Campus",
    publishedAt: "2026-02-26",
    author: "School of Design",
    excerpt:
      "Final-year interaction design work is exhibited in the studio building for two weeks, open to all visitors.",
    body: [
      "The annual degree show opens in the studio building and runs for two weeks. Entry is free and no booking is required.",
      "Thirty-eight final-year projects are exhibited, alongside the process work that produced them.",
    ],
  },
  {
    slug: "placement-outcomes-2025-26",
    title: "Graduate outcomes reach 96% at six months",
    category: "Institute",
    publishedAt: "2026-01-15",
    author: "Office of the Registrar",
    excerpt:
      "The 2025 cohort reported 96% in graduate employment or further study within six months of completion.",
    body: [
      "The registrar has published verified outcomes for the 2025 graduating cohort: 96% in graduate-level employment or further study at six months.",
      "The full methodology, response rate and per-programme breakdown are published alongside the headline figure.",
    ],
  },
]

export function getNewsPost(slug: string): NewsPost | undefined {
  return news.find((post) => post.slug === slug)
}
