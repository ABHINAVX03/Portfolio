import Link from "next/link";
import { getBlogPosts } from "@/utils/content/posts";
import TitleBlock from "@/components/DrawingSheet/TitleBlock";

export const metadata = {
  title: "Engineering Notes & Postmortems // Abhinav Gupta",
  description: "Technical writings on distributed systems, concurrency, and architecture tradeoffs.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="sheet-wrapper" style={{ paddingTop: "24px", paddingBottom: "64px" }}>
      <section className="sheet" style={{ maxWidth: "780px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/"
            className="btn-dwg"
            style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
          >
            ← Return to Index
          </Link>
        </div>

        <header style={{ marginBottom: "28px", borderBottom: "1px solid var(--hairline)", paddingBottom: "16px" }}>
          <p className="font-mono text-xs uppercase" style={{ color: "var(--accent)", fontWeight: 700, margin: "0 0 8px" }}>
            WRITING & ESSAYS // TECHNICAL DISPATCH
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 4vw, 34px)", margin: "0 0 10px" }}>
            Notes from the Build
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "15px" }}>
            Reflections on distributed systems design, concurrency primitives, and architectural tradeoffs.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="p-4 border border-[var(--hairline)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors block"
            >
              <div className="flex flex-col sm:flex-row justify-between sm:items-baseline gap-1 mb-2">
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "18px", fontWeight: 600, color: "var(--ink)", margin: 0 }}>
                  {post.title}
                </h2>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                  [{post.readTime}]
                </span>
              </div>

              <p style={{ margin: "0 0 12px", color: "var(--ink)", fontSize: "14px", lineHeight: "1.6" }}>
                {post.excerpt}
              </p>

              {post.tags && post.tags.length > 0 && (
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] text-[var(--muted)]"
                      style={{
                        padding: "2px 6px",
                        border: "1px solid var(--grid-line)",
                        backgroundColor: "#EFE9DD",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TitleBlock title="TECHNICAL DISPATCH" dwgNo="AG-WRIT-01" sheetNo={1} totalSheets={1} />
        </div>
      </section>
    </div>
  );
}
