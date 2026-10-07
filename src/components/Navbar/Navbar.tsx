"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "var(--paper)",
        borderBottom: "1px solid var(--hairline)",
        height: "54px",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "0 16px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand / Title mark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
          aria-label="Abhinav Gupta - Home"
        >
          <span
            style={{
              padding: "2px 6px",
              backgroundColor: "var(--ink)",
              color: "var(--paper)",
              fontSize: "11px",
            }}
          >
            AG
          </span>
          <span>ABHINAV GUPTA</span>
          <span style={{ color: "var(--muted)", fontWeight: 400 }}>{"//"} DWG SET</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          style={{
            alignItems: "center",
            gap: "24px",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
          className="hidden md:flex"
        >
          <Link href="/#work" className="hover:underline">
            01 {"//"} Work
          </Link>
          <Link href="/#about" className="hover:underline">
            02 {"//"} Notes
          </Link>
          <Link href="/#contact" className="hover:underline">
            03 {"//"} Inquire
          </Link>
          <a
            href="/Abhinav_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-dwg"
            style={{ height: "32px", minHeight: "32px", padding: "0 12px", fontSize: "11px" }}
          >
            Resume (PDF)
          </a>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
          className="flex md:hidden btn-dwg"
          style={{ height: "34px", minHeight: "34px", padding: "0 10px", fontSize: "11px" }}
        >
          {isOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile Navigation"
          className="flex md:hidden flex-col"
          style={{
            backgroundColor: "var(--paper)",
            borderBottom: "1px solid var(--hairline)",
            padding: "16px",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            textTransform: "uppercase",
          }}
        >
          <Link
            href="/#work"
            onClick={() => setIsOpen(false)}
            style={{ padding: "8px 0", borderBottom: "1px solid var(--grid-line)" }}
          >
            01 {"//"} Work
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            style={{ padding: "8px 0", borderBottom: "1px solid var(--grid-line)" }}
          >
            02 {"//"} Notes
          </Link>
          <Link
            href="/#contact"
            onClick={() => setIsOpen(false)}
            style={{ padding: "8px 0", borderBottom: "1px solid var(--grid-line)" }}
          >
            03 {"//"} Inquire
          </Link>
          <a
            href="/Abhinav_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            style={{ padding: "8px 0", color: "var(--accent)", fontWeight: 700 }}
          >
            → Resume (PDF)
          </a>
        </nav>
      )}
    </header>
  );
}