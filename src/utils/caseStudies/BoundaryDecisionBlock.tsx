// src/components/CaseStudy/BoundaryDecisionBlock.tsx
//
// Renders one "where the boundary is drawn" entry: the question, the
// actual decision, the reasoning, and the honest tradeoff. Four short
// fields rather than one paragraph, because the tradeoff specifically
// needs to stay visually distinct -- it's the part that keeps this from
// reading like marketing copy. A decision with no stated cost is a sales
// pitch, not an engineering explanation.

import { BoundaryDecision } from "@/utils/caseStudies/types";

export default function BoundaryDecisionBlock({ decision }: { decision: BoundaryDecision }) {
  return (
    <div style={{
      padding: "22px 24px",
      borderRadius: 14,
      border: "1px solid rgba(255,255,255,0.07)",
      background: "rgba(255,255,255,0.025)",
    }}>
      <h3 style={{
        fontFamily: "var(--font-space-grotesk)", fontSize: 15.5, fontWeight: 700,
        color: "#f8fafc", margin: "0 0 14px", letterSpacing: "-0.01em",
      }}>
        {decision.question}
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Field label="Decision" color="#6366f1" text={decision.decision} />
        <Field label="Reasoning" color="#8b5cf6" text={decision.reasoning} />
        <Field label="Tradeoff" color="#fbbf24" text={decision.tradeoff} />
      </div>
    </div>
  );
}

function Field({ label, color, text }: { label: string; color: string; text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
      <span style={{
        fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.08em", textTransform: "uppercase", color,
        flexShrink: 0, width: 84, paddingTop: 2,
      }}>
        {label}
      </span>
      <p style={{
        fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6,
        color: "rgba(255,255,255,0.6)", margin: 0,
      }}>
        {text}
      </p>
    </div>
  );
}