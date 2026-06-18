"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub, FiArrowRight, FiBookOpen } from "react-icons/fi";
import projectsData from "@/utils/projects/index.json";

interface Project {
  id: string;
  name: string;
  type: string;
  repo: string | null;
  deploy: string | null;
  image: string;
  description: string;
  tags: string[];
  color: "primary" | "cyan" | "violet" | "emerald";
  priority: number;
  featured: boolean;
  year: number;
  status: "completed" | "in-progress" | "planned";
}

const COLOR: Record<string, { accent: string; glow: string; dim: string; border: string }> = {
  primary: { accent: "#6366f1", glow: "rgba(99,102,241,0.25)",  dim: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)" },
  cyan:    { accent: "#6366f1", glow: "rgba(99,102,241,0.25)",  dim: "rgba(99,102,241,0.08)",  border: "rgba(99,102,241,0.25)" },
  violet:  { accent: "#8b5cf6", glow: "rgba(139,92,246,0.25)",  dim: "rgba(139,92,246,0.08)",  border: "rgba(139,92,246,0.25)" },
  emerald: { accent: "#34d399", glow: "rgba(52,211,153,0.2)",   dim: "rgba(52,211,153,0.07)",  border: "rgba(52,211,153,0.25)" },
};

function useTilt3D() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]),  { stiffness: 260, damping: 28 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 260, damping: 28 });
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top)  / r.height - 0.5);
  };
  const onMouseLeave = () => { mx.set(0); my.set(0); };
  return { ref, rotX, rotY, onMouseMove, onMouseLeave };
}

const uberPoints = {
  problem: "Design a backend that coordinates riders, drivers, trips and fare calculation with clean service boundaries.",
  arch: ["Layered Spring Boot services", "REST controllers separate from business logic", "Dockerized for repeatable deploy"],
  apis: ["Auth & rider onboarding", "Driver matching", "Ride booking", "Fare calculation", "Trip status"],
  stack: ["Java", "Spring Boot", "REST APIs", "Docker", "OOP"],
};

