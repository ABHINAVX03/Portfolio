"use client";
import styles from "./about.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import StackSlider from "../StackSlider/StackSlider";
import socials from "@/utils/socials";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiExternalLink } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] },
  },
};

const stats = [
  { value: "300+", label: "DSA Problems" },
  { value: "8.51", label: "CGPA (MCA)" },
  { value: "8", label: "Projects Shipped" },
  { value: "1", label: "Internship" },
  { value: "7", label: "Deployments" },
  { value: "2", label: "Hackathons" },
  { value: "3", label: "Certifications" },
];

const skillGroups = [
  { category: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Solidity"] },
  { category: "Frontend", items: ["HTML", "CSS", "Tailwind CSS", "React.js", "Next.js", "Bootstrap"] },
  { category: "Backend & Database", items: ["Node.js", "Express.js", "Spring Boot", "MongoDB", "PostgreSQL", "REST APIs"] },
  { category: "Tools & Infra", items: ["Docker", "JWT", "Web3.js", "MetaMask", "Ganache", "Truffle", "GitHub"] },
];

const learningNow = [
  "Kafka event-driven architecture",
  "System design & HLD/LLD patterns",
  "Advanced Next.js performance",
  "Microservices observability",
];

const buildingNow = [
  "Backend notification pipeline prototype",
  "System design case-study writeups",
  "Consistent DSA grind routine",
];

const experience = [
  {
    role: "Blockchain Developer Trainee",
    org: "Code Eater",
    period: "Aug 2023 – Oct 2023",
    points: [
      "Built Ethereum smart contracts in Solidity for a marketplace and a Twitter-style DApp.",
      "Deployed and tested contracts locally with Ganache and Truffle.",
      "Integrated contracts with React frontend using Web3.js and MetaMask.",
      "Wrote modular, gas-efficient code following Solidity security best practices.",
    ],
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "IIIT Vadodara",
    period: "2025 – 2028",
    highlight: "GPA: 8.51 / 10  ·  Gandhinagar, Gujarat",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Guru Gobind Singh Indraprastha University",
    period: "2021 – 2024",
    highlight: "GPA: 9.2 / 10  ·  Rohini, Delhi-NCT",
  },
];

const codingProfiles = [
  { name: "LeetCode", meta: "300+ problems", url: "https://leetcode.com/u/ABHINAVX03/" },
  { name: "GeeksforGeeks", meta: "Active", url: "https://www.geeksforgeeks.org/user/ABHINAVX03/" },
  { name: "Codeforces", meta: "Pupil (~1383)", url: "https://codeforces.com/profile/ABHINAVX03" },
  { name: "HackerRank", meta: "Java · React · PS", url: "https://www.hackerrank.com/profile/ABHINAVX03" },
  { name: "GitHub", meta: "ABHINAVX03", url: "https://github.com/ABHINAVX03" },
];

const certifications = [
  "HackerRank Problem Solving",
  "HackerRank React Development",
  "Hackathon – HACKOUT '25",
  "TLE Eliminators Level 1",
  "TLE Eliminators Level 2",
  "Coding Society Representative · GGSIPU",
];

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 30) {
  const [display, setDisplay] = useState("");
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    indexRef.current = 0;
    setDisplay("");
    const tick = () => {
      if (!mountedRef.current) return;
      if (indexRef.current >= text.length) return;
      indexRef.current += 1;
      setDisplay(text.slice(0, indexRef.current));
      setTimeout(tick, speed);
    };
    const id = setTimeout(tick, speed);
    return () => { mountedRef.current = false; clearTimeout(id); };
  }, [text, speed]);

  return display;
}

/* ── Shared token shorthands ── */
const T = {
  accent:  "#6366f1",
  violet:  "#8b5cf6",
  rose:    "#f472b6",
  emerald: "#34d399",
  text:    "#f8fafc",
  muted:   "rgba(255,255,255,0.5)",
  dimmer:  "rgba(255,255,255,0.25)",
  border:  "rgba(255,255,255,0.07)",
  cardBg:  "rgba(10,10,20,0.7)",
  mono:    "var(--font-jetbrains-mono)",
  sans:    "var(--font-space-grotesk)",
  body:    "var(--font-body)",
  dim:     "rgba(99,102,241,0.08)",
  dimBorder: "rgba(99,102,241,0.2)",
};

const card = {
  background: T.cardBg,
  border: `1px solid ${T.border}`,
  borderRadius: "16px",
  padding: "20px 22px",
  backdropFilter: "blur(12px)",
};

