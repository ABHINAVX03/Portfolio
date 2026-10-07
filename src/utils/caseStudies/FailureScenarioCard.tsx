import React from "react";
import { FailureScenario } from "@/utils/caseStudies/types";

export default function FailureScenarioCard({ scenario }: { scenario: FailureScenario }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid var(--hairline)",
        borderLeft: "4px solid var(--accent)",
        backgroundColor: "var(--paper)",
        marginBottom: "16px",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 700,
          color: "var(--accent)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        INCIDENT POSTMORTEM RECORD
      </div>

      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "17px",
          fontWeight: 600,
          color: "var(--ink)",
          margin: "0 0 10px",
        }}
      >
        {scenario.title}
      </h3>

      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "14px",
          lineHeight: "1.65",
          color: "var(--ink)",
          margin: "0 0 12px",
        }}
      >
        {scenario.whatHappened}
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "13px", color: "var(--ink)" }}>
          <strong style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--accent)" }}>
            [ROOT CAUSE]:{" "}
          </strong>
          {scenario.rootCause}
        </div>
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "13px", color: "var(--ink)" }}>
          <strong style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink)" }}>
            [REMEDIATION & FIX]:{" "}
          </strong>
          {scenario.fix}
        </div>
      </div>
    </div>
  );
}
