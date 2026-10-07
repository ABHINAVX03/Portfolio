import React from "react";
import SheetFrame from "./SheetFrame";

interface RevisionEntry {
  rev: string;
  date: string;
  category: "EDUCATION" | "EXPERIENCE" | "MILESTONE";
  title: string;
  organization: string;
  scoreOrDetail?: string;
  bullets: string[];
}

const REVISIONS: RevisionEntry[] = [
  {
    rev: "D",
    date: "2025 — PRESENT",
    category: "EDUCATION",
    title: "Master of Computer Applications (MCA)",
    organization: "Indian Institute of Information Technology (IIIT) Vadodara",
    scoreOrDetail: "CGPA: 8.5 / 10",
    bullets: [
      "Advanced studies in distributed systems, operating systems internals, and scalable computing.",
      "Primary research focus on low-latency microservice architectures and asynchronous graph querying.",
    ],
  },
  {
    rev: "C",
    date: "AUG 2023 — OCT 2023",
    category: "EXPERIENCE",
    title: "Software Developer Intern",
    organization: "Codeeater",
    scoreOrDetail: "Solidity & Web3.js",
    bullets: [
      "Designed and deployed 3 Ethereum smart contracts in Solidity with OOP principles, covering 6+ on-chain operations with Ganache full test coverage.",
      "Integrated smart contracts with React frontend via Web3.js and MetaMask; applied gas-optimisation techniques reducing estimated gas costs by ~15%.",
      "Worked in an Agile team with sprint planning and daily stand-ups; managed version control via Git on Linux across feature branches.",
    ],
  },
  {
    rev: "B",
    date: "2021 — 2024",
    category: "EDUCATION",
    title: "Bachelor of Computer Applications (BCA)",
    organization: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    scoreOrDetail: "Score: 9.2 / 10",
    bullets: [
      "Core coursework in Data Structures & Algorithms, Database Management Systems, Computer Networks, and Object-Oriented Programming (Java/C++).",
      "Completed academic projects demonstrating relational database normalization and web fundamentals.",
    ],
  },
  {
    rev: "A",
    date: "2023 — 2026",
    category: "MILESTONE",
    title: "Competitive Programming & Hackathons",
    organization: "Independent Practice",
    scoreOrDetail: "500+ Problems Solved",
    bullets: [
      "Solved 500+ problems across platforms focusing on graphs, dynamic programming, trees, and concurrency.",
      "Participated in national-level hackathons: Smart India Hackathon (SIH), Cerebro, and HACKOUT '25.",
    ],
  },
];

export default function Sheet6History() {
  return (
    <SheetFrame id="history" title="REVISION HISTORY: CAREER & FORMATION" dwgNo="AG-006" sheetNo={6}>
      <div className="flex flex-col gap-6">
        <div className="border-b border-[var(--hairline)] pb-2 flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              TIMELINE // FORMATION & PROFESSIONAL TRACK
            </span>
            <h2 id="history-heading" className="text-2xl sm:text-3xl font-semibold">
              Revision History: Experience & Education
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--muted)]">
            STANDARDIZED DRAWING REVISION LOG
          </span>
        </div>

        <p className="text-sm text-[var(--muted)] max-w-[70ch]">
          Logged chronologically in standard engineering drawing revision format, from initial baseline studies (REV A) to current advanced formation at IIIT Vadodara (REV D).
        </p>

        {/* Revision Table */}
        <div className="overflow-x-auto border border-[var(--hairline)] bg-[var(--paper)]">
          <table className="dwg-table my-0">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>REV</th>
                <th style={{ width: "16%" }}>DATE / ERA</th>
                <th style={{ width: "32%" }}>ORGANIZATION & ROLE</th>
                <th style={{ width: "44%" }}>ENGINEERING RECORD & BULLETS</th>
              </tr>
            </thead>
            <tbody>
              {REVISIONS.map((r) => (
                <tr key={r.rev} className="hover:bg-[rgba(27,31,42,0.02)]">
                  <td className="font-mono font-bold text-center text-sm text-[var(--accent)]">
                    {r.rev}
                  </td>
                  <td className="font-mono text-xs text-[var(--ink)]">
                    {r.date}
                  </td>
                  <td>
                    <div className="font-bold text-sm text-[var(--ink)]">
                      {r.title}
                    </div>
                    <div className="font-mono text-xs text-[var(--muted)]">
                      {r.organization}
                    </div>
                    {r.scoreOrDetail && (
                      <div className="font-mono text-[11px] font-semibold text-[var(--accent)] mt-0.5">
                        [{r.scoreOrDetail}]
                      </div>
                    )}
                  </td>
                  <td>
                    <ul className="list-disc pl-4 space-y-1 font-sans text-xs text-[var(--ink)] leading-snug">
                      {r.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SheetFrame>
  );
}
