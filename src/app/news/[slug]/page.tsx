import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { PageHeader } from "@/components/site/page-header"
import { Section } from "@/components/ui/section"
import { getNewsPost, news } from "@/content/news"
import { formatDate } from "@/lib/format"

export function generateStaticParams(): Array<{ slug: string }> {
  return news.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getNewsPost(slug)
  if (!post) return { title: "Article not found" }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
    },
  }
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getNewsPost(slug)
  if (!post) notFound()

  return (
    <>
      <PageHeader
        eyebrow={`${post.category} · ${formatDate(post.publishedAt)}`}
        title={post.title}
        lede={post.excerpt}
      />

      <Section width="narrow">
        <article className="space-y-4 text-[17px]">
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
        <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
          Published by {post.author} on {formatDate(post.publishedAt)}.{" "}
          <Link href="/news" className="text-accent hover:underline">
            Back to news
          </Link>
        </p>
      </Section>
    </>
  )
}
