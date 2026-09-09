import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPosts, getBlogPostBySlug } from "@/utils/content/posts";

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
    title: `${post.title} | Abhinav Gupta`,
    description: post.excerpt || post.content.slice(0, 140),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: "760px", margin: "0 auto" }}>
      <Link href="/blog" style={{ color: "#9fb3ff", textDecoration: "none", marginBottom: "20px", display: "inline-block", fontSize: "0.9rem" }}>
        ← Back to all posts
      </Link>
      <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
        <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#6366f1", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>
          {post.readTime}
        </span>
        {post.date && (
          <>
            <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>
              {post.date}
            </span>
          </>
        )}
      </div>
      <h1 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", margin: "0 0 16px", lineHeight: 1.2 }}>
        {post.title}
      </h1>
      {post.tags && post.tags.length > 0 && (
        <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.7rem",
                fontFamily: "var(--font-jetbrains-mono)",
                color: "#a5b4fc",
                background: "rgba(99,102,241,0.12)",
                padding: "3px 8px",
                borderRadius: "6px",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
      <div style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.8, fontSize: "1.05rem" }}>
        {post.content.split("\n\n").map((block, idx) => {
          if (block.startsWith("## ")) {
            return (
              <h2 key={idx} style={{ fontSize: "1.35rem", color: "#fff", marginTop: "36px", marginBottom: "12px", letterSpacing: "-0.01em" }}>
                {block.replace("## ", "")}
              </h2>
            );
          }
          if (block.startsWith("# ")) {
            return (
              <h1 key={idx} style={{ fontSize: "1.6rem", color: "#fff", marginTop: "40px", marginBottom: "16px" }}>
                {block.replace("# ", "")}
              </h1>
            );
          }
          if (block.trim()) {
            return (
              <p key={idx} style={{ marginBottom: "18px" }}>
                {block}
              </p>
            );
          }
          return null;
        })}
      </div>
    </main>
  );
}
