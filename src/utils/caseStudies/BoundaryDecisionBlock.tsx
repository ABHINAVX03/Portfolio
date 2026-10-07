import React from "react";
import { BoundaryDecision } from "@/utils/caseStudies/types";

export default function BoundaryDecisionBlock({ decision }: { decision: BoundaryDecision }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid var(--hairline)",
        backgroundColor: "var(--paper)",
        marginBottom: "16px",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "17px",
          fontWeight: 600,
          color: "var(--ink)",
          margin: "0 0 12px",
        }}
      >
        {decision.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Field label="DECISION" isAccent={false} text={decision.decision} />
        <Field label="REASONING" isAccent={false} text={decision.reasoning} />
        <Field label="TRADEOFF" isAccent={true} text={decision.tradeoff} />
      </div>
    </div>
  );
}

function Field({ label, isAccent, text }: { label: string; isAccent: boolean; text: string }) {
  return (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: isAccent ? "var(--accent)" : "var(--ink)",
          flexShrink: 0,
          width: "80px",
          paddingTop: "2px",
        }}
      >
        [{label}]
      </span>
      <p
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "var(--ink)",
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
}
