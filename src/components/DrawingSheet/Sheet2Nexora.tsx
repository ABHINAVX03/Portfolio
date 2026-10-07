"use client";

import React, { useState } from "react";
import Link from "next/link";
import SheetFrame from "./SheetFrame";
import { FACTS } from "@/config/facts";

interface CalloutItem {
  id: number;
  label: string;
  subsystem: string;
  detail: string;
  x: number;
  y: number;
}

const CALLOUTS: CalloutItem[] = [
  {
    id: 1,
    label: "API Gateway & Rate Limiting",
    subsystem: "Spring Cloud Gateway + Redis",
    detail:
      "Token-bucket rate limiter (replenishRate: 10, burstCapacity: 20) in Redis intercepts traffic, enforces JWT validation, and routes requests to microservices.",
    x: 80,
    y: 80,
  },
  {
    id: 2,
    label: "Service Discovery Registry",
    subsystem: "Netflix Eureka Server",
    detail:
      "Centralized registry monitoring microservice heartbeats and dynamically routing requests without hardcoded internal IP addresses.",
    x: 230,
    y: 80,
  },
  {
    id: 3,
    label: "Event Streaming Backbone",
    subsystem: "Apache Kafka",
    detail:
      "Decoupled event pipeline publishing post interactions and dispatching asynchronously to the notification and timeline consumers.",
    x: 390,
    y: 160,
  },
  {
    id: 4,
    label: "Social Graph Traversal Engine",
    subsystem: "Neo4j AuraDB (Cypher)",
    detail:
      "Dedicated graph database storing directional connections. 2nd-degree mutual connection queries dropped from 2.4s (deep relational SQL joins) to 12ms via Cypher graph traversal.",
    x: 540,
    y: 80,
  },
  {
    id: 5,
    label: "Single Active Session Enforcement",
    subsystem: "Redis Cache Store",
    detail:
      "User login generates a UUID session token stored in Redis. Subsequent logins from new devices invalidate old tokens immediately, returning 401 Session Expired.",
    x: 80,
    y: 220,
  },
  {
    id: 6,
    label: "Real-Time Chat & Presence",
    subsystem: "WebSocket STOMP + PostgreSQL",
    detail:
      "Bidirectional WebSocket messaging channel with presence heartbeats and unread message counters.",
    x: 230,
    y: 220,
  },
];

