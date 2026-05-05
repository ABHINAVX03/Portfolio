"use client";
import styles from "./projects.module.css";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import projectsData from "@/utils/projects/index.json";
import Image from "next/image";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      staggerDirection: 1
    }
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.9,
    filter: "blur(10px)"
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.23, 1, 0.32, 1],
      type: "spring",
      stiffness: 100
    }
  },
};

const colorConfig = {
  primary: {
    accent:      "#4f8ef7",
    glow:        "rgba(79,142,247,0.18)",
    border:      "rgba(79,142,247,0.22)",
    tagBg:       "rgba(79,142,247,0.1)",
    tagBorder:   "rgba(79,142,247,0.28)",
    gradient:    "linear-gradient(135deg, #4f8ef7 0%, #00d4ff 100%)",
  },
  cyan: {
    accent:      "#00d4ff",
    glow:        "rgba(0,212,255,0.16)",
    border:      "rgba(0,212,255,0.22)",
    tagBg:       "rgba(0,212,255,0.08)",
    tagBorder:   "rgba(0,212,255,0.28)",
    gradient:    "linear-gradient(135deg, #00d4ff 0%, #0099cc 100%)",
  },
  violet: {
    accent:      "#8b5cf6",
    glow:        "rgba(139,92,246,0.16)",
    border:      "rgba(139,92,246,0.22)",
    tagBg:       "rgba(139,92,246,0.08)",
    tagBorder:   "rgba(139,92,246,0.28)",
    gradient:    "linear-gradient(135deg, #8b5cf6 0%, #c084fc 100%)",
  },
  emerald: {
    accent:      "#10b981",
    glow:        "rgba(16,185,129,0.16)",
    border:      "rgba(16,185,129,0.22)",
    tagBg:       "rgba(16,185,129,0.08)",
    tagBorder:   "rgba(16,185,129,0.28)",
    gradient:    "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
  },
};

/* ---- GitHub SVG ---- */
const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Unique project card with reveal animation
const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cfg = colorConfig[project.color] || colorConfig.primary;

  return (
    <motion.article
      className={styles.projectCard}
      variants={fadeUp}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ "--accent": cfg.accent, "--glow": cfg.glow, "--border-c": cfg.border }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      layout
    >
      {/* Image with overlay */}
      <div className={styles.cardImage}>
        <Image
          src={project.image}
          alt={project.name}
          width={400}
          height={250}
          className={styles.image}
          loading="lazy"
          unoptimized
        />
        <div className={styles.imageOverlay} />

        {/* Floating number */}
        <motion.div
          className={styles.projectNumber}
          animate={isHovered ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.div>

        {/* Hover reveal content */}
        <motion.div
          className={styles.hoverContent}
          initial={{ opacity: 0, y: 20 }}
          animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.hoverActions}>
            <motion.a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actionBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GithubIcon /> Code
            </motion.a>
            {project.deploy && (
              <motion.a
                href={project.deploy}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.actionBtn}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <OpenInNewIcon /> Live
              </motion.a>
            )}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.projectTitle}>{project.name}</h3>
          <span className={styles.projectType} style={{ color: cfg.accent }}>
            {project.type}
          </span>
        </div>

        <p className={styles.projectDesc}>{project.description}</p>

        <div className={styles.techStack}>
          {project.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className={styles.techTag}
              style={{
                background: `rgba(${cfg.accent.replace('rgb(', '').replace(')', '')}, 0.1)`,
                borderColor: `rgba(${cfg.accent.replace('rgb(', '').replace(')', '')}, 0.3)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={isHovered ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 1 }}
              transition={{ delay: tagIndex * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Animated border */}
      <motion.div
        className={styles.cardBorder}
        style={{ background: cfg.gradient }}
        initial={{ scaleX: 0 }}
        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.article>
  );
};

/* ---- Main section ---- */
const Projects = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const projects = (projectsData.projects || []).slice().sort((a, b) => {
    const aPriority = typeof a.priority === "number" ? a.priority : 999;
    const bPriority = typeof b.priority === "number" ? b.priority : 999;
    if (aPriority !== bPriority) return aPriority - bPriority;
    if (a.featured !== b.featured) return b.featured - a.featured;
    return b.year - a.year;
  });
  const stats = {
    total: projects.length,
    featured: projects.filter((project) => project.featured).length,
    technologies: projects.reduce((acc, project) => {
      project.tags.forEach((tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {}),
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>

        {/* ---- Header ---- */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className={styles.labelRow}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Featured Work</span>
            <span className={styles.labelLine} />
          </div>

          <h2 className={styles.heading}>
            Projects that <span className={styles.headingAccent}>Matter</span>
          </h2>
          <p className={styles.subheading}>
            Production-grade applications — React frontends, Java Spring Boot backends, REST APIs & more.
          </p>

          {/* Count pills */}
          <div className={styles.statRow}>
            <div className={styles.statPill}>
              <span className={styles.statNum}>{stats.total}</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statPill}>
              <span className={styles.statNum}>{stats.featured}</span>
              <span className={styles.statLabel}>Featured</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statPill}>
              <span className={styles.statNum}>{Object.keys(stats.technologies).length}</span>
              <span className={styles.statLabel}>Technologies</span>
            </div>
          </div>
        </motion.div>

        {/* ---- Unique Masonry Grid ---- */}
        <motion.div
          className={styles.masonryGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Projects;
