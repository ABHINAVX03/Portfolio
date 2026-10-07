import React from "react";
import Link from "next/link";
import SheetFrame from "./SheetFrame";
import { FACTS } from "@/config/facts";

export default function Sheet1Hero() {
  return (
    <SheetFrame id="spec" title="GENERAL SPEC" dwgNo="AG-001" sheetNo={1}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 Columns: Hero Sentence */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-bold">
            SPECIFICATION // FIELD ENGINEERING RECORD
          </div>

          <h1
            id="spec-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Software Development Engineer specializing in Java 21, Spring Boot
            microservices, Kafka event streaming, and distributed systems.
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-[58ch]">
            I design and benchmark multi-service backend architectures, graph-based social networks,
            and real-time event pipelines. Education at IIIT Vadodara (MCA) and GGSIPU (BCA).
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href="/Abhinav_Gupta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-dwg btn-dwg-accent"
              aria-label="View Resume PDF"
            >
              ↓ Resume (PDF)
            </a>
            <a
              href="#contact"
              className="btn-dwg"
            >
              Request for Information →
            </a>
          </div>
        </div>

        {/* Right 5 Columns: Info Card / Data Sheet */}
        <div className="lg:col-span-5 border border-[var(--hairline)] p-5 bg-[var(--paper)]">
          <div className="font-mono text-[11px] uppercase pb-2 mb-4 border-b border-[var(--hairline)] flex justify-between items-center text-[var(--muted)]">
            <span>ENGINEER RECORD</span>
            <span className="font-bold text-[var(--ink)]">ID: AG-IND-2026</span>
          </div>

          <div className="font-mono text-xs flex flex-col gap-3">
            <div className="flex justify-between border-b border-[var(--grid-line)] pb-2">
              <span className="text-[var(--muted)]">NAME</span>
              <span className="font-bold text-[var(--ink)]">Abhinav Gupta</span>
            </div>

            <div className="flex justify-between border-b border-[var(--grid-line)] pb-2">
              <span className="text-[var(--muted)]">INSTITUTION</span>
              <span className="font-bold text-[var(--ink)] text-right">
                IIIT Vadodara (MCA)
              </span>
            </div>

            <div className="flex justify-between border-b border-[var(--grid-line)] pb-2">
              <span className="text-[var(--muted)]">LOCATION</span>
              <span className="text-[var(--ink)]">Delhi, India</span>
            </div>

            <div className="flex justify-between border-b border-[var(--grid-line)] pb-2">
              <span className="text-[var(--muted)]">EMAIL</span>
              <a
                href="mailto:guptaabhinav697@gmail.com"
                className="text-link font-bold"
              >
                guptaabhinav697@gmail.com
              </a>
            </div>

            <div className="flex justify-between border-b border-[var(--grid-line)] pb-2">
              <span className="text-[var(--muted)]">STATUS</span>
              <span className="text-[var(--ink)] font-semibold">
                {FACTS.AVAILABILITY}
              </span>
            </div>

            {/* Crucial Proof Point Box */}
            <div className="mt-2 p-3 border border-[var(--hairline)] bg-[var(--paper)]">
              <div className="text-xs text-[var(--accent)] font-bold tracking-wider mb-1">
                ★ VERIFIED PROOF POINT
              </div>
              <p className="text-xs font-sans leading-normal text-[var(--ink)] mb-2">
                Nexora: 7-microservice architecture benchmarked via k6 up to 500 concurrent virtual users
                with a median latency of 56.1ms and 0.77% error rate on AWS EC2.
              </p>
              <Link
                href="#nexora"
                className="text-xs text-[var(--accent)] underline font-bold"
              >
                Inspect Architecture Sheet (AG-002) →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}
