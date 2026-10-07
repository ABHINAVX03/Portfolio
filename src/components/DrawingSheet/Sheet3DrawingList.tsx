import React from "react";
import Link from "next/link";
import SheetFrame from "./SheetFrame";
import { FACTS } from "@/config/facts";

interface DrawingProject {
  dwgNo: string;
  title: string;
  stack: string;
  status: string;
  repo: string;
  deploy?: string;
  caseStudy?: string;
  summary: string;
  incidentOrNote?: {
    label: string;
    text: string;
  };
}

const PROJECTS: DrawingProject[] = [
  {
    dwgNo: "AG-003-A",
    title: "BookKaro — Ride-Hailing REST Architecture",
    stack: "Java 21 · Spring Boot · PostgreSQL · PostGIS · Docker",
    status: "COMPLETED",
    repo: "https://github.com/ABHINAVX03/Book_Karo-backend-Spring-boot-",
    deploy: "https://book-car-frontend.vercel.app",
    caseStudy: "/projects/bookkaro",
    summary:
      "Ride-booking platform with PostGIS spatial tracking, driver-matching boundaries, and fare calculation derived from actual trip completion records rather than initial request estimates.",
    incidentOrNote: {
      label: "POSTMORTEM // RAILWAY-VERCEL CORS OUTAGE",
      text:
        "Symptom: Vercel frontend experienced total API connectivity loss with CORS errors while the Railway backend remained trapped in a crash loop. Root Cause: Backend startup validation threw an IllegalStateException if localhost was present in allowed CORS origins under the prod profile; application-prod.properties mistakenly still contained localhost entries alongside production URLs. Fix: Stripped localhost entries from production properties, restoring backend initialization and API availability.",
    },
  },
  {
    dwgNo: "AG-003-B",
    title: "CPSync — Contest Aggregation & Calendar Engine",
    stack: "Java 21 · Spring Boot · Google Calendar API v3 · Caffeine · Flyway",
    status: "COMPLETED",
    repo: "https://github.com/ABHINAVX03/cp-sync-backend-",
    deploy: "https://cp-sync-frontend.vercel.app",
    summary:
      FACTS.CPSYNC?.shortDescription ||
      "Automated calendar sync service aggregating contests across Codeforces, LeetCode, CodeChef, and AtCoder using Caffeine caching and Spring Boot.",
    incidentOrNote: {
      label: "CONCURRENCY // VIRTUAL THREADS & FETCHER DEADLOCK",
      text:
        "Resolved contest fetcher timeout and deadlock incidents by migrating platform scraping workers to Java 21 Virtual Threads with bounded HTTP client timeouts and eager Caffeine cache warming. Scheduled background synchronization executes daily at 3:00 AM.",
    },
  },
  {
    dwgNo: "AG-003-C",
    title: "AapkaCoach — AI Diet & Fitness Platform",
    stack: "Next.js 16 · React 19 · Supabase · Cashfree · Tailwind CSS",
    status: "COMPLETED",
    repo: "https://github.com/ABHINAVX03/Aapka-Couch",
    deploy: "https://aapka-couch.vercel.app",
    summary:
      "AI-driven fitness and nutrition platform generating tailored 7-day Indian meal plans, workout splits, and body recomposition tracking with Cashfree payment gateway integration.",
  },
  {
    dwgNo: "AG-003-D",
    title: "Portfolio — Engineering Drawing Specification System",
    stack: "Next.js 15 · TypeScript · Tailwind CSS · Vercel",
    status: "ACTIVE",
    repo: "https://github.com/ABHINAVX03/Portfolio",
    deploy: "https://portfolio-beta-smoky-46.vercel.app",
    summary:
      "Lightweight engineering drawing system replacing template visuals with zero-radius hairlines, tabular data, and verifiable project evidence.",
  },
];

export default function Sheet3DrawingList() {
  return (
    <SheetFrame id="work" title="DRAWING LIST: PROJECT INDEX" dwgNo="AG-003" sheetNo={3}>
      <div className="flex flex-col gap-6">
        <div className="border-b border-[var(--hairline)] pb-2 flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              PROJECT REGISTER // SUBSYSTEM INDEX
            </span>
            <h2 id="work-heading" className="text-2xl sm:text-3xl font-semibold">
              Drawing List: Core Engineering Systems
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--muted)]">
            INTERACTION 2: EXPAND ROWS VIA DETAILS
          </span>
        </div>

        <p className="text-sm text-[var(--muted)] max-w-[70ch]">
          Each row represents an independently versioned project repository. Expand rows to review architecture notes, incident postmortems, and deployment links.
        </p>

        {/* Technical Drawing List Table / Accordion */}
        <div className="border border-[var(--hairline)] bg-[var(--paper)]">
          {/* Header row */}
          <div className="hidden md:grid grid-cols-12 font-mono text-xs font-bold uppercase p-3 border-b border-[var(--hairline)] bg-[rgba(27,31,42,0.04)] text-[var(--ink)]">
            <div className="col-span-2">DWG NO</div>
            <div className="col-span-4">TITLE & DOMAIN</div>
            <div className="col-span-4">CORE STACK</div>
            <div className="col-span-2 text-right">STATUS</div>
          </div>

          {/* Project Details Elements */}
          {PROJECTS.map((p) => (
            <details key={p.dwgNo} className="dwg-details group">
              <summary className="hover:bg-[rgba(27,31,42,0.02)]">
                <div className="grid grid-cols-1 md:grid-cols-12 w-full items-center gap-2 pr-4">
                  <div className="col-span-2 font-mono text-xs font-bold text-[var(--accent)]">
                    {p.dwgNo}
                  </div>
                  <div className="col-span-4 font-semibold text-sm text-[var(--ink)]">
                    {p.title}
                  </div>
                  <div className="col-span-4 font-mono text-xs text-[var(--muted)] truncate">
                    {p.stack}
                  </div>
                  <div className="col-span-2 md:text-right font-mono text-[11px] font-bold">
                    [{p.status}]
                  </div>
                </div>
                <span className="font-mono text-xs text-[var(--muted)] ml-2 group-open:rotate-90 transition-transform">
                  ▶
                </span>
              </summary>

              <div className="dwg-body border-t border-[var(--grid-line)] bg-[#EFE9DD]">
                <div className="max-w-[70ch] mb-4">
                  <h3 className="font-serif text-lg font-semibold mb-1 text-[var(--ink)]">
                    System Overview
                  </h3>
                  <p className="text-sm text-[var(--ink)] leading-relaxed">
                    {p.summary}
                  </p>
                </div>

                {p.incidentOrNote && (
                  <div className="mb-4 p-3 border border-[var(--hairline)] bg-[var(--paper)]">
                    <span className="font-mono text-[11px] text-[var(--accent)] font-bold block mb-1">
                      {p.incidentOrNote.label}
                    </span>
                    <p className="text-xs font-sans text-[var(--ink)] leading-normal">
                      {p.incidentOrNote.text}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 pt-2">
                  {p.caseStudy && (
                    <Link
                      href={p.caseStudy}
                      className="btn-dwg btn-dwg-accent"
                      style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
                    >
                      Read Case Study →
                    </Link>
                  )}
                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dwg"
                      style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
                    >
                      [ Repository ]
                    </a>
                  )}
                  {p.deploy && (
                    <a
                      href={p.deploy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-dwg"
                      style={{ height: "32px", minHeight: "32px", fontSize: "11px" }}
                    >
                      [ Live Deployment ]
                    </a>
                  )}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </SheetFrame>
  );
}
