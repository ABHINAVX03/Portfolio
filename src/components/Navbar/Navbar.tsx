"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiDownload, FiMenu, FiX } from "react-icons/fi";

const NAV_ITEMS = [
  { label: "Home",     href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "About",    href: "#about" },
  { label: "Contact",  href: "#contact" },
];

const Navbar = () => {
  const [isScrolled,  setIsScrolled]  = useState(false);
  const [isMenuOpen,  setIsMenuOpen]  = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  /* ── scroll + active-section tracker ── */
  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["home", "projects", "about", "contact"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      if (current) setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── lock body scroll when mobile menu open ── */
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: "16px 24px",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          role="navigation"
          aria-label="Main navigation"
          style={{
            pointerEvents: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            maxWidth: "900px",
            padding: "10px 16px",
            borderRadius: "9999px",
            border: `1px solid ${isScrolled ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)"}`,
            background: isScrolled
              ? "rgba(5, 5, 8, 0.85)"
              : "rgba(5, 5, 8, 0.4)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            boxShadow: isScrolled
              ? "0 4px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08)"
              : "none",
            transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="#home"
            aria-label="Go to home"
            style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
          >
            <div style={{
              width: 36,
              height: 36,
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "13px",
              fontWeight: 800,
              color: "#fff",
              fontFamily: "var(--font-space-grotesk)",
              boxShadow: "0 0 16px rgba(99,102,241,0.4)",
              flexShrink: 0,
            }}>
              AG
            </div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "14px",
                fontWeight: 700,
                color: "#f8fafc",
                letterSpacing: "-0.02em",
              }}>
                Abhinav Gupta
              </span>
              <span style={{
                fontFamily: "var(--font-jetbrains-mono)",
                fontSize: "10px",
                color: "#34d399",
                letterSpacing: "0.04em",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}>
                <span style={{
                  display: "inline-block",
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#34d399",
                  boxShadow: "0 0 8px #34d399",
                  animation: "ping 2s ease-in-out infinite",
                }} />
                Available
              </span>
            </div>
          </Link>

          {/* ── Desktop nav links ── */}
          <ul style={{
            display: "flex",
            alignItems: "center",
            gap: "2px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
            className="nav-desktop-links"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 14px",
                      borderRadius: "9999px",
                      fontFamily: "var(--font-body)",
                      fontSize: "13px",
                      fontWeight: 500,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
                      background: isActive ? "rgba(99,102,241,0.2)" : "transparent",
                      border: isActive ? "1px solid rgba(99,102,241,0.35)" : "1px solid transparent",
                      transition: "all 0.25s ease",
                      textDecoration: "none",
                      letterSpacing: "0.01em",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#fff";
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    {isActive && (
                      <span style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: "#6366f1",
                        boxShadow: "0 0 8px #6366f1",
                        flexShrink: 0,
                      }} />
                    )}
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* ── Resume CTA + hamburger ── */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <a
              href="/resume/Resume.pdf"
              download
              aria-label="Download resume"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.01em",
                textDecoration: "none",
                boxShadow: "0 0 20px rgba(99,102,241,0.3)",
                transition: "all 0.25s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 30px rgba(99,102,241,0.55)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 20px rgba(99,102,241,0.3)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
              className="nav-resume-btn"
            >
              <FiDownload size={12} />
              Resume
            </a>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              onClick={() => setIsMenuOpen((p) => !p)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              style={{
                display: "none",
                width: 36,
                height: 36,
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#f8fafc",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
              className="nav-hamburger"
            >
              {isMenuOpen ? <FiX size={16} /> : <FiMenu size={16} />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* ── Mobile full-screen menu ── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(32px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999,
              background: "rgba(5, 5, 8, 0.97)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {/* Close button top-right */}
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Close menu"
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                width: 40,
                height: 40,
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.05)",
                color: "#f8fafc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <FiX size={18} />
            </button>

            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.07, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  style={{
                    display: "block",
                    fontFamily: "var(--font-space-grotesk)",
                    fontSize: "42px",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: activeSection === item.href.replace("#", "") ? "#6366f1" : "rgba(255,255,255,0.85)",
                    textDecoration: "none",
                    padding: "8px 24px",
                    transition: "color 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.32, duration: 0.35 }}
              style={{ marginTop: "16px" }}
            >
              <a
                href="/resume/Resume.pdf"
                download
                onClick={closeMenu}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "14px 32px",
                  borderRadius: "9999px",
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                  fontSize: "16px",
                  fontWeight: 600,
                  textDecoration: "none",
                  boxShadow: "0 0 32px rgba(99,102,241,0.4)",
                }}
              >
                <FiDownload size={16} />
                Download Resume
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Responsive styles injected globally ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop-links { display: none !important; }
          .nav-resume-btn    { display: none !important; }
          .nav-hamburger     { display: flex !important; }
        }
        @keyframes ping {
          0%   { box-shadow: 0 0 0 0 rgba(52,211,153,0.6); }
          70%  { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
          100% { box-shadow: 0 0 0 0 rgba(52,211,153,0); }
        }
      `}</style>
    </>
  );
};

export default Navbar;