/* ── Eyebrow label ── */
function Eyebrow({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", marginBottom: "64px" }}>
      <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, transparent, #6366f1)" }} />
      <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.accent }}>
        {text}
      </span>
      <div style={{ height: 1, width: 60, background: "linear-gradient(90deg, #6366f1, transparent)" }} />
    </div>
  );
}

/* ── Section heading ── */
function SectionHeading({ children }) {
  return (
    <h3 style={{ fontFamily: T.sans, fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", color: T.text, margin: "0 0 20px", lineHeight: 1.2 }}>
      {children}
    </h3>
  );
}

/* ── Skill pill ── */
function SkillPill({ label }) {
  return (
    <span style={{
      fontFamily: T.mono,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.04em",
      padding: "5px 12px",
      borderRadius: 9999,
      border: `1px solid ${T.dimBorder}`,
      background: T.dim,
      color: "#c7d2fe",
      display: "inline-block",
      transition: "all 0.2s ease",
    }}>
      {label}
    </span>
  );
}

/* ── Timeline card ── */
function TimelineItem({ role, org, period, points, highlight }) {
  return (
    <div style={{ ...card, marginBottom: 12, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${T.accent}, ${T.violet}, transparent)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap", marginBottom: 6 }}>
        <h4 style={{ fontFamily: T.sans, fontSize: 16, fontWeight: 700, color: T.text, margin: 0, letterSpacing: "-0.01em" }}>{role}</h4>
        <span style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: "0.04em", flexShrink: 0 }}>{period}</span>
      </div>
      <p style={{ fontFamily: T.body, fontSize: 13, color: "#a5b4fc", margin: "0 0 10px", fontWeight: 500 }}>{org}</p>
      {points && (
        <ul style={{ margin: 0, paddingLeft: "1rem", color: T.muted, fontSize: 13, lineHeight: 1.65 }}>
          {points.map((p) => <li key={p} style={{ marginBottom: 4 }}>{p}</li>)}
        </ul>
      )}
      {highlight && <p style={{ margin: 0, fontFamily: T.mono, fontSize: 12, color: T.muted, letterSpacing: "0.03em" }}>{highlight}</p>}
    </div>
  );
}

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bioText =
    "I'm an MCA student at IIIT Vadodara and a full stack developer focused on production-grade web apps. I build performant React interfaces and scalable backend systems with Spring Boot, Node.js, and REST APIs — with additional blockchain experience in Solidity and Web3.";
  const typewriterText = useTypewriter(bioText, 28);

  const [githubData, setGithubData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/github/profile", { signal: controller.signal })
      .then((r) => r.json())
      .then((d) => { setGithubData(d); setLoadingGithub(false); })
      .catch((e) => { if (e.name !== "AbortError") setLoadingGithub(false); });
    return () => controller.abort();
  }, []);

  return (
    <section id="about" ref={ref} style={{ position: "relative", zIndex: 1, padding: "100px 0 80px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* ── Header ── */}
          <motion.div variants={itemVariants}>
            <Eyebrow text="About Me" />
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{
                fontFamily: T.sans,
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                margin: "0 0 16px",
                lineHeight: 1.05,
              }}>
                <span style={{ color: T.text }}>Who I </span>
                <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.violet}, ${T.rose})`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>Am</span>
              </h2>
              <p style={{ fontFamily: T.body, fontSize: 16, color: T.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                Building things that matter — clean code, thoughtful architecture, and interfaces people enjoy.
              </p>
            </div>
          </motion.div>

          {/* ── Two-column intro ── */}
          <motion.div
            variants={itemVariants}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 32,
              marginBottom: 48,
              alignItems: "start",
            }}
            className="about-two-col"
          >
            {/* Left — typewriter bio + secondary */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ ...card, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.accent}, ${T.violet}, transparent)` }} />
                <p
                  style={{ fontFamily: T.body, fontSize: 15, lineHeight: 1.78, color: T.text, margin: 0, minHeight: 96 }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <span className="sr-only">{bioText}</span>
                  <span aria-hidden="true">{typewriterText}<span style={{ color: T.accent, animation: "aboutBlink 1s step-end infinite" }}>█</span></span>
                </p>
              </div>
              <div style={{ ...card }}>
                <p style={{ fontFamily: T.body, fontSize: 14, lineHeight: 1.7, color: T.muted, margin: 0 }}>
                  I care deeply about clean code, system design, and delivering experiences that users love.
                  Whether it&apos;s a complex backend architecture or a micro-interaction — every detail matters to me.
                </p>
              </div>

              {/* social links */}
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {[
                  { href: socials.Github,   icon: <FiGithub size={16} />,   label: "GitHub" },
                  { href: socials.Linkedin, icon: <FiLinkedin size={16} />, label: "LinkedIn" },
                  { href: socials.Mail,     icon: <FiMail size={16} />,     label: "Email" },
                  { href: socials.Location, icon: <FiMapPin size={16} />,   label: "Delhi, India" },
                ].map(({ href, icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={label !== "Email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={label}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 7,
                      padding: "8px 14px", borderRadius: 9999,
                      border: `1px solid ${T.border}`,
                      background: "rgba(255,255,255,0.03)",
                      color: T.muted, textDecoration: "none",
                      fontFamily: T.body, fontSize: 13, fontWeight: 500,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = T.text;
                      e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
                      e.currentTarget.style.background = T.dim;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = T.muted;
                      e.currentTarget.style.borderColor = T.border;
                      e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                    }}
                  >
                    {icon}{label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — stats grid */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    style={{
                      ...card,
                      textAlign: "center",
                      position: "relative",
                      overflow: "hidden",
                      cursor: "default",
                      transition: "border-color 0.2s ease, background 0.2s ease",
                    }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div style={{
                      fontFamily: T.sans, fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em",
                      background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                      backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent",
                      marginBottom: 4,
                    }}>{stat.value}</div>
                    <div style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Skills ── */}
          <motion.div variants={itemVariants} style={{ marginBottom: 48 }}>
            <SectionHeading>Technical Skills</SectionHeading>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
              {skillGroups.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, x: gi % 2 === 0 ? -24 : 24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.35 + gi * 0.08 }}
                  style={card}
                >
                  <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, margin: "0 0 12px" }}>
                    {group.category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {group.items.map((item) => <SkillPill key={item} label={item} />)}
                  </div>
                </motion.div>
              ))}

              {/* Currently learning */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
                style={{ ...card, borderColor: "rgba(99,102,241,0.18)" }}
              >
                <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.violet, margin: "0 0 12px" }}>
                  Currently Learning
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {learningNow.map((t) => (
                    <span key={t} style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em", padding: "5px 12px", borderRadius: 9999, border: "1px solid rgba(139,92,246,0.25)", background: "rgba(139,92,246,0.08)", color: "#c4b5fd", display: "inline-block" }}>{t}</span>
                  ))}
                </div>
              </motion.div>

              {/* Building now */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.78 }}
                style={{ ...card, borderColor: "rgba(244,114,182,0.18)" }}
              >
                <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.rose, margin: "0 0 12px" }}>
                  What I&apos;m Building
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {buildingNow.map((t) => (
                    <span key={t} style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 600, letterSpacing: "0.03em", padding: "5px 12px", borderRadius: 9999, border: "1px solid rgba(244,114,182,0.25)", background: "rgba(244,114,182,0.08)", color: "#fda4af", display: "inline-block" }}>{t}</span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── GitHub stats ── */}
          <motion.div variants={itemVariants} style={{ ...card, marginBottom: 48, borderColor: "rgba(99,102,241,0.18)", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${T.accent}, ${T.violet}, ${T.rose}, transparent)` }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <h3 style={{ fontFamily: T.sans, fontSize: 20, fontWeight: 700, color: T.text, margin: "0 0 4px", letterSpacing: "-0.02em" }}>Open Source Activity</h3>
                <p style={{ fontFamily: T.body, fontSize: 13, color: T.muted, margin: 0 }}>Latest stats from GitHub</p>
              </div>
              <a
                href={socials.Github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", borderRadius: 9999, border: `1px solid ${T.dimBorder}`, background: T.dim, color: "#c7d2fe", fontFamily: T.body, fontSize: 13, fontWeight: 600, textDecoration: "none", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.5)"; e.currentTarget.style.background = "rgba(99,102,241,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.dimBorder; e.currentTarget.style.background = T.dim; }}
              >
                <FiGithub size={14} /> View Profile
              </a>
            </div>

            {loadingGithub ? (
              <div style={{ display: "flex", gap: 40 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i}>
                    <div style={{ width: 60, height: 28, borderRadius: 6, background: "rgba(255,255,255,0.07)", animation: "aboutPulse 1.4s ease-in-out infinite", marginBottom: 8 }} />
                    <div style={{ width: 80, height: 10, borderRadius: 4, background: "rgba(255,255,255,0.04)", animation: "aboutPulse 1.4s ease-in-out infinite" }} />
                  </div>
                ))}
              </div>
            ) : githubData && !githubData.error ? (
              <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
                {[
                  { v: githubData.totalStars, l: "Total Stars" },
                  { v: githubData.publicRepos, l: "Repositories" },
                  { v: githubData.followers, l: "Followers" },
                ].map(({ v, l }, i) => (
                  <div key={l} style={{ display: "flex", alignItems: "center", gap: i > 0 ? 40 : 0 }}>
                    {i > 0 && <div style={{ width: 1, height: 36, background: T.border, marginRight: 40 }} />}
                    <div>
                      <div style={{ fontFamily: T.sans, fontSize: 28, fontWeight: 700, color: T.text, letterSpacing: "-0.02em" }}>{v}</div>
                      <div style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: T.accent, marginTop: 2 }}>{l}</div>
                    </div>
                  </div>
                ))}
                {githubData.topLanguages?.length > 0 && (
                  <div style={{ marginLeft: "auto", display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center" }}>
                    {githubData.topLanguages.slice(0, 4).map((lang) => (
                      <span key={lang.name} style={{ fontFamily: T.mono, fontSize: 11, padding: "4px 10px", borderRadius: 9999, border: `1px solid ${T.dimBorder}`, background: T.dim, color: "#c7d2fe" }}>{lang.name}</span>
                    ))}
                  </div>
                )}
              </div>
            ) : null}
          </motion.div>

          {/* ── Experience ── */}
          <motion.div variants={itemVariants} style={{ marginBottom: 48 }}>
            <SectionHeading>Experience</SectionHeading>
            {experience.map((item) => (
              <TimelineItem key={item.role} {...item} />
            ))}
          </motion.div>

          {/* ── Education ── */}
          <motion.div variants={itemVariants} style={{ marginBottom: 48 }}>
            <SectionHeading>Education</SectionHeading>
            {education.map((item) => (
              <TimelineItem key={item.degree} role={item.degree} org={item.school} period={item.period} highlight={item.highlight} />
            ))}
          </motion.div>

          {/* ── Coding profiles + Certifications ── */}
          <motion.div
            variants={itemVariants}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}
            className="about-split-grid"
          >
            {/* Coding profiles */}
            <div style={card}>
              <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, margin: "0 0 16px" }}>
                Coding Profiles
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {codingProfiles.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 14px", borderRadius: 12,
                      border: `1px solid ${T.border}`, background: "rgba(255,255,255,0.02)",
                      textDecoration: "none", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(99,102,241,0.3)"; e.currentTarget.style.background = T.dim; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
                  >
                    <span style={{ fontFamily: T.body, fontSize: 14, fontWeight: 600, color: T.text }}>{p.name}</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: T.mono, fontSize: 11, color: T.muted }}>
                      {p.meta} <FiExternalLink size={11} />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div style={card}>
              <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.violet, margin: "0 0 16px" }}>
                Certifications & Achievements
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    style={{
                      padding: "9px 14px", borderRadius: 10,
                      border: `1px solid rgba(139,92,246,0.15)`,
                      background: "rgba(139,92,246,0.05)",
                      fontFamily: T.body, fontSize: 13, color: T.muted,
                      display: "flex", alignItems: "center", gap: 8,
                    }}
                  >
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: T.violet, flexShrink: 0 }} />
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Stack slider ── */}
          <motion.div variants={itemVariants} style={{ paddingTop: 32, borderTop: `1px solid ${T.border}` }}>
            <p style={{ textAlign: "center", fontFamily: T.mono, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.muted, marginBottom: 20 }}>
              Technologies I work with
            </p>
            <StackSlider />
          </motion.div>
        </motion.div>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes aboutBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes aboutPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* These two grids collapse at DIFFERENT widths on purpose:
           .about-two-col (bio text vs. stats numbers) reads fine compressed
           down to ~460px per column, so 900px is an appropriate breakpoint.
           .about-split-grid (coding-profile rows with space-between flex
           layouts, certification rows with icon + text) needs more room
           before wrapping looks clean — those start crowding around
           950-1000px on real devices (iPad landscape, small laptops), so it
           gets its own earlier breakpoint at 1000px rather than sharing
           900px with the other grid. */
        @media (max-width: 1000px) {
          .about-split-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 900px) {
          .about-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default About;