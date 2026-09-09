import Link from "next/link";
import { getBlogPosts } from "@/utils/content/posts";

export const metadata = {
  title: "Blog | Abhinav Gupta",
  description: "Notes on software engineering, system design, and thoughtful product buildouts.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: "980px", margin: "0 auto" }}>
      <p style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#6366f1", letterSpacing: "0.16em", textTransform: "uppercase", fontSize: "0.75rem" }}>Writing</p>
      <h1 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3rem)", color: "#f8fafc", margin: "0 0 12px" }}>Notes from the build</h1>
      <p style={{ color: "rgba(255,255,255,0.7)", maxWidth: "700px", lineHeight: 1.7, marginBottom: "32px" }}>
        I write about the systems, tradeoffs, and product decisions behind the projects I ship.
      </p>
      <div style={{ display: "grid", gap: "16px" }}>
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", padding: "20px 22px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", textDecoration: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ fontSize: "1.1rem", color: "#fff", margin: 0 }}>{post.title}</h2>
              <span style={{ color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.75rem" }}>{post.readTime}</span>
            </div>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.68)", lineHeight: 1.6 }}>{post.excerpt}</p>
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
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
          </Link>
        ))}
      </div>
    </main>
  );
}
