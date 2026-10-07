import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Colophon // Technical Specifications",
  description: "Colophon detailing the typography, architecture, hosting, and production toolchain of this portfolio.",
};

export default function ColophonPage() {
  return (
    <div className="sheet-wrapper" style={{ paddingTop: "32px", paddingBottom: "64px" }}>
      <section className="sheet" aria-labelledby="colophon-title">
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p className="font-mono text-xs uppercase" style={{ color: "var(--accent)", marginBottom: "8px" }}>
            SPEC_NOTES // META-01
          </p>
          <h1 id="colophon-title" style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", marginBottom: "24px" }}>
            Colophon
          </h1>

          <p style={{ marginBottom: "24px" }}>
            This personal engineering portfolio is designed as an architectural drawing set (Concept A) to communicate software and distributed systems specifications with precision, verifiable metrics, and zero marketing veneer.
          </p>

          <hr />

          <h2 style={{ fontSize: "1.25rem", margin: "24px 0 12px 0" }}>Technology Stack</h2>
          <table className="dwg-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Specification</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Framework</td>
                <td>Next.js 15 (App Router)</td>
                <td>React 18 Server Components & static generation</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>TypeScript 5</td>
                <td>Strict type safety</td>
              </tr>
              <tr>
                <td>Styling</td>
                <td>Tailwind CSS & CSS Custom Properties</td>
                <td>0px border radius, flat paper palette (#F3EFE6)</td>
              </tr>
              <tr>
                <td>Hosting & Edge</td>
                <td>Vercel</td>
                <td>Automated CI/CD git integration</td>
              </tr>
              <tr>
                <td>Source Repository</td>
                <td>GitHub</td>
                <td>
                  <a
                    href="https://github.com/ABHINAVX03/Portfolio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link"
                  >
                    ABHINAVX03/Portfolio
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ fontSize: "1.25rem", margin: "32px 0 12px 0" }}>Typography</h2>
          <table className="dwg-table">
            <thead>
              <tr>
                <th>Role</th>
                <th>Typeface</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Editorial / Body / Headings</td>
                <td>Newsreader</td>
                <td>Self-hosted via <code>next/font/google</code></td>
              </tr>
              <tr>
                <td>Metadata / Specifications / Code</td>
                <td>JetBrains Mono</td>
                <td>Self-hosted via <code>next/font/google</code></td>
              </tr>
              <tr>
                <td>Drawing Labels / Section Codes</td>
                <td>Barlow Condensed</td>
                <td>Self-hosted via <code>next/font/google</code></td>
              </tr>
            </tbody>
          </table>

          <h2 style={{ fontSize: "1.25rem", margin: "32px 0 12px 0" }}>Authoring & Assistance</h2>
          <p style={{ marginBottom: "16px" }}>
            Authored by Abhinav Gupta. The architectural drawing set redesign, accessibility audits, and k6/Git history extractions were refined with AI pair programming assistance via Antigravity. All metrics, microservice topology details, and failure postmortems derive directly from actual project repositories.
          </p>

          <div style={{ marginTop: "32px" }}>
            <Link href="/" className="btn-dwg">
              ← Return to Drawing Set Index
            </Link>
          </div>
        </div>

        {/* Title block */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "40px" }}>
          <div className="title-block">
            <div className="title-block-cell">
              <span className="title-block-label">TITLE</span>
              <span className="title-block-val">COLOPHON SPEC</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">DWG NO</span>
              <span className="title-block-val">AG-COL-01</span>
            </div>
            <div className="title-block-cell">
              <span className="title-block-label">DRAWN BY</span>
              <span className="title-block-val">ABHINAV GUPTA</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
