import type { MetadataRoute } from "next"

import { news } from "@/content/news"
import { programmes } from "@/content/programmes"
import { env } from "@/lib/env"

const staticRoutes = [
  "",
  "/about",
  "/academics",
  "/admissions",
  "/admissions/fees",
  "/admissions/enquiry",
  "/research",
  "/campus",
  "/faculty",
  "/news",
  "/events",
  "/contact",
  "/privacy",
  "/accessibility",
  "/terms",
]

export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.siteUrl.replace(/\/$/, "")
  const lastModified = new Date()

  return [
    ...staticRoutes.map((route) => ({
      url: `${base}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...programmes.map((programme) => ({
      url: `${base}/academics/${programme.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...news.map((post) => ({
      url: `${base}/news/${post.slug}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ]
}
