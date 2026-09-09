export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  date?: string;
  tags?: string[];
  content: string;
}

export const staticPosts: BlogPost[] = [
  {
    slug: "building-resilient-apis",
    title: "Building resilient APIs with clear boundaries",
    excerpt: "A practical guide to thinking about contracts, errors, and service ownership.",
    readTime: "6 min read",
    date: "2026-03-15",
    tags: ["Backend", "Architecture", "APIs"],
    content: `## Designing for long-term maintainability

The biggest win in API design is not just shipping quickly, but keeping the contract honest enough that future changes do not become expensive rewrites.

When I build backend services, I think about the explicit boundary between transport, business logic, and persistence. That separation makes it easier to evolve a system without coupling every layer to the same failure mode.

A simple rule of thumb: if a change requires touching multiple layers for a single feature, the boundary is probably too vague.

## Clear Error Models & Idempotency

Client-facing APIs should never leak raw database exceptions or internal stack traces. Instead, map domain failures to deliberate error codes with contextual messages.

For mutating endpoints (like payments or state transitions), designing with idempotency keys guarantees that retried requests due to transient network drops don't create duplicate state.
`,
  },
  {
    slug: "designing-for-performance",
    title: "Designing for performance in modern React apps",
    excerpt: "How progressive enhancement, selective hydration, and intentional rendering make a difference.",
    readTime: "5 min read",
    date: "2026-04-02",
    tags: ["React", "Performance", "Next.js"],
    content: `## Performance is a product concern

A fast experience is invisible until it is missing. That is why I treat performance as a design constraint, not a later optimization pass.

By keeping state shaped intentionally, prioritizing content hierarchies, and deferring work that is not essential for the first paint, the UI feels more fluid without extra complexity.

## Selective Hydration and Island Architecture

Modern React with the Next.js App Router allows us to render heavy marketing sections as purely static HTML, reserving client-side JavaScript execution only for interactive widgets like filters, theme toggles, and dynamic animations.
`,
  },
];

/**
 * Fetches all blog posts.
 * If a Headless CMS or remote endpoint (CMS_API_URL / SANITY) is configured,
 * it fetches remote content with cache tags for ISR revalidation.
 * Otherwise, gracefully falls back to high-performance local static posts.
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  const remoteCmsUrl = process.env.CMS_API_URL;

  if (remoteCmsUrl) {
    try {
      const res = await fetch(`${remoteCmsUrl}/api/posts`, {
        headers: {
          Authorization: process.env.CMS_API_KEY ? `Bearer ${process.env.CMS_API_KEY}` : "",
        },
        next: { tags: ["posts"], revalidate: 3600 },
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch from remote CMS, falling back to static posts:", err);
    }
  }

  return staticPosts;
}

/**
 * Fetches a single blog post by its slug.
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}
