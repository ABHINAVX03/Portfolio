import { MetadataRoute } from "next";
import { caseStudyRegistry } from "@/utils/caseStudies";
import { getBlogPosts } from "@/utils/content/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://abhinavgupta.dev";
  const now = new Date();

  const caseStudyEntries = Object.keys(caseStudyRegistry).map((slug) => ({
    url: `${base}/projects/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = await getBlogPosts();
  const blogEntries = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "weekly" as const,
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
    ...blogEntries,
  ];
}