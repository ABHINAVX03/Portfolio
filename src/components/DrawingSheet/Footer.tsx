import React from "react";
import Link from "next/link";
import { BUILD_INFO } from "@/config/buildInfo";

export default function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--hairline)",
        backgroundColor: "var(--paper)",
        padding: "32px 16px",
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
      }}
      role="contentinfo"
      aria-label="Drawing Set Footer"
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="font-bold text-[var(--ink)]">
              ABHINAV GUPTA // TECHNICAL DRAWING SPECIFICATION SET
            </span>
            <span className="text-[11px] text-[var(--muted)]">
              BUILD REV: {BUILD_INFO.commitHash} · DATE: {BUILD_INFO.commitDate} · A4 LANDSCAPE FORMAT
            </span>
          </div>

          {/* Subpage & Utility Links */}
          <nav
            aria-label="Footer Navigation"
            className="flex flex-wrap items-center gap-4 text-xs text-[var(--muted)]"
          >
            <Link href="/colophon" className="hover:text-[var(--accent)] underline">
              Colophon
            </Link>
            <Link href="/now" className="hover:text-[var(--accent)] underline">
              Now
            </Link>
            <Link href="/developer" className="hover:text-[var(--accent)] underline">
              API / Developer
            </Link>
            <Link href="/blog" className="hover:text-[var(--accent)] underline">
              Blog
            </Link>
            <a
              href="https://github.com/ABHINAVX03/Portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--accent)] underline"
            >
              Source Repo ↗
            </a>
          </nav>
        </div>

        <div className="pt-4 border-t border-[var(--grid-line)] flex flex-col sm:flex-row justify-between text-[11px] text-[var(--muted)]">
          <span>© {new Date().getFullYear()} Abhinav Gupta. All technical sheets open under MIT.</span>
          <span>NO TRACKERS · ZERO THIRD-PARTY ANALYTICS COOKIES · WCAG AA COMPLIANT</span>
        </div>
      </div>
    </footer>
  );
}
