// src/app/sitemap.ts
//
// FIX: Original only listed "/" — search engines couldn't discover
// the case study pages at /projects/[slug].
// Now includes one entry per registered case study.

import { MetadataRoute } from "next";
import { caseStudyRegistry } from "@/utils/caseStudies";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://abhinavgupta.dev";

  const caseStudyEntries = Object.keys(caseStudyRegistry).map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudyEntries,
  ];
}