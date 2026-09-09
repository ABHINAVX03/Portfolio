"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  // Prevent hydration mismatch by rendering a placeholder of the same size until mounted
  if (!mounted) {
    return <div style={{ width: 48, height: 48 }} />;
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      initial={false}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 48,
        height: 48,
        borderRadius: "999px",
        border: "1px solid var(--c-border)",
        background: "var(--bg-card)",
        color: "var(--c-text-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        backdropFilter: "blur(12px)",
        position: "relative",
        overflow: "hidden",
        outline: "none",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: 20, opacity: 0, rotate: -90 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -20, opacity: 0, rotate: 90 }}
          transition={{ duration: 0.3, ease: "backOut" }}
          style={{ position: "absolute", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {theme === "dark" ? <FiSun size={20} color="#fbbf24" /> : <FiMoon size={20} color="#6366f1" />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
