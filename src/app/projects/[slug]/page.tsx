import { notFound } from "next/navigation";
import Link from "next/link";
import { caseStudyRegistry } from "@/utils/caseStudies";
import LifecycleDiagram from "@/utils/caseStudies/LifecycleDiagram";
import BoundaryDecisionBlock from "@/utils/caseStudies/BoundaryDecisionBlock";
import FailureScenarioCard from "@/utils/caseStudies/FailureScenarioCard";
import projectsData from "@/utils/projects/index.json";
import TitleBlock from "@/components/DrawingSheet/TitleBlock";

interface Project {
  id: string;
  name: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(caseStudyRegistry).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const content = caseStudyRegistry[slug];
  if (!content) return {};
  const project = (projectsData.projects as Project[]).find((p) => p.id === slug);
  return {
    title: `${project?.name ?? content.slug} — Case Study // Abhinav Gupta`,
    description: content.hero.claim,
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const content = caseStudyRegistry[slug];
  if (!content) notFound();

  const project = (projectsData.projects as Project[]).find((p) => p.id === slug);

  const hasFailureContent =
    content.failures.length > 0 &&
    !content.failures[0].title.startsWith("[FILL IN");

  return (
    <div className="sheet-wrapper" style={{ paddingTop: "24px", paddingBottom: "64px" }}>
      <article
        className="sheet"
        style={{
          maxWidth: "760px",
          margin: "0 auto",
        }}
      >
        {/* Navigation link back to Sheet 3 */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/#work"
            className="btn-dwg"
            style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
          >
            ← Return to Drawing List (Index)
          </Link>
        </div>

        {/* Case Study Header */}
        <header style={{ marginBottom: "36px", borderBottom: "1px solid var(--hairline)", paddingBottom: "20px" }}>
          <p
            className="font-mono text-xs uppercase"
            style={{ color: "var(--accent)", fontWeight: 700, margin: "0 0 10px" }}
          >
            TECHNICAL SPECIFICATION SHEET // {slug.toUpperCase()}
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(26px, 4vw, 36px)",
              lineHeight: 1.15,
              margin: "0 0 16px",
            }}
          >
            {content.hero.claim}
          </h1>
          <p
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "16px",
              lineHeight: 1.65,
              color: "var(--muted)",
              margin: 0,
            }}
          >
            {content.hero.subhead}
          </p>
        </header>

        {/* Lifecycle flow diagram */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              fontWeight: 600,
              margin: "0 0 16px",
            }}
          >
            Request Lifecycle & Execution Order
          </h2>
          <LifecycleDiagram steps={content.lifecycle} />
        </section>

        {/* Boundary decisions */}
        <section style={{ marginBottom: "48px" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "20px",
              fontWeight: 600,
              margin: "0 0 16px",
            }}
          >
            Architectural Boundary Decisions
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {content.decisions.map((d) => (
              <BoundaryDecisionBlock key={d.question} decision={d} />
            ))}
          </div>
        </section>

        {/* Failure Scenarios & Incident Postmortems */}
        {hasFailureContent && (
          <section style={{ marginBottom: "48px" }}>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "20px",
                fontWeight: 600,
                color: "var(--accent)",
                margin: "0 0 16px",
              }}
            >
              Failure Scenarios & Postmortems
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {content.failures.map((f) => (
                <FailureScenarioCard key={f.title} scenario={f} />
              ))}
            </div>
          </section>
        )}

        {/* Stack Specification & Repository Links */}
        <section
          style={{
            padding: "20px",
            border: "1px solid var(--hairline)",
            backgroundColor: "var(--paper)",
            marginBottom: "32px",
          }}
        >
          <h3
            className="font-mono text-xs uppercase"
            style={{ color: "var(--accent)", fontWeight: 700, margin: "0 0 16px" }}
          >
            COMPONENT STACK SPECIFICATION
          </h3>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "20px" }}>
            {content.stack.map((group) => (
              <div key={group.category}>
                <p
                  className="font-mono text-[10px] uppercase font-bold"
                  style={{ color: "var(--muted)", margin: "0 0 6px" }}
                >
                  {group.category}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-xs"
                      style={{
                        padding: "2px 8px",
                        border: "1px solid var(--grid-line)",
                        backgroundColor: "#EFE9DD",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {content.links.repo && (
              <a
                href={content.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dwg"
                style={{ height: "34px", minHeight: "34px", fontSize: "11px" }}
              >
                [ Source Repository ↗ ]
              </a>
            )}
            {content.links.deploy && (
              <a
                href={content.links.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-dwg btn-dwg-accent"
                style={{ height: "34px", minHeight: "34px", fontSize: "11px" }}
              >
                [ Live Production System ↗ ]
              </a>
            )}
          </div>
        </section>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          <TitleBlock
            title={`${(project?.name ?? slug).slice(0, 20).toUpperCase()} CS`}
            dwgNo={`AG-CS-${slug.slice(0, 4).toUpperCase()}`}
            sheetNo={1}
            totalSheets={1}
          />
        </div>
      </article>
    </div>
  );
}
