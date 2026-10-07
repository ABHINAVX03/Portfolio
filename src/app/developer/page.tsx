import React from "react";
import Link from "next/link";
import ApiPlayground from "@/components/ApiPlayground/ApiPlayground";
import TitleBlock from "@/components/DrawingSheet/TitleBlock";

export const metadata = {
  title: "Developer Platform & REST APIs // Abhinav Gupta",
  description: "Headless public REST endpoints and JSON Resume schema specifications.",
};

export default function DeveloperPage() {
  return (
    <div className="sheet-wrapper" style={{ paddingTop: "24px", paddingBottom: "64px" }}>
      <section className="sheet" style={{ maxWidth: "800px", margin: "0 auto" }}>
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
            HEADLESS INTERFACE // REST & JSON SPEC
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 4vw, 34px)", margin: "0 0 10px" }}>
            Public Headless APIs & Schema
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "15px", lineHeight: "1.6" }}>
            This portfolio serves its projects, skills, and resume data through headless REST routes. All endpoints return normalized JSON.
          </p>
        </header>

        {/* Interactive API Sandbox */}
        <div style={{ marginBottom: "36px" }}>
          <div className="font-mono text-xs uppercase font-bold text-[var(--ink)] mb-2">
            REST API QUERY TERMINAL
          </div>
          <ApiPlayground />
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div
            style={{
              padding: "16px 20px",
              border: "1px solid var(--hairline)",
              backgroundColor: "var(--paper)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                fontWeight: 600,
                color: "var(--ink)",
                margin: "0 0 8px",
              }}
            >
              JSON Resume Standard
            </h2>
            <p style={{ margin: 0, color: "var(--ink)", fontSize: "13px", lineHeight: "1.6" }}>
              The <code>/api/v1/resume</code> endpoint strictly adheres to the open JSON Resume schema specification, allowing direct parsing by developer tooling and ATS pipelines.
            </p>
          </div>

          <div
            style={{
              padding: "16px 20px",
              border: "1px solid var(--hairline)",
              backgroundColor: "var(--paper)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "17px",
                fontWeight: 600,
                color: "var(--ink)",
                margin: "0 0 8px",
              }}
            >
              Single Data Source
            </h2>
            <p style={{ margin: 0, color: "var(--ink)", fontSize: "13px", lineHeight: "1.6" }}>
              Project counts, defensible skills, and verified metrics are derived from the central facts module across both UI sheets and JSON responses.
            </p>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TitleBlock title="HEADLESS API SPEC" dwgNo="AG-API-01" sheetNo={1} totalSheets={1} />
        </div>
      </section>
    </div>
  );
}
