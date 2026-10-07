import React from "react";
import SheetFrame from "./SheetFrame";
import { FACTS } from "@/config/facts";

export default function Sheet4About() {
  return (
    <SheetFrame id="about" title="GENERAL NOTES: BACKGROUND & METHOD" dwgNo="AG-004" sheetNo={4}>
      <div className="flex flex-col gap-6">
        <div className="border-b border-[var(--hairline)] pb-2 flex justify-between items-baseline">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              FIELD ENGINEERING NOTES // SPECIFICATION 04
            </span>
            <h2 id="about-heading" className="text-2xl sm:text-3xl font-semibold">
              General Notes: Engineering Background & Methods
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--muted)]">SEC. 4.1</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Numbered Notes */}
          <div className="lg:col-span-12 flex flex-col gap-4">
            <div className="font-mono text-xs font-bold text-[var(--ink)] uppercase pb-1 border-b border-[var(--grid-line)]">
              NOTES (UNLESS OTHERWISE SPECIFIED):
            </div>

            <ol className="flex flex-col gap-4 font-serif text-base text-[var(--ink)] leading-relaxed pl-6 list-decimal">
              <li className="pl-2">
                <strong>Academic Formation:</strong> Currently pursuing Master of Computer Applications (MCA) at the Indian Institute of Information Technology (IIIT) Vadodara with an 8.5/10 CGPA. Completed Bachelor of Computer Applications (BCA) at Guru Gobind Singh Indraprastha University (GGSIPU) with a 9.2/10 aggregate score.
              </li>

              <li className="pl-2">
                <strong>Backend & Distributed Systems Focus:</strong> Primary engineering work focuses on concurrent systems using Java 21 (Virtual Threads), Spring Cloud Gateway, Kafka event buses, and multi-model persistence (PostgreSQL, Redis, Neo4j).
              </li>

              <li className="pl-2">
                <strong>Production Internship:</strong> Completed software developer internship at Codeeater, developing Ethereum smart contracts in Solidity with test coverage, integrating Web3.js frontends, and achieving ~15% gas optimization across on-chain routines.
              </li>

              <li className="pl-2">
                <strong>Algorithmic Foundations:</strong> Solved {FACTS.DSA_PLACEMENT} Data Structures and Algorithms problems. Competitive hackathon participant across {FACTS.HACKATHONS.join(", ")}.
              </li>

              <li className="pl-2">
                {/* DRAFT-COPY: owner to rewrite */}
                <strong>Systems Incident Experience:</strong> Hands-on debugging of real deployment failures, including multi-threaded contest fetcher deadlocks in CPSync resolved with bounded timeouts and virtual threads, as well as production CORS startup panics on Railway.
              </li>
            </ol>

            {/* TODO(owner): Add path to natural-light reference photo when available (PHOTO_PATH) */}
          </div>
        </div>
      </div>
    </SheetFrame>
  );
}
