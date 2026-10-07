import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/utils/content/posts";
import TitleBlock from "@/components/DrawingSheet/TitleBlock";

export const dynamicParams = true;
export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.title} // Abhinav Gupta`,
    description: post.excerpt || post.content.slice(0, 140),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="sheet-wrapper" style={{ paddingTop: "24px", paddingBottom: "64px" }}>
      <article className="sheet" style={{ maxWidth: "760px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <Link
            href="/blog"
            className="btn-dwg"
            style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
          >
            ← Return to All Posts
          </Link>
        </div>

        <header style={{ marginBottom: "32px", borderBottom: "1px solid var(--hairline)", paddingBottom: "16px" }}>
          <div className="font-mono text-xs flex gap-3 items-center text-[var(--accent)] font-semibold mb-2">
            <span>[{post.readTime}]</span>
            {post.date && (
              <>
                <span className="text-[var(--muted)]">·</span>
                <span className="text-[var(--muted)]">{post.date}</span>
              </>
            )}
          </div>

          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(24px, 4vw, 36px)",
              lineHeight: 1.2,
              margin: "0 0 16px",
              color: "var(--ink)",
            }}
          >
            {post.title}
          </h1>

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
        </header>

        {/* Post Content */}
        <div
          className="prose"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "17px",
            lineHeight: "1.7",
            color: "var(--ink)",
            marginBottom: "40px",
          }}
        >
          {post.content.split("\n\n").map((para, i) => (
            <p key={i} style={{ marginBottom: "18px", maxWidth: "62ch" }}>
              {para}
            </p>
          ))}
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TitleBlock
            title={`${post.slug.slice(0, 15).toUpperCase()} DOC`}
            dwgNo={`AG-POST-${post.slug.slice(0, 3).toUpperCase()}`}
            sheetNo={1}
            totalSheets={1}
          />
        </div>
      </article>
    </div>
  );
}
