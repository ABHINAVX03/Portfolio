"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import socials from "@/utils/socials";

const ROLES = ["Full Stack Developer", "Java Spring Boot Engineer", "React Developer", "Problem Solver"];
const SKILLS = ["React", "Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL"];
const STATS = [
  { value: "300+", label: "DSA Solved" },
  { value: "8.51", label: "CGPA" },
  { value: "8",    label: "Projects" },
  { value: "1",    label: "Internship" },
];

/* ── 3-D tilt card hook ── */
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 25 });

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const onMouseLeave = () => { x.set(0); y.set(0); };

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

/* ── Typewriter ── */
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pause = 1400) {
  const [display, setDisplay]   = useState("");
  const [wordIdx, setWordIdx]   = useState(0);
  const [deleting, setDeleting] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    const word = words[wordIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && display === word) {
      timer = setTimeout(() => { if (mountedRef.current) setDeleting(true); }, pause);
    } else if (deleting && display === "") {
      setDeleting(false);
      setWordIdx((i) => (i + 1) % words.length);
    } else {
      timer = setTimeout(() => {
        if (!mountedRef.current) return;
        setDisplay(deleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1));
      }, deleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [display, deleting, wordIdx, words, typingSpeed, deletingSpeed, pause]);

  return display;
}

const Hero = () => {
  const tilt    = useTilt();
  const roleText = useTypewriter(ROLES);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const codeSnippet = useMemo(() => `class Developer {
  name    = "Abhinav Gupta";
  role    = "Full Stack";
  gpa     = 8.51;
  stack   = [
    "React", "Next.js",
    "Spring Boot", "PostgreSQL",
  ];
  status  = "open_to_work";
}`, []);

  return (
    <section
      id="home"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        zIndex: 1,
        paddingTop: "96px",
        paddingBottom: "60px",
        overflow: "hidden",
      }}
    >
      {/* ── inner grid ── */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "48px",
        alignItems: "center",
        width: "100%",
      }}
        className="hero-grid"
      >
        {/* ════════════════ LEFT — text ════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "6px 14px",
              borderRadius: "9999px",
              border: "1px solid rgba(52,211,153,0.3)",
              background: "rgba(52,211,153,0.08)",
              width: "fit-content",
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#34d399",
              boxShadow: "0 0 10px #34d399",
              display: "inline-block",
              animation: "heroPing 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#34d399",
            }}>
              Open to opportunities
            </span>
          </motion.div>

          {/* name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            <h1 style={{
              fontFamily: "var(--font-space-grotesk)",
              fontSize: "clamp(44px, 6vw, 80px)",
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              margin: 0,
            }}>
              <span style={{ color: "#f8fafc" }}>Abhinav</span>
              <br />
              <span style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #f472b6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 30px rgba(99,102,241,0.5))",
              }}>
                Gupta
              </span>
            </h1>
          </motion.div>

          {/* typewriter role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            style={{
              fontFamily: "var(--font-jetbrains-mono)",
              fontSize: "clamp(14px, 1.8vw, 20px)",
              color: "rgba(255,255,255,0.5)",
              minHeight: "28px",
            }}
            aria-label={`Role: ${roleText}`}
          >
            <span style={{ color: "#6366f1" }}>&gt; </span>
            <span style={{ color: "#c7d2fe" }}>{mounted ? roleText : ROLES[0]}</span>
            <span style={{
              color: "#6366f1",
              animation: "heroBlink 1s step-end infinite",
              marginLeft: "2px",
            }} aria-hidden="true">█</span>
          </motion.div>

          {/* description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "15px",
              lineHeight: 1.75,
              color: "rgba(255,255,255,0.6)",
              maxWidth: "440px",
              margin: 0,
            }}
          >
            MCA student at{" "}
            <span style={{ color: "#c7d2fe", fontWeight: 600 }}>IIIT Vadodara</span>
            {" "}(8.51 GPA) building production-grade full stack apps with React, Next.js, and Java Spring Boot. Codeforces Pupil with 300+ DSA problems solved.
          </motion.p>

          {/* skill badges */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
          >
            {SKILLS.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  border: "1px solid rgba(99,102,241,0.25)",
                  background: "rgba(99,102,241,0.08)",
                  color: "#c7d2fe",
                  cursor: "default",
                  transition: "all 0.2s ease",
                }}
                whileHover={{
                  background: "rgba(99,102,241,0.2)",
                  borderColor: "rgba(99,102,241,0.5)",
                  color: "#fff",
                  scale: 1.05,
                }}
              >
                {s}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}
          >
            <a
              href={socials.Mail}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                transition: "all 0.25s ease",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.6)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.35)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
              aria-label="Email Abhinav"
            >
              Hire Me <FiMail size={14} />
            </a>

            <a
              href="/resume/Resume.pdf"
              download
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 24px",
                borderRadius: "9999px",
                background: "transparent",
                color: "#c7d2fe",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 600,
                textDecoration: "none",
                border: "1px solid rgba(99,102,241,0.3)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.12)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.6)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
              aria-label="Download resume"
            >
              <FiDownload size={14} /> Resume
            </a>

            <Link
              href="#projects"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "12px 20px",
                borderRadius: "9999px",
                color: "rgba(255,255,255,0.5)",
                fontFamily: "var(--font-body)",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = "#fff";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
              }}
            >
              View Work <FiArrowRight size={14} />
            </Link>
          </motion.div>

          {/* social icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            style={{ display: "flex", gap: "10px" }}
          >
            {[
              { href: socials.Github,   icon: <FiGithub size={16} />,   label: "GitHub" },
              { href: socials.Linkedin, icon: <FiLinkedin size={16} />, label: "LinkedIn" },
              { href: socials.Mail,     icon: <FiMail size={16} />,     label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "10px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.03)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255,255,255,0.5)",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = "#6366f1";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.4)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.1)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ════════════════ RIGHT — photo card ════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            alignItems: "center",
          }}
        >
          {/* 3-D tilt photo card */}
          <motion.div
            ref={tilt.ref}
            onMouseMove={tilt.onMouseMove}
            onMouseLeave={tilt.onMouseLeave}
            style={{
              rotateX: tilt.rotateX,
              rotateY: tilt.rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
              width: "100%",
              maxWidth: "380px",
            }}
          >
            <div style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid rgba(99,102,241,0.2)",
              background: "rgba(10,10,20,0.8)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.08)",
            }}>
              {/* glowing border top */}
              <div style={{
                position: "absolute",
                top: 0, left: 0, right: 0,
                height: "2px",
                background: "linear-gradient(90deg, transparent, #6366f1, #8b5cf6, #f472b6, transparent)",
                zIndex: 2,
              }} />

              {/* photo */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "4/5" }}>
                {/* orbital glow rings behind photo */}
                <div style={{
                  position: "absolute",
                  inset: "-20%",
                  borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
                  animation: "heroOrb 6s ease-in-out infinite",
                  zIndex: 0,
                }} />
                <Image
                  src="/pf.png"
                  alt="Abhinav Gupta — Full Stack Developer"
                  fill
                  style={{ objectFit: "cover", objectPosition: "top", zIndex: 1 }}
                  priority
                  sizes="(max-width: 768px) 90vw, 380px"
                />
                {/* subtle gradient overlay bottom */}
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "40%",
                  background: "linear-gradient(to top, rgba(10,10,20,0.85), transparent)",
                  zIndex: 2,
                }} />
                {/* name tag overlay */}
                <div style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  right: "16px",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div>
                    <div style={{
                      fontFamily: "var(--font-space-grotesk)",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#fff",
                      letterSpacing: "-0.02em",
                    }}>
                      Abhinav Gupta
                    </div>
                    <div style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "11px",
                      color: "#c7d2fe",
                      letterSpacing: "0.04em",
                    }}>
                      Full Stack Developer
                    </div>
                  </div>
                  <div style={{
                    padding: "4px 10px",
                    borderRadius: "9999px",
                    background: "rgba(99,102,241,0.2)",
                    border: "1px solid rgba(99,102,241,0.4)",
                    backdropFilter: "blur(8px)",
                  }}>
                    <span style={{
                      fontFamily: "var(--font-jetbrains-mono)",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "#a5b4fc",
                      letterSpacing: "0.06em",
                    }}>Delhi, IN</span>
                  </div>
                </div>
              </div>

              {/* card footer — mini code snippet */}
              <div style={{
                padding: "16px 20px",
                borderTop: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(5,5,8,0.6)",
              }}>
                <pre style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "11px",
                  lineHeight: 1.7,
                  color: "#94a3b8",
                  margin: 0,
                  overflowX: "auto",
                  whiteSpace: "pre",
                }}>
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
          </motion.div>

          {/* stats strip below card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              width: "100%",
              maxWidth: "380px",
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.55 + i * 0.06 }}
                style={{
                  padding: "12px 8px",
                  borderRadius: "12px",
                  border: "1px solid rgba(99,102,241,0.15)",
                  background: "rgba(99,102,241,0.06)",
                  textAlign: "center",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{
                  fontFamily: "var(--font-space-grotesk)",
                  fontSize: "18px",
                  fontWeight: 700,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  letterSpacing: "-0.02em",
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: "var(--font-jetbrains-mono)",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginTop: "2px",
                }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── scroll cue ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
        className="hero-scroll-cue"
      >
        <span style={{
          fontFamily: "var(--font-jetbrains-mono)",
          fontSize: "9px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)",
        }}>
          scroll
        </span>
        <div style={{
          width: "1px",
          height: "40px",
          background: "linear-gradient(to bottom, rgba(99,102,241,0.6), transparent)",
          animation: "heroScrollLine 2s ease-in-out infinite",
        }} />
      </motion.div>

      {/* ── keyframes ── */}
      <style>{`
        @keyframes heroBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes heroPing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
          50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
        }
        @keyframes heroOrb {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.8; }
          50%       { transform: scale(1.1) rotate(180deg); opacity: 1; }
        }
        @keyframes heroScrollLine {
          0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
          50%  { opacity: 1; transform: scaleY(1); }
          100% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
        }

        /* Responsive */
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid > *:first-child {
            align-items: center;
          }
          .hero-scroll-cue { display: none; }
        }
        @media (max-width: 480px) {
          .hero-grid { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;