// ── Flagship card ──────────────────────────────────────────────────────────────
// FIX: Added "Case Study →" button so the page is actually reachable from the UI.
// Previously there was no link to /projects/uber-ride-platform anywhere on the site.
function FlagshipCard({ project }: { project: Project }) {
  const c = COLOR[project.color] || COLOR.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 420px",
        gap: "0",
        borderRadius: "24px",
        border: `1px solid ${c.border}`,
        background: "rgba(10,10,20,0.9)",
        overflow: "hidden",
        boxShadow: `0 24px 80px rgba(0,0,0,0.5), 0 0 60px ${c.glow}`,
        marginBottom: "48px",
        position: "relative",
      }}
      className="flagship-grid"
    >
      {/* top gradient line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${c.accent}, #8b5cf6, #f472b6, transparent)`,
        zIndex: 2,
      }} />

      {/* LEFT — content */}
      <div style={{ padding: "40px 36px", display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          padding: "5px 12px", borderRadius: "9999px", width: "fit-content",
          border: "1px solid rgba(52,211,153,0.3)", background: "rgba(52,211,153,0.08)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34d399", boxShadow: "0 0 8px #34d399" }} />
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#34d399" }}>
            Flagship Case Study
          </span>
        </div>

        <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(24px,3vw,38px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#f8fafc", margin: 0, lineHeight: 1.1 }}>
          {project.name}
        </h3>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "14px", lineHeight: 1.75, color: "rgba(255,255,255,0.6)", margin: 0, maxWidth: "560px" }}>
          {project.description}
        </p>

        {/* 2×2 case panels */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          {[
            { label: "Problem",      content: uberPoints.problem, type: "text" },
            { label: "Architecture", items: uberPoints.arch,      type: "list" },
            { label: "Core APIs",    items: uberPoints.apis,      type: "pills" },
            { label: "Tech Stack",   items: uberPoints.stack,     type: "pills" },
          ].map((panel) => (
            <div key={panel.label} style={{
              padding: "14px 16px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.025)",
            }}>
              <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: c.accent, display: "block", marginBottom: "8px" }}>
                {panel.label}
              </span>
              {panel.type === "text" && <p style={{ margin: 0, fontSize: "12px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)" }}>{(panel as any).content}</p>}
              {panel.type === "list" && (
                <ul style={{ margin: 0, paddingLeft: "14px", fontSize: "12px", lineHeight: 1.7, color: "rgba(255,255,255,0.55)" }}>
                  {(panel as any).items.map((i: string) => <li key={i}>{i}</li>)}
                </ul>
              )}
              {panel.type === "pills" && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {(panel as any).items.map((i: string) => (
                    <span key={i} style={{ padding: "3px 8px", borderRadius: "6px", border: `1px solid ${c.border}`, background: c.dim, color: "rgba(255,255,255,0.7)", fontSize: "11px", fontFamily: "var(--font-jetbrains-mono)" }}>{i}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ✅ FIX: action links — added "Case Study" button */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {/* ✅ NEW: Case Study deep-dive link — this is the primary CTA for the case study page */}
          <Link
            href={`/projects/${project.id}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "9px 16px", borderRadius: "12px",
              background: `linear-gradient(135deg, ${c.accent}, #8b5cf6)`,
              color: "#fff", fontSize: "13px", fontWeight: 600,
              textDecoration: "none", boxShadow: `0 0 20px ${c.glow}`,
              fontFamily: "var(--font-body)",
            }}
          >
            <FiBookOpen size={14} /> Case Study
          </Link>

          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 16px", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
                color: "#f8fafc", fontSize: "13px", fontWeight: 600,
                textDecoration: "none", fontFamily: "var(--font-body)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.background = c.dim; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
            >
              <FiGithub size={14} /> GitHub
            </a>
          )}

          {project.deploy && (
            <a
              href={project.deploy}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                padding: "9px 16px", borderRadius: "12px",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
                color: "#f8fafc", fontSize: "13px", fontWeight: 600,
                textDecoration: "none", fontFamily: "var(--font-body)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = c.border; (e.currentTarget as HTMLElement).style.background = c.dim; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; }}
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
          )}

          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "9px 16px", borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)",
              color: "#f8fafc", fontSize: "13px", fontWeight: 600,
              textDecoration: "none", fontFamily: "var(--font-body)",
            }}
          >
            Hire Me <FiArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* RIGHT — image */}
      <div className="flagship-image-col" style={{ position: "relative", overflow: "hidden" }}>
        <Image src={project.image} alt={project.name} fill style={{ objectFit: "cover" }} sizes="420px" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,10,20,0.4), transparent)" }} />
        <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {["Driver Matching", "Fare Logic", "REST APIs"].map(t => (
            <span key={t} style={{ padding: "5px 10px", borderRadius: "9999px", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", color: "#fff", fontSize: "10px", fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Regular card ───────────────────────────────────────────────────────────────
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tilt = useTilt3D();
  const [hovered, setHovered] = useState(false);
  const [imgSrc, setImgSrc]   = useState(project.image);
  const c = COLOR[project.color] || COLOR.primary;

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={() => { tilt.onMouseLeave(); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      style={{ rotateX: tilt.rotX, rotateY: tilt.rotY, transformStyle: "preserve-3d", perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <div style={{
        borderRadius: "20px",
        border: `1px solid ${hovered ? c.border : "rgba(255,255,255,0.06)"}`,
        background: "rgba(10,10,20,0.85)",
        overflow: "hidden",
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 40px ${c.glow}` : "0 4px 24px rgba(0,0,0,0.3)",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        position: "relative",
        backdropFilter: "blur(12px)",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
          zIndex: 2,
        }} />

        {/* image */}
        <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
          <Image
            src={imgSrc}
            alt={project.name}
            fill
            style={{ objectFit: "cover", transition: "transform 0.5s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 400px"
            onError={() => setImgSrc("/projects/default.png")}
          />
          <div style={{ position: "absolute", inset: 0, background: hovered ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.1)", transition: "background 0.3s ease" }} />

          <div style={{ position: "absolute", top: "12px", right: "12px", padding: "4px 10px", borderRadius: "8px", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", fontWeight: 700, color: "rgba(255,255,255,0.7)" }}>
            {String(index + 1).padStart(2, "0")}
          </div>

          {project.type.includes("Blockchain") && (
            <div style={{ position: "absolute", top: "12px", left: "12px", padding: "4px 10px", borderRadius: "9999px", background: "rgba(52,211,153,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(52,211,153,0.35)", fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", fontWeight: 700, color: "#34d399", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Web3
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}
          >
            {project.repo && (
              <a href={project.repo} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", borderRadius: "10px", background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-body)" }}>
                <FiGithub size={14} /> Code
              </a>
            )}
            {project.deploy && (
              <a href={project.deploy} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", borderRadius: "10px", background: "rgba(10,10,20,0.85)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "13px", fontWeight: 600, textDecoration: "none", fontFamily: "var(--font-body)" }}>
                <FiExternalLink size={14} /> Live
              </a>
            )}
          </motion.div>
        </div>

        {/* content */}
        <div style={{ padding: "18px 20px 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px", gap: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "17px", fontWeight: 700, color: "#f8fafc", margin: 0, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              {project.name}
            </h3>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: c.accent, padding: "3px 8px", borderRadius: "6px", background: c.dim, border: `1px solid ${c.border}`, flexShrink: 0, whiteSpace: "nowrap" }}>
              {project.year}
            </span>
          </div>

          <p style={{ fontFamily: "var(--font-body)", fontSize: "13px", lineHeight: 1.65, color: "rgba(255,255,255,0.5)", margin: "0 0 14px" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.slice(0, 4).map((tag) => (
              <span key={tag} style={{
                fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", fontWeight: 600,
                letterSpacing: "0.04em", textTransform: "uppercase",
                padding: "3px 9px", borderRadius: "6px",
                border: `1px solid ${hovered ? c.border : "rgba(255,255,255,0.07)"}`,
                background: hovered ? c.dim : "rgba(255,255,255,0.03)",
                color: hovered ? c.accent : "rgba(255,255,255,0.4)",
                transition: "all 0.25s ease",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ height: "2px", background: `linear-gradient(90deg, ${c.accent}, #8b5cf6)`, transform: `scaleX(${hovered ? 1 : 0})`, transformOrigin: "left", transition: "transform 0.4s ease" }} />
      </div>
    </motion.div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
const Projects = () => {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const projects: Project[] = ((projectsData.projects as any) || []).slice().sort((a: Project, b: Project) => {
    const ap = typeof a.priority === "number" ? a.priority : 999;
    const bp = typeof b.priority === "number" ? b.priority : 999;
    if (ap !== bp) return ap - bp;
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

  const flagship = projects.find((p) => p.id === "uber-ride-platform");
  const cards    = projects.filter((p) => p.id !== "uber-ride-platform");
  const techs    = [...new Set(projects.flatMap((p) => p.tags))];

  return (
    <section id="projects" ref={ref} style={{ position: "relative", zIndex: 1, padding: "100px 0 80px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          style={{ textAlign: "center", marginBottom: "64px" }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, transparent, #6366f1)" }} />
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#6366f1" }}>
              Featured Work
            </span>
            <div style={{ height: "1px", width: "60px", background: "linear-gradient(90deg, #6366f1, transparent)" }} />
          </div>

          <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.05 }}>
            <span style={{ color: "#f8fafc" }}>What I&apos;ve </span>
            <span style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6, #f472b6)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>Built</span>
          </h2>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "16px", color: "rgba(255,255,255,0.5)", maxWidth: "500px", margin: "0 auto 28px", lineHeight: 1.7 }}>
            Production-grade applications — React frontends, Java Spring Boot backends, REST APIs &amp; blockchain DApps.
          </p>

          <div style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "9999px", padding: "12px 28px", gap: "24px" } as any}>
            {[
              { n: projects.length,                              l: "Projects" },
              { n: projects.filter(p => p.featured).length,     l: "Featured" },
              { n: techs.length,                                 l: "Technologies" },
            ].map((s, i) => (
              <span key={s.l} style={{ display: "flex", alignItems: "center", gap: i > 0 ? "24px" : "0" }}>
                {i > 0 && <span style={{ width: 1, height: 28, background: "rgba(255,255,255,0.08)", display: "inline-block", marginRight: "24px" }} />}
                <span style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <span style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "18px", fontWeight: 700, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>{s.n}</span>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: "10px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{s.l}</span>
                </span>
              </span>
            ))}
          </div>
        </motion.div>

        {/* Flagship */}
        {flagship && <FlagshipCard project={flagship} />}

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }} className="projects-masonry">
          {cards.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>

      <style>{`
        .flagship-image-col { min-height: 400px; }
        @media (max-width: 900px) {
          .flagship-grid { grid-template-columns: 1fr !important; }
          .flagship-image-col { min-height: 260px !important; }
        }
        @media (max-width: 600px) {
          .projects-masonry { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .flagship-image-col { min-height: 220px !important; }
        }
      `}</style>
    </section>
  );
};

export default Projects;