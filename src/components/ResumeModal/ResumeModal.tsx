"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiX } from "react-icons/fi";

const ResumeModalContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showResume = searchParams?.get("resume") === "true";

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (showResume) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showResume]);

  const handleClose = () => {
    // Navigate back to remove the query param, or push to current pathname without it
    router.back();
  };

  return (
    <AnimatePresence>
      {showResume && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "rgba(5, 5, 8, 0.75)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)", // for safari
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "90vh",
              maxHeight: "1200px",
              background: "var(--bg-card)",
              borderRadius: "16px",
              border: "1px solid var(--c-border)",
              boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(99,102,241,0.1)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            {/* Top Bar */}
            <div
              style={{
                height: "56px",
                padding: "0 20px",
                borderBottom: "1px solid var(--c-border)",
                background: "rgba(10, 10, 15, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              {/* macOS style buttons */}
              <div style={{ display: "flex", gap: "8px", width: "120px" }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27c93f" }} />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "var(--c-text-secondary)",
                  letterSpacing: "0.05em",
                }}
              >
                Abhinav_Gupta_Resume.pdf
              </div>

              <div style={{ display: "flex", gap: "12px", width: "120px", justifyContent: "flex-end" }}>
                <a
                  href="/resume/Resume.pdf"
                  download
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "rgba(99,102,241,0.15)",
                    color: "#a5b4fc",
                    textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  title="Download PDF"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(99,102,241,0.15)")}
                >
                  <FiDownload size={16} />
                </a>
                <button
                  onClick={handleClose}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "36px",
                    height: "36px",
                    borderRadius: "8px",
                    background: "var(--bg-subtle)",
                    border: "1px solid var(--c-border)",
                    color: "var(--c-text-primary)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                  title="Close"
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--bg-subtle)")}
                >
                  <FiX size={18} />
                </button>
              </div>
            </div>

            {/* Resume Viewer */}
            <div style={{ flex: 1, position: "relative", background: "#e5e7eb" }}>
              {/* Fallback text if iframe doesn't load */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                  fontFamily: "var(--font-body)",
                  fontSize: "14px",
                  zIndex: 0,
                }}
              >
                <p>Loading resume viewer...</p>
                <a
                  href="/resume/Resume.pdf"
                  download
                  style={{ color: "#4f46e5", marginTop: "8px", textDecoration: "underline" }}
                >
                  Click here to download directly if it doesn&apos;t load.
                </a>
              </div>
              
              <iframe
                src="/resume/Resume.pdf?v=5#view=FitH"
                style={{
                  width: "100%",
                  height: "100%",
                  border: "none",
                  position: "relative",
                  zIndex: 1,
                  display: "block",
                }}
                title="Resume"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function ResumeModal() {
  return (
    <React.Suspense fallback={null}>
      <ResumeModalContent />
    </React.Suspense>
  );
}