export default function Sheet2Nexora() {
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  const bm = FACTS.BENCHMARK_NEXORA;

  return (
    <SheetFrame id="nexora" title="NEXORA SYSTEM ARCHITECTURE" dwgNo="AG-002" sheetNo={2}>
      <div className="flex flex-col gap-8">
        {/* Header line */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[var(--hairline)] pb-3">
          <div>
            <span className="font-mono text-xs text-[var(--accent)] uppercase font-bold tracking-wider">
              PRIMARY SCHEMATIC // FLAGSHIP CASE STUDY
            </span>
            <h2 id="nexora-heading" className="text-2xl sm:text-3xl font-semibold">
              Nexora: Distributed Professional Social Architecture
            </h2>
          </div>
          <div className="font-mono text-xs flex gap-4">
            <a
              href="https://github.com/ABHINAVX03/nexora"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              [ Source Repository ]
            </a>
            <a
              href="https://nexoranetwork.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-link"
            >
              [ Live Deployment ]
            </a>
          </div>
        </div>

        {/* Drawing & Callouts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main SVG Schematic (7 Cols) */}
          <div className="lg:col-span-7 border border-[var(--hairline)] bg-[var(--paper)] p-4 relative">
            <div className="font-mono text-[10px] text-[var(--muted)] uppercase mb-2 flex justify-between">
              <span>FIG. 1: 7-MICROSERVICE TOPOLOGY & BUS SCHEMATIC</span>
              <span>SCALE: 1:1 LOGICAL</span>
            </div>

            <svg
              viewBox="0 0 640 320"
              className="w-full h-auto border border-[var(--grid-line)] bg-[#EFE9DD]"
              style={{ maxHeight: "380px" }}
              role="img"
              aria-label="Nexora Architecture Diagram with interactive callout balloons"
            >
              {/* Grid Lines */}
              <defs>
                <pattern
                  id="schematic-grid"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#DDD5C4"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#schematic-grid)" />

              {/* Connecting Data Busses (Hairline routes) */}
              <path d="M 140 100 L 200 100" stroke="#1B1F2A" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d="M 310 100 L 370 100" stroke="#1B1F2A" strokeWidth="1.5" />
              <path d="M 440 100 L 510 100" stroke="#1B1F2A" strokeWidth="1.5" />
              <path d="M 255 130 L 255 190" stroke="#1B1F2A" strokeWidth="1.5" />
              <path d="M 140 240 L 200 240" stroke="#1B1F2A" strokeWidth="1.5" />
              <path d="M 310 240 L 370 190" stroke="#1B1F2A" strokeWidth="1.5" strokeDasharray="3 3" />

              {/* Service Blocks */}
              {/* Block 1: Gateway */}
              <rect
                x="40"
                y="70"
                width="110"
                height="60"
                fill={activeCallout === 1 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 1 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 1 ? "2" : "1"}
              />
              <text x="50" y="92" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                API GATEWAY
              </text>
              <text x="50" y="107" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Spring WebFlux:8080
              </text>
              <text x="50" y="120" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Netty + Rate Limit
              </text>

              {/* Block 2: Eureka Discovery */}
              <rect
                x="195"
                y="70"
                width="115"
                height="60"
                fill={activeCallout === 2 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 2 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 2 ? "2" : "1"}
              />
              <text x="205" y="92" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                DISCOVERY
              </text>
              <text x="205" y="107" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Eureka Server:8761
              </text>
              <text x="205" y="120" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Heartbeat Registry
              </text>

              {/* Block 3: Kafka Pipeline */}
              <rect
                x="350"
                y="140"
                width="120"
                height="55"
                fill={activeCallout === 3 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 3 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 3 ? "2" : "1"}
              />
              <text x="360" y="162" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                KAFKA BROKER
              </text>
              <text x="360" y="177" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Event Topics:9092
              </text>
              <text x="360" y="188" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Async Event Bus
              </text>

              {/* Block 4: Neo4j Social Graph */}
              <rect
                x="495"
                y="70"
                width="120"
                height="60"
                fill={activeCallout === 4 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 4 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 4 ? "2" : "1"}
              />
              <text x="505" y="92" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                GRAPH ENGINE
              </text>
              <text x="505" y="107" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Neo4j AuraDB:8090
              </text>
              <text x="505" y="120" fontFamily="var(--font-mono)" fontSize="8" fill="#C23B22">
                2.4s → 12ms Traversal
              </text>

              {/* Block 5: Redis Active Session */}
              <rect
                x="40"
                y="210"
                width="110"
                height="60"
                fill={activeCallout === 5 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 5 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 5 ? "2" : "1"}
              />
              <text x="50" y="232" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                REDIS STORE
              </text>
              <text x="50" y="247" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Active Session UUID
              </text>
              <text x="50" y="259" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                Rate Limit Buckets
              </text>

              {/* Block 6: Chat & Notification Services */}
              <rect
                x="195"
                y="210"
                width="115"
                height="60"
                fill={activeCallout === 6 ? "rgba(194, 59, 34, 0.15)" : "#F3EFE6"}
                stroke={activeCallout === 6 ? "#C23B22" : "#1B1F2A"}
                strokeWidth={activeCallout === 6 ? "2" : "1"}
              />
              <text x="205" y="232" fontFamily="var(--font-mono)" fontSize="10" fontWeight="700" fill="#1B1F2A">
                CHAT & PRESENCE
              </text>
              <text x="205" y="247" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                WebSocket STOMP:9040
              </text>
              <text x="205" y="259" fontFamily="var(--font-mono)" fontSize="8" fill="#565B67">
                PostgreSQL + Heartbeat
              </text>

              {/* Numbered Callout Balloons (SVG) */}
              {CALLOUTS.map((c) => {
                const isActive = activeCallout === c.id;
                return (
                  <g
                    key={c.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setActiveCallout(c.id)}
                    onMouseLeave={() => setActiveCallout(null)}
                    onClick={() => setActiveCallout(activeCallout === c.id ? null : c.id)}
                  >
                    <circle
                      cx={c.x}
                      cy={c.y}
                      r="12"
                      fill={isActive ? "#C23B22" : "#F3EFE6"}
                      stroke={isActive ? "#C23B22" : "#1B1F2A"}
                      strokeWidth="1.5"
                    />
                    <text
                      x={c.x}
                      y={c.y + 4}
                      fontFamily="var(--font-mono)"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      fill={isActive ? "#F3EFE6" : "#1B1F2A"}
                    >
                      {c.id}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* TODO(owner): Add path to original hand sketch photo when available */}
            {/* FIG. 0 is hidden until SKETCH_PATH is provided */}
          </div>

          {/* Numbered Callout Notes Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="font-mono text-xs uppercase font-bold text-[var(--accent)] pb-1 border-b border-[var(--hairline)] flex justify-between">
              <span>NOTES // SUBSYSTEM BREAKDOWN</span>
              <span className="text-[var(--muted)]">[HOVER / TAP BALLOON]</span>
            </div>

            <ol className="flex flex-col gap-3 font-mono text-xs" list-style-type="none">
              {CALLOUTS.map((c) => {
                const isActive = activeCallout === c.id;
                return (
                  <li
                    key={c.id}
                    onMouseEnter={() => setActiveCallout(c.id)}
                    onMouseLeave={() => setActiveCallout(null)}
                    onClick={() => setActiveCallout(activeCallout === c.id ? null : c.id)}
                    tabIndex={0}
                    onFocus={() => setActiveCallout(c.id)}
                    onBlur={() => setActiveCallout(null)}
                    className={`p-2.5 border transition-colors cursor-pointer ${
                      isActive
                        ? "border-[var(--accent)] bg-[rgba(194,59,34,0.06)]"
                        : "border-[var(--grid-line)] bg-[var(--paper)]"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`balloon ${
                          isActive ? "is-active" : ""
                        }`}
                        style={{ width: "18px", height: "18px", fontSize: "10px" }}
                      >
                        {c.id}
                      </span>
                      <strong className="text-[var(--ink)]">{c.label}</strong>
                    </div>
                    <div className="text-[10px] text-[var(--muted)] mb-1 uppercase">
                      {c.subsystem}
                    </div>
                    <p className="font-sans text-xs text-[var(--ink)] leading-snug">
                      {c.detail}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Empirical Benchmark Matrix */}
        {bm && bm.loadTool && (
          <div className="border border-[var(--hairline)] p-4 bg-[var(--paper)]">
            <div className="font-mono text-xs uppercase font-bold text-[var(--accent)] mb-2">
              EMPIRICAL LOAD BENCHMARK MATRIX // k6 ON AWS EC2
            </div>
            <p className="font-sans text-xs text-[var(--muted)] mb-4 max-w-[70ch]">
              Automated load testing executed against production environment ({bm.testMachine}) using {bm.loadTool} over a {bm.duration} ramp profile.
            </p>

            <div className="overflow-x-auto">
              <table className="dwg-table">
                <thead>
                  <tr>
                    <th>Benchmark Parameter</th>
                    <th>Measured Value</th>
                    <th>Verification Criteria</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tool & Environment</td>
                    <td>{bm.loadTool} on {bm.testMachine}</td>
                    <td>k6 progressive load tier script (<code>k6-load-test.js</code>)</td>
                  </tr>
                  <tr>
                    <td>Maximum Concurrency</td>
                    <td>500 Virtual Users</td>
                    <td>{bm.concurrentMeaning}</td>
                  </tr>
                  <tr>
                    <td>Response Latencies</td>
                    <td>{bm.latencies}</td>
                    <td>Feed querying, typeahead search, profile fetch</td>
                  </tr>
                  <tr>
                    <td>Peak Error Rate</td>
                    <td>{bm.errorRateDef}</td>
                    <td>Threshold requirement: &lt; 5%</td>
                  </tr>
                  <tr>
                    <td>Neo4j Graph Acceleration</td>
                    <td>2.4s SQL join → 12ms Cypher</td>
                    <td>2nd-degree mutual connection queries</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-3 text-right">
              <Link href="/projects/nexora" className="btn-dwg">
                Read Full Nexora Case Study & Specifications →
              </Link>
            </div>
          </div>
        )}
      </div>
    </SheetFrame>
  );
}
