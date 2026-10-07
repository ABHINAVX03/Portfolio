import React from "react";
import Link from "next/link";
import TitleBlock from "@/components/DrawingSheet/TitleBlock";

export const metadata = {
  title: "Now // Technical Activity Log | Abhinav Gupta",
  description: "Current engineering focus, readings, and active systems research.",
};

export default function NowPage() {
  return (
    <div className="sheet-wrapper" style={{ paddingTop: "24px", paddingBottom: "64px" }}>
      <section className="sheet" style={{ maxWidth: "760px", margin: "0 auto" }}>
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
            FIELD REPORT // NOW
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(24px, 4vw, 32px)", margin: "0 0 10px" }}>
            Current Activity & Technical Focus
          </h1>
          <p style={{ color: "var(--muted)", margin: 0, fontSize: "15px" }}>
            Status record of engineering priorities, systems research, and active reading.
          </p>
        </header>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          {[
            {
              title: "Systems Engineering",
              body: "Benchmarking distributed microservices with k6, refining Neo4j Cypher traversals, and exploring event-driven consistency tradeoffs in Kafka.",
            },
            {
              title: "Literature & Study",
              body: "Reading Martin Kleppmann's Designing Data-Intensive Applications, deep-diving into Java 21 concurrency internals, and studying high-throughput database index designs.",
            },
            {
              title: "Formation at IIIT Vadodara",
              body: "Pursuing MCA degree coursework in advanced operating systems, graph algorithms, and cloud computing architectures.",
            },
          ].map((item) => (
            <div
              key={item.title}
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
                  margin: "0 0 6px",
                }}
              >
                {item.title}
              </h2>
              <p style={{ margin: 0, color: "var(--ink)", fontSize: "14px", lineHeight: "1.6" }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <TitleBlock title="FIELD LOG: NOW" dwgNo="AG-NOW-01" sheetNo={1} totalSheets={1} />
        </div>
      </section>
    </div>
  );
}
