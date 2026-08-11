import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<string, { title: string; content: string; readTime: string }> = {
  "building-resilient-apis": {
    title: "Building resilient APIs with clear boundaries",
    readTime: "6 min read",
    content: `## Designing for long-term maintainability\n\nThe biggest win in API design is not just shipping quickly, but keeping the contract honest enough that future changes do not become expensive rewrites.\n\nWhen I build backend services, I think about the explicit boundary between transport, business logic, and persistence. That separation makes it easier to evolve a system without coupling every layer to the same failure mode.\n\nA simple rule of thumb: if a change requires touching multiple layers for a single feature, the boundary is probably too vague.\n`,
  },
  "designing-for-performance": {
    title: "Designing for performance in modern React apps",
    readTime: "5 min read",
    content: `## Performance is a product concern\n\nA fast experience is invisible until it is missing. That is why I treat performance as a design constraint, not a later optimization pass.\n\nBy keeping state shaped intentionally, prioritizing content hierarchies, and deferring work that is not essential for the first paint, the UI feels more fluid without extra complexity.\n`,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return { title: `${post.title} | Abhinav Gupta`, description: post.content.slice(0, 140) };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <main style={{ minHeight: "100vh", padding: "120px 24px 80px", maxWidth: "760px", margin: "0 auto" }}>
      <Link href="/blog" style={{ color: "#9fb3ff", textDecoration: "none", marginBottom: "20px", display: "inline-block" }}>← Back to blog</Link>
      <p style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#6366f1", fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase" }}>{post.readTime}</p>
      <h1 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: "#fff", margin: "0 0 16px" }}>{post.title}</h1>
      <div style={{ color: "rgba(255,255,255,0.78)", lineHeight: 1.8 }}>
        {post.content.split("\n").map((line) => {
          if (line.startsWith("## ")) return <h2 key={line} style={{ fontSize: "1.2rem", color: "#fff", marginTop: "24px" }}>{line.replace("## ", "")}</h2>;
          if (line.trim()) return <p key={line} style={{ marginBottom: "12px" }}>{line}</p>;
          return null;
        })}
      </div>
    </main>
  );
}
