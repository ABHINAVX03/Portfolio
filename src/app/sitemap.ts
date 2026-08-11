// src/app/sitemap.ts
//
// FIX: Original only listed "/" — search engines couldn't discover
// the case study pages at /projects/[slug].
// Now includes one entry per registered case study.

import { MetadataRoute } from "next";
import { caseStudyRegistry } from "@/utils/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abhinavgupta.dev";
  const now = new Date();

  const caseStudyEntries = Object.keys(caseStudyRegistry).map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/now`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...caseStudyEntries,
  ];
}