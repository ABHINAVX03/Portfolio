// src/components/CaseStudy/LifecycleDiagram.tsx
//
// The signature element. Renders the actual request lifecycle as a
// vertical sequence -- not a generic boxes-and-arrows architecture
// diagram, but the specific order a ride moves through, with each step
// tagged by which service owns it. Steps marked isFailurePoint get an
// amber accent: "this is a boundary that mattered."
//
// Deliberately plain SVG, no chart library -- this needs to be exact and
// readable at a glance, not a generic chart-library default.

import { LifecycleStep } from "@/utils/caseStudies/types";

const ACCENT = "#6366f1";
const AMBER = "#fbbf24";
const NODE_R = 7;
const ROW_H = 92;

export default function LifecycleDiagram({ steps }: { steps: LifecycleStep[] }) {
  const width = 760;
  const height = steps.length * ROW_H + 24;
  const lineX = 32;
  const textX = 64;

  return (
    <div style={{
      padding: "32px 28px",
      borderRadius: 18,
      border: "1px solid rgba(99,102,241,0.18)",
      background: "rgba(10,10,20,0.7)",
      overflowX: "auto",
    }}>
      <p style={{
        fontFamily: "var(--font-jetbrains-mono)", fontSize: 10, fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
        margin: "0 0 24px",
      }}>
        Request lifecycle — one ride, in order
      </p>

      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img"
        aria-label="Diagram showing the sequence of a ride request: rider requests, system matches a driver, driver accepts, trip runs, fare is calculated, fare is settled. Each step labeled with the service that owns it.">
        {/* connecting spine */}
        <line x1={lineX} y1={12} x2={lineX} y2={height - 12}
          stroke="rgba(255,255,255,0.1)" strokeWidth={2} />

        {steps.map((step, i) => {
          const cy = 12 + i * ROW_H + ROW_H / 2 - ROW_H / 2 + 24;
          const color = step.isFailurePoint ? AMBER : ACCENT;
          return (
            <g key={step.id}>
              {/* node */}
              <circle cx={lineX} cy={cy} r={NODE_R} fill="#050508" stroke={color} strokeWidth={2.5} />
              {step.isFailurePoint && (
                <circle cx={lineX} cy={cy} r={NODE_R + 5} fill="none" stroke={color} strokeWidth={1} opacity={0.35} />
              )}

              {/* step label */}
              <text x={textX} y={cy - 12} fontFamily="var(--font-space-grotesk)" fontSize={15}
                fontWeight={700} fill="#f8fafc">
                {step.label}
              </text>

              {/* owning service tag */}
              <text x={textX} y={cy + 6} fontFamily="var(--font-jetbrains-mono)" fontSize={11}
                fontWeight={600} fill={color} letterSpacing="0.04em">
                {step.owningService.toUpperCase()}
              </text>

              {/* detail line, wrapped manually -- SVG has no native text
                  wrapping, and this content is short enough that one or
                  two foreignObject lines is simpler than a wrapping lib */}
              <foreignObject x={textX} y={cy + 16} width={width - textX - 16} height={ROW_H - 40}>
                <div style={{
                  fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.55,
                  color: "rgba(255,255,255,0.5)",
                }}>
                  {step.detail}
                </div>
              </foreignObject>
            </g>
          );
        })}
      </svg>

      {/* legend */}
      <div style={{ display: "flex", gap: 20, marginTop: 16, flexWrap: "wrap" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-jetbrains-mono)", fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", border: `2px solid ${ACCENT}`, display: "inline-block" }} />
          standard step
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-jetbrains-mono)", fontSize: 10.5, color: "rgba(255,255,255,0.4)" }}>
          <span style={{ width: 9, height: 9, borderRadius: "50%", border: `2px solid ${AMBER}`, display: "inline-block" }} />
          boundary that mattered
        </span>
      </div>
    </div>
  );
}