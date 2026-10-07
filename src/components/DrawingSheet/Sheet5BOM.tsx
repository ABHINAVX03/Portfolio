import React from "react";
import SheetFrame from "./SheetFrame";

interface BOMItem {
  item: string;
  category: string;
  usedIn: string;
  whatIDid: string;
}

const BOM_ITEMS: BOMItem[] = [
  {
    item: "Java 21 (Virtual Threads)",
    category: "Runtime & Core",
    usedIn: "Nexora & CPSync",
    whatIDid:
      "Used virtual threads to process high-concurrency feed queries and parallel contest scrapers without thread-pool starvation.",
  },
  {
    item: "Spring Boot 3.3+",
    category: "Framework",
    usedIn: "Nexora, BookKaro, CPSync",
    whatIDid:
      "Constructed REST APIs, JPA entities, validation filters, security middleware, and layered Controller-Service-Repository architectures.",
  },
  {
    item: "Spring Cloud Gateway",
    category: "Microservices",
    usedIn: "Nexora",
    whatIDid:
      "Configured Netty-based reverse proxy routing, JWT token extraction, and Redis-backed token-bucket rate limiters.",
  },
  {
    item: "Apache Kafka",
    category: "Message Broker",
    usedIn: "Nexora",
    whatIDid:
      "Engineered decoupled asynchronous pub/sub topics for user interactions, timeline updates, and notification worker dispatch.",
  },
  {
    item: "Neo4j AuraDB (Cypher)",
    category: "Graph Database",
    usedIn: "Nexora",
    whatIDid:
      "Modelled bidirectional connection networks in Cypher; reduced 2nd-degree mutual friend discovery latency from 2.4s (SQL joins) down to 12ms.",
  },
  {
    item: "Redis",
    category: "In-Memory Store",
    usedIn: "Nexora",
    whatIDid:
      "Maintained single-active-session UUID keys to invalidate multi-device logins and track token-bucket rate limit counters.",
  },
  {
    item: "PostgreSQL & PostGIS",
    category: "Relational Database",
    usedIn: "BookKaro & Nexora",
    whatIDid:
      "Designed normalized schemas and spatial point tracking for ride pickup/dropoff coordinates and driver geographic proximity.",
  },
  {
    item: "Caffeine In-Memory Cache",
    category: "Caching",
    usedIn: "CPSync",
    whatIDid:
      "Implemented bounded contest memory caching with eager warmup to prevent upstream rate-limits on external coding platform APIs.",
  },
  {
    item: "Google Calendar API v3",
    category: "API Integration",
    usedIn: "CPSync",
    whatIDid:
      "Integrated OAuth2 consent flows with AES-256-GCM token encryption and automatic refresh-token rotation for calendar sync.",
  },
  {
    item: "Docker & Compose",
    category: "Infrastructure",
    usedIn: "Nexora & BookKaro",
    whatIDid:
      "Wrote multi-stage production Dockerfiles and Compose files orchestrating 13 microservices, databases, and message brokers.",
  },
  {
    item: "Solidity & Web3.js",
    category: "Blockchain",
    usedIn: "Codeeater Internship",
    whatIDid:
      "Designed 3 Ethereum smart contracts with Ganache unit tests; tuned transaction routines to reduce estimated gas costs by ~15%.",
  },
  {
    item: "Next.js 15 & React",
    category: "Frontend Architecture",
    usedIn: "Portfolio & AapkaCoach",
    whatIDid:
      "Built App Router layouts, server components, and responsive typography conforming to strict WCAG AA contrast rules.",
  },
];

export default function Sheet5BOM() {
  return (
    <SheetFrame id="skills" title="BILL OF MATERIALS: DEFENSIBLE SKILLS" dwgNo="AG-005" sheetNo={5}>
      <div className="flex flex-col gap-6">
        <div className="border-b border-[var(--hairline)] pb-2 flex flex-col sm:flex-row justify-between items-baseline gap-2">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              INVENTORY // DEFENSIBLE SKILLS SPECIFICATION
            </span>
            <h2 id="skills-heading" className="text-2xl sm:text-3xl font-semibold">
              Bill of Materials: Verified Engineering Tools
            </h2>
          </div>
          <span className="font-mono text-xs text-[var(--muted)]">
            EVIDENCE-BASED ONLY // NO LOGOS OR BARS
          </span>
        </div>

        <p className="text-sm text-[var(--muted)] max-w-[70ch]">
          Every tool, database, and library listed below is backed by direct implementation code in one or more completed repositories. No arbitrary rating bars or unverified skill tags.
        </p>

        {/* Bill of Materials Table */}
        <div className="overflow-x-auto border border-[var(--hairline)] bg-[var(--paper)]">
          <table className="dwg-table my-0">
            <thead>
              <tr>
                <th style={{ width: "24%" }}>ITEM / SPECIFICATION</th>
                <th style={{ width: "16%" }}>CATEGORY</th>
                <th style={{ width: "20%" }}>USED IN</th>
                <th style={{ width: "40%" }}>WHAT I DID WITH IT (VERIFIABLE EVIDENCE)</th>
              </tr>
            </thead>
            <tbody>
              {BOM_ITEMS.map((b) => (
                <tr key={b.item} className="hover:bg-[rgba(27,31,42,0.02)]">
                  <td className="font-bold text-[var(--ink)]">
                    {b.item}
                  </td>
                  <td className="text-[var(--muted)] text-xs">
                    {b.category}
                  </td>
                  <td className="text-[var(--accent)] font-semibold text-xs">
                    {b.usedIn}
                  </td>
                  <td className="font-sans text-xs text-[var(--ink)] leading-snug">
                    {b.whatIDid}
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
