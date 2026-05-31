"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import socials from "@/utils/socials";

const skills = ["React", "Next.js", "TypeScript", "Java", "Spring Boot", "PostgreSQL"];
const roles = ["Full Stack Developer", "Java Spring Boot Engineer", "React Developer"];
const stats = ["300+ DSA", "8.51 CGPA", "7 Live Demos", "1 Internship"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const currentRole = roles[roleIndex];

  useEffect(() => {
    const interval = window.setInterval(
      () => {
        setDisplayText((prev) => {
          if (!isDeleting && prev === currentRole) {
            window.setTimeout(() => setIsDeleting(true), 900);
            return prev;
          }

          if (isDeleting && prev.length === 0) {
            setIsDeleting(false);
            setRoleIndex((idx) => (idx + 1) % roles.length);
            return prev;
          }

          return isDeleting ? currentRole.slice(0, prev.length - 1) : currentRole.slice(0, prev.length + 1);
        });
      },
      isDeleting ? 45 : 85,
    );

    return () => window.clearInterval(interval);
  }, [currentRole, isDeleting]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const codeSnippet = useMemo(
    () =>
      `public class PortfolioProfile {
  private final String name = "Abhinav Gupta";
  private final String role = "Full Stack Developer";
  private final String location = "Delhi, India";

  public List<String> stack() {
    return List.of("React", "Next.js", "Spring Boot", "TypeScript");
  }

  public String availability() {
    return "Open to full-time, freelance, remote";
  }
}`,
    [],
  );

  return (
    <section id="home" className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 md:pt-12">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,_rgba(79,142,247,0.25),_transparent_60%)]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 hidden h-56 w-56 rounded-full bg-[#4F8EF7]/20 blur-3xl md:block"
        animate={{ x: mouse.x - 160, y: mouse.y - 140 }}
        transition={{ type: "spring", damping: 28, stiffness: 90, mass: 0.5 }}
      />

      <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="space-y-6"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-[#22c470]/50 bg-[#22c470]/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#77efaa]">
            <span className="h-2 w-2 rounded-full bg-[#22c470]" />
            Full Stack Engineer
          </p>

          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white via-[#b6cdfd] to-[#4F8EF7] bg-clip-text text-transparent">
              Abhinav Gupta
            </span>
          </h1>

          <p className="min-h-8 font-mono text-base text-[#9bc0ff] sm:text-lg">
            {displayText}
            <span className="ml-1 animate-pulse text-[#4F8EF7]">|</span>
          </p>

          <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            MCA student at IIIT Vadodara (8.51/10), BCA from GGSIPU (9.2/10), Codeforces Pupil, and problem
            solver with 300+ DSA problems solved.
          </p>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/90"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={socials.Mail}
              className="inline-flex items-center gap-2 rounded-xl bg-[#22c470] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#32d983]"
              aria-label="Email Abhinav for hiring opportunities"
            >
              Hire Me
              <FiMail size={16} />
            </a>
            <a
              href="/resume/Resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[#4F8EF7] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#3f7ee6]"
              aria-label="Download resume"
            >
              <FiDownload size={16} />
              Download Resume
            </a>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              aria-label="View projects section"
            >
              View Projects
              <FiArrowRight size={16} />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={socials.Github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="rounded-lg border border-white/15 bg-white/5 p-2.5 text-white/85 transition hover:text-white"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={socials.Linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit LinkedIn profile"
              className="rounded-lg border border-white/15 bg-white/5 p-2.5 text-white/85 transition hover:text-white"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href={socials.Mail}
              aria-label="Send an email"
              className="rounded-lg border border-white/15 bg-white/5 p-2.5 text-white/85 transition hover:text-white"
            >
              <FiMail size={18} />
            </a>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 28 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="rounded-2xl border border-white/15 bg-[#080b14]/80 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-5"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-xs text-white/60">Profile.java</span>
          </div>
          <pre className="overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs leading-6 text-[#dbe7ff] sm:text-sm">
            <code>{codeSnippet}</code>
          </pre>
        </motion.div>
      </div>

      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat}
            className="rounded-xl border border-white/10 bg-black/20 px-3 py-3 text-center text-sm text-white/90"
          >
            {stat}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
