// src/app/projects/[slug]/not-found.tsx
//
// IMPORTANT: This file must live at exactly this path:
//   src/app/projects/[slug]/not-found.tsx
//
// The original was mistakenly placed at:
//   src/utils/caseStudies/not-found.tsx
//
// Next.js App Router only recognises not-found.tsx when it sits
// inside the route segment it should apply to. Anywhere else, it
// is just an unused React component — the framework never loads it,
// so unknown slugs throw a generic unhandled error instead of this page.

import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function CaseStudyNotFound() {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        textAlign: "center",
        padding: "0 24px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#6366f1",
          margin: 0,
        }}
      >
        Not found
      </p>
      <h1
        style={{
          fontFamily: "var(--font-space-grotesk)",
          fontSize: "clamp(24px, 4vw, 36px)",
          fontWeight: 700,
          color: "#f8fafc",
          margin: 0,
          letterSpacing: "-0.02em",
        }}
      >
        This case study doesn&apos;t exist
      </h1>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 14,
          color: "rgba(255,255,255,0.5)",
          margin: 0,
          maxWidth: 420,
        }}
      >
        The project you&apos;re looking for might have moved, or the link might
        be outdated.
      </p>
      <Link
        href="/#projects"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 8,
          padding: "11px 22px",
          borderRadius: 9999,
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          color: "#fff",
          fontFamily: "var(--font-body)",
          fontSize: 14,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        <FiArrowLeft size={14} /> Back to projects
      </Link>
    </div>
  );
}