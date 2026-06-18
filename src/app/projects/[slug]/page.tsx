// src/app/projects/[slug]/page.tsx
//
// FIXES APPLIED:
// 1. params is now Promise<{slug:string}> — required in Next.js 15+
// 2. generateMetadata is async and awaits params
// 3. CaseStudyPage is async and awaits params
// Without these changes the page crashes at runtime with:
// "params should be awaited before using its properties"

import { notFound } from "next/navigation";
import Link from "next/link";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { caseStudyRegistry } from "@/utils/caseStudies";
import LifecycleDiagram from "@/utils/caseStudies/LifecycleDiagram";
import BoundaryDecisionBlock from "@/utils/caseStudies/BoundaryDecisionBlock";
import FailureScenarioCard from "@/utils/caseStudies/FailureScenarioCard";
import projectsData from "@/utils/projects/index.json";

// ✅ FIX: params is a Promise in Next.js 15+
interface PageProps {
  params: Promise<{ slug: string }>;
}

// Pre-render known case studies at build time rather than on first request.
export function generateStaticParams() {
  return Object.keys(caseStudyRegistry).map((slug) => ({ slug }));
}

// ✅ FIX: async + await params
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = caseStudyRegistry[slug];
  if (!content) return {};
  const project = (projectsData.projects as any[]).find((p) => p.id === slug);
  return {
    title: `${project?.name ?? content.slug} — Case Study | Abhinav Gupta`,
    description: content.hero.claim,
  };
}

// ✅ FIX: async + await params
export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const content = caseStudyRegistry[slug];
  if (!content) notFound();

  const project = (projectsData.projects as any[]).find((p) => p.id === slug);

  const hasFailureContent =
    content.failures.length > 0 &&
    !content.failures[0].title.startsWith("[FILL IN");

  return (
    <article
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        paddingTop: "100px",
        paddingBottom: "80px",
      }}
    >
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 24px" }}>

        {/* Back link */}
        <Link
          href="/#projects"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "var(--font-jetbrains-mono)",
            fontSize: 12,
            color: "rgba(255,255,255,0.5)",
            textDecoration: "none",
            marginBottom: 32,
          }}
        >
          <FiArrowLeft size={13} /> All projects
        </Link>

        {/* Hero */}
        <header style={{ marginBottom: 56 }}>
          <p
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#6366f1",
              margin: "0 0 16px",
            }}
          >
            Case Study
          </p>
          <h1
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              color: "#f8fafc",
              margin: "0 0 20px",
            }}
          >
            {content.hero.claim}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.55)",
              margin: 0,
              maxWidth: 640,
            }}
          >
            {content.hero.subhead}
          </p>
        </header>

        {/* Lifecycle diagram */}
        <section style={{ marginBottom: 64 }}>
          <LifecycleDiagram steps={content.lifecycle} />
        </section>

        {/* Boundary decisions */}
        <section style={{ marginBottom: hasFailureContent ? 64 : 56 }}>
          <h2
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: 22,
              fontWeight: 700,
              color: "#f8fafc",
              letterSpacing: "-0.02em",
              margin: "0 0 24px",
            }}
          >
            Where the boundaries are drawn
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {content.decisions.map((d) => (
              <BoundaryDecisionBlock key={d.question} decision={d} />
            ))}
          </div>
        </section>

        {/* Failure scenarios — only shown when real content exists */}
        {hasFailureContent && (
          <section style={{ marginBottom: 56 }}>
            <h2
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: 22,
                fontWeight: 700,
                color: "#f8fafc",
                letterSpacing: "-0.02em",
                margin: "0 0 24px",
              }}
            >
              What broke when a boundary was wrong
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {content.failures.map((f) => (
                <FailureScenarioCard key={f.title} scenario={f} />
              ))}
            </div>
          </section>
        )}

        {/* Stack + links */}
        <section
          style={{
            padding: "28px 32px",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(10,10,20,0.7)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 32,
              marginBottom: 24,
            }}
          >
            {content.stack.map((group) => (
              <div key={group.category}>
                <p
                  style={{
                    fontFamily: "var(--font-jetbrains-mono)",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "#6366f1",
                    margin: "0 0 10px",
                  }}
                >
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        fontFamily: "var(--font-jetbrains-mono)",
                        fontSize: 11,
                        padding: "4px 10px",
                        borderRadius: 8,
                        border: "1px solid rgba(99,102,241,0.25)",
                        background: "rgba(99,102,241,0.08)",
                        color: "#c7d2fe",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {content.links.repo && (
              <a
                href={content.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 18px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#f8fafc",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <FiGithub size={14} /> View source
              </a>
            )}
            {content.links.deploy && (
              <a
                href={content.links.deploy}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                <FiExternalLink size={14} /> Live demo
              </a>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}