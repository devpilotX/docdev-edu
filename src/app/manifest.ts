import type { MetadataRoute } from "next"

import { site } from "@/content/site"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.legalName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0e1116",
    icons: [
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/brand/logo-mark.svg", sizes: "any", type: "image/svg+xml" },
    ],
  }
}
