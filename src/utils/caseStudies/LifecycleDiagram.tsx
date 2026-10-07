import React from "react";
import { LifecycleStep } from "@/utils/caseStudies/types";

const INK = "#1B1F2A";
const ACCENT = "#C23B22";
const ROW_H = 88;

export default function LifecycleDiagram({ steps }: { steps: LifecycleStep[] }) {
  const width = 680;
  const height = steps.length * ROW_H + 32;
  const lineX = 24;
  const textX = 52;

  return (
    <div
      style={{
        padding: "24px 20px",
        border: "1px solid var(--hairline)",
        backgroundColor: "var(--paper)",
        overflowX: "auto",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--accent)",
          margin: "0 0 20px",
        }}
      >
        LIFECYCLE SCHEMATIC // FLOW DIAGRAM
      </p>

      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Lifecycle diagram showing the sequential flow of requests across system components"
      >
        {/* Connecting spine */}
        <line
          x1={lineX}
          y1={16}
          x2={lineX}
          y2={height - 24}
          stroke={INK}
          strokeWidth={1.5}
        />

        {steps.map((step, i) => {
          const cy = 20 + i * ROW_H + 16;
          const isCritical = step.isFailurePoint;
          const nodeColor = isCritical ? ACCENT : INK;

          return (
            <g key={step.id}>
              {/* Node marker (callout balloon shape) */}
              <circle
                cx={lineX}
                cy={cy}
                r={8}
                fill="#F3EFE6"
                stroke={nodeColor}
                strokeWidth={2}
              />

              {/* Step Title */}
              <text
                x={textX}
                y={cy - 4}
                fontFamily="var(--font-serif)"
                fontSize={16}
                fontWeight={600}
                fill={INK}
              >
                {step.label}
              </text>

              {/* Owning Service / Boundary tag */}
              <text
                x={textX}
                y={cy + 14}
                fontFamily="var(--font-mono)"
                fontSize={11}
                fontWeight={700}
                fill={isCritical ? ACCENT : "var(--muted)"}
              >
                [{step.owningService}] {isCritical ? "★ CRITICAL BOUNDARY" : ""}
              </text>

              {/* Step Detail */}
              <text
                x={textX}
                y={cy + 32}
                fontFamily="var(--font-serif)"
                fontSize={13}
                fill="#3A3E4A"
              >
                {step.detail.length > 90
                  ? `${step.detail.slice(0, 90)}...`
                  : step.detail}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
