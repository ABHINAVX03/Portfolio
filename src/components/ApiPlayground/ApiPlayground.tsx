"use client";

import { useState } from "react";

const ENDPOINTS = [
  { name: "Get Projects", method: "GET", path: "/api/v1/projects" },
  { name: "Get Skills", method: "GET", path: "/api/v1/skills" },
  { name: "Get JSON Resume", method: "GET", path: "/api/v1/resume" },
];

export default function ApiPlayground() {
  const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS[0]);
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResponse(null);
    setStatus(null);
    const startTime = performance.now();
    try {
      const res = await fetch(activeEndpoint.path);
      const elapsed = Math.round(performance.now() - startTime);
      setStatus(`${res.status} ${res.statusText} (${elapsed}ms)`);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setStatus(`FETCH_ERROR`);
      setResponse(JSON.stringify({ error: "Failed to fetch relative endpoint" }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!response) return;
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        backgroundColor: "var(--paper)",
        border: "1px solid var(--hairline)",
      }}
    >
      {/* Tab Header */}
      <div
        style={{
          display: "flex",
          borderBottom: "1px solid var(--hairline)",
          backgroundColor: "rgba(27, 31, 42, 0.03)",
          overflowX: "auto",
        }}
      >
        {ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.path}
            type="button"
            onClick={() => {
              setActiveEndpoint(endpoint);
              setResponse(null);
              setStatus(null);
            }}
            style={{
              padding: "10px 16px",
              backgroundColor:
                activeEndpoint.path === endpoint.path ? "var(--paper)" : "transparent",
              border: "none",
              borderRight: "1px solid var(--hairline)",
              borderBottom:
                activeEndpoint.path === endpoint.path
                  ? "2px solid var(--accent)"
                  : "none",
              color:
                activeEndpoint.path === endpoint.path ? "var(--ink)" : "var(--muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: activeEndpoint.path === endpoint.path ? 700 : 400,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {endpoint.name}
          </button>
        ))}
      </div>

      {/* Control bar */}
      <div
        style={{
          padding: "12px 16px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          borderBottom: "1px solid var(--grid-line)",
          backgroundColor: "var(--paper)",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              padding: "2px 6px",
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontSize: "11px",
              fontWeight: 700,
            }}
          >
            {activeEndpoint.method}
          </span>
          <span style={{ color: "var(--ink)", fontWeight: 600 }}>
            {activeEndpoint.path}
          </span>
        </div>

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {status && (
            <span
              style={{
                fontSize: "11px",
                color: status.startsWith("200") ? "var(--ink)" : "var(--accent)",
                fontWeight: 700,
                padding: "2px 6px",
                border: "1px solid var(--hairline)",
              }}
            >
              {status}
            </span>
          )}

          <button
            type="button"
            onClick={handleRun}
            disabled={loading}
            className="btn-dwg btn-dwg-accent"
            style={{ height: "30px", minHeight: "30px", padding: "0 12px", fontSize: "11px" }}
          >
            {loading ? "EXECUTING..." : "DISPATCH →"}
          </button>

          {response && (
            <button
              type="button"
              onClick={handleCopy}
              className="btn-dwg"
              style={{ height: "30px", minHeight: "30px", padding: "0 10px", fontSize: "11px" }}
            >
              {copied ? "COPIED" : "COPY"}
            </button>
          )}
        </div>
      </div>

      {/* Output Console */}
      <div
        style={{
          padding: "16px",
          backgroundColor: "#EFE9DD",
          minHeight: "220px",
          maxHeight: "420px",
          overflow: "auto",
        }}
      >
        {response ? (
          <pre
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--ink)",
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            {response}
          </pre>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "180px",
              color: "var(--muted)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
            }}
          >
            [ Click DISPATCH to query {activeEndpoint.path} ]
          </div>
        )}
      </div>
    </div>
  );
}
