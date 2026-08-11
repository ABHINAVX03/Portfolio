"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const nextTheme = stored ?? (prefersLight ? "light" : "dark");
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.setProperty("color-scheme", nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#f4f7ff" : "#060816");
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.setProperty("color-scheme", nextTheme);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#f4f7ff" : "#060816");
    window.localStorage.setItem("portfolio-theme", nextTheme);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      style={{
        width: 48,
        height: 48,
        borderRadius: "999px",
        border: "1px solid var(--c-border)",
        background: "var(--bg-card)",
        color: "var(--c-text-primary)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "var(--shadow-soft)",
        cursor: "pointer",
        transition: "transform 0.2s ease, border-color 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.borderColor = "var(--c-border-glow)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "var(--c-border)";
      }}
    >
      <span aria-hidden="true" style={{ fontSize: 18 }}>{theme === "dark" ? "☀️" : "🌙"}</span>
    </button>
  );
}
