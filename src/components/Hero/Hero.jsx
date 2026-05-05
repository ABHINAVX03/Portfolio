"use client";
import styles from "./hero.module.css";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link } from "react-scroll";
import socials from "@/utils/socials";

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const techBadges = [
  { label: "React", color: "cyan" },
  { label: "Next.js", color: "primary" },
  { label: "Java", color: "emerald" },
  { label: "Spring Boot", color: "emerald" },
  { label: "REST APIs", color: "violet" },
];

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <motion.div
          className={styles.content}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Status badge */}
          <motion.div className={styles.statusBadge} variants={itemVariants}>
            <span className={styles.statusDot} />
            Available for opportunities
          </motion.div>

          {/* Heading */}
          <motion.div className={styles.headingBlock} variants={itemVariants}>
            <h1 className={styles.name}>
              Abhinav<br />
              <span className={styles.nameAccent}>Gupta</span>
            </h1>
          </motion.div>

          {/* Typewriter role */}
          <motion.div className={styles.roleBlock} variants={itemVariants}>
            <span className={styles.rolePrefix}>{"<"}</span>
            <span className={styles.role}>
              <Typewriter
                words={[
                  "Full Stack Developer",
                  "React Developer",
                  "Java Spring Boot Dev",
                  "REST API Engineer",
                  "Next.js Engineer",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={2000}
              />
            </span>
            <span className={styles.rolePrefix}>{"/>"}</span>
          </motion.div>

          {/* Description */}
          <motion.p className={styles.description} variants={itemVariants}>
            I craft high-performance web applications with{" "}
            <strong>React & Next.js</strong> on the frontend and{" "}
            <strong>Java Spring Boot</strong> powering scalable REST APIs on the
            backend. Passionate about clean architecture and great UX.
          </motion.p>

          {/* Tech badges */}
          <motion.div className={styles.badges} variants={itemVariants}>
            {techBadges.map((b) => (
              <span key={b.label} className={`${styles.badge} ${styles[`badge_${b.color}`]}`}>
                {b.label}
              </span>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div className={styles.actions} variants={itemVariants}>
            <a
              href="https://drive.google.com/file/d/1eUGL9v-nDdo9setCaWis9LgrIdmSyC9V/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btnPrimary}
              id="hero-resume-btn"
            >
              <CloudDownloadIcon style={{ fontSize: 18 }} />
              Download Resume
            </a>
            <Link to="projects" smooth duration={600} className={styles.btnOutline} id="hero-projects-btn">
              View Projects →
            </Link>
          </motion.div>

          {/* Socials */}
          <motion.div className={styles.socials} variants={itemVariants}>
            <a href={socials.Github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <GitHubIcon style={{ fontSize: 20 }} />
            </a>
            <a href={socials.Linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <LinkedInIcon style={{ fontSize: 20 }} />
            </a>
            <a href={socials.Mail} className={styles.socialLink} aria-label="Email">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Right — decorative code card */}
        <motion.div
          className={styles.codeCard}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1], delay: 0.4 }}
        >
          <div className={styles.codeHeader}>
            <span className={styles.codeDot} style={{ background: "#ff5f57" }} />
            <span className={styles.codeDot} style={{ background: "#febc2e" }} />
            <span className={styles.codeDot} style={{ background: "#28c840" }} />
            <span className={styles.codeFileName}>Developer.java</span>
          </div>
          <pre className={styles.codeBody}>
            <code>{`@RestController
public class Developer {

  @Value
  private String name = 
    "Abhinav Gupta";

  @GetMapping("/skills")
  public List<String> skills() {
    return List.of(
      "React", "Next.js",
      "Java", "Spring Boot",
      "REST APIs", "PostgreSQL",
      "Docker", "Git"
    );
  }

  @GetMapping("/status")
  public String status() {
    return "Open to Work ✓";
  }
}`}</code>
          </pre>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className={styles.scrollLine} />
        <span>scroll</span>
      </motion.div>
    </section>
  );
};

export default Hero;
