// src/components/CaseStudy/FailureScenarioCard.tsx
//
// Renders one "what broke when a boundary was wrong" entry. This section
// only renders at all when content.failures has real entries (page.tsx
// already guards on that), so by the time this component runs, the
// content is assumed genuine -- this just needs to present it clearly,
// not hedge it.

import { FailureScenario } from "@/utils/caseStudies/types";

export default function FailureScenarioCard({ scenario }: { scenario: FailureScenario }) {
  return (
    <div style={{
      padding: "20px 22px",
      borderRadius: 14,
      border: "1px solid rgba(251,191,36,0.18)",
      background: "rgba(251,191,36,0.04)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 3,
        background: "#fbbf24",
      }} />

      <h3 style={{
        fontFamily: "var(--font-space-grotesk)", fontSize: 15, fontWeight: 700,
        color: "#f8fafc", margin: "0 0 10px", letterSpacing: "-0.01em",
      }}>
        {scenario.title}
      </h3>

      <p style={{
        fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.65,
        color: "rgba(255,255,255,0.6)", margin: "0 0 12px",
      }}>
        {scenario.whatHappened}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
          <strong style={{ color: "#fbbf24", fontWeight: 600 }}>Root cause: </strong>
          {scenario.rootCause}
        </span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 12.5, color: "rgba(255,255,255,0.45)" }}>
          <strong style={{ color: "#34d399", fontWeight: 600 }}>Fix: </strong>
          {scenario.fix}
        </span>
      </div>
    </div>
  );
}