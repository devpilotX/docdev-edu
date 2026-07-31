import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "@/components/site/page-header"
import { Card } from "@/components/ui/card"
import { Section } from "@/components/ui/section"
import { news } from "@/content/news"
import { formatDate } from "@/lib/format"

export const metadata: Metadata = {
  title: "News",
  description: "Announcements, research releases and admissions updates from DarkDev EDU.",
}

export default function NewsPage() {
  return (
    <>
      <PageHeader
        eyebrow="News"
        title="From the institute"
        lede="Admissions updates, research releases and institutional reporting."
      />

      <Section>
        <ul className="grid gap-4 md:grid-cols-2">
          {news.map((post) => (
            <li key={post.slug}>
              <Card as="article" className="relative h-full">
                <p className="text-[12px] tracking-[0.08em] text-muted uppercase">
                  {post.category} · {formatDate(post.publishedAt)}
                </p>
                <h2 className="mt-3 text-xl">
                  <Link
                    href={`/news/${post.slug}`}
                    className="after:absolute after:inset-0 hover:underline"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              </Card>
            </li>
          ))}
        </ul>
      </Section>
    </>
  )
}
