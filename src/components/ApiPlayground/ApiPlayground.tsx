"use client";

import { useState } from "react";
import { FiPlay, FiCopy, FiCheck, FiTerminal } from "react-icons/fi";
import { motion } from "framer-motion";

const ENDPOINTS = [
  { name: "Get Projects", method: "GET", path: "/api/v1/projects" },
  { name: "Get Skills", method: "GET", path: "/api/v1/skills" },
  { name: "Get JSON Resume", method: "GET", path: "/api/v1/resume" },
];

export default function ApiPlayground() {
  const [activeEndpoint, setActiveEndpoint] = useState(ENDPOINTS[0]);
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const res = await fetch(activeEndpoint.path);
      const data = await res.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (err) {
      setResponse(JSON.stringify({ error: "Failed to fetch" }, null, 2));
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
    <div style={{
      background: "rgba(10, 10, 15, 0.7)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
      backdropFilter: "blur(12px)"
    }}>
      {/* Header */}
      <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
        {ENDPOINTS.map((endpoint) => (
          <button
            key={endpoint.path}
            onClick={() => { setActiveEndpoint(endpoint); setResponse(null); }}
            style={{
              padding: "16px 24px",
              background: activeEndpoint.path === endpoint.path ? "rgba(99, 102, 241, 0.15)" : "transparent",
              border: "none",
              borderBottom: activeEndpoint.path === endpoint.path ? "2px solid #6366f1" : "2px solid transparent",
              color: activeEndpoint.path === endpoint.path ? "#fff" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.2s"
            }}
          >
            {endpoint.name}
          </button>
        ))}
      </div>

      {/* URL & Action Bar */}
      <div style={{ padding: "20px", display: "flex", gap: "12px", alignItems: "center", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          gap: "12px", 
          background: "rgba(255,255,255,0.05)", 
          padding: "12px 16px", 
          borderRadius: "8px", 
          flex: 1 
        }}>
          <span style={{ 
            color: "#34d399", 
            fontFamily: "var(--font-jetbrains-mono)", 
            fontWeight: 700,
            fontSize: "0.9rem" 
          }}>
            {activeEndpoint.method}
          </span>
          <span style={{ color: "#fff", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem" }}>
            https://abhinavgupta.dev{activeEndpoint.path}
          </span>
        </div>
        <button
          onClick={handleRun}
          disabled={loading}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "8px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: 600,
            fontFamily: "var(--font-space-grotesk)",
            opacity: loading ? 0.7 : 1,
            transition: "all 0.2s"
          }}
        >
          {loading ? "Fetching..." : <><FiPlay /> Send Request</>}
        </button>
      </div>

      {/* Response Area */}
      <div style={{ position: "relative", minHeight: "300px", background: "#050505", padding: "20px" }}>
        {response ? (
          <>
            <button
              onClick={handleCopy}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "6px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.8rem",
                fontFamily: "var(--font-jetbrains-mono)"
              }}
            >
              {copied ? <><FiCheck color="#34d399" /> Copied</> : <><FiCopy /> Copy JSON</>}
            </button>
            <motion.pre
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ 
                margin: 0, 
                color: "#a5b4fc", 
                fontFamily: "var(--font-jetbrains-mono)", 
                fontSize: "0.85rem",
                overflow: "auto",
                maxHeight: "400px"
              }}
            >
              {response}
            </motion.pre>
          </>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", opacity: 0.3, paddingTop: "80px" }}>
            <FiTerminal size={48} color="#fff" style={{ marginBottom: "16px" }} />
            <p style={{ color: "#fff", fontFamily: "var(--font-jetbrains-mono)", fontSize: "0.9rem" }}>
              Hit &quot;Send Request&quot; to test the headless API
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
