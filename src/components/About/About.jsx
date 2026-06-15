"use client";
import styles from "./about.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import StackSlider from "../StackSlider/StackSlider";
import socials from "@/utils/socials";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08, // FIX: was 0.15 — 7 stat cards × 0.2s stagger = 1.4s total; now faster
      delayChildren: 0.1,
      staggerDirection: 1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.23, 1, 0.32, 1],
    },
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

const skills = [
  { category: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Solidity"] },
  { category: "Frontend", items: ["HTML", "CSS", "Bootstrap", "Tailwind CSS", "React.js", "Next.js"] },
  { category: "Backend & Database", items: ["Node.js", "Express.js", "Spring Boot", "MongoDB", "SQL", "REST APIs"] },
  { category: "Blockchain & Tools", items: ["Web3.js", "MetaMask", "Ganache", "Truffle", "Remix IDE", "Docker", "JWT", "GitHub"] },
];

const learningNow = [
  "Kafka event-driven architecture basics",
  "DSA preparation for placements",
  "Advanced Next.js performance patterns",
  "Microservices observability (OpenTelemetry)",
];

const buildingNow = [
  "Kafka-backed notification pipeline prototype",
  "System design notes and backend case-study writeups",
  "Consistent DSA problem-solving routine",
];

const experience = [
  {
    role: "Software Developer Intern",
    org: "Blockchain Developer Trainee · Code Eater",
    period: "Aug 2023 - Oct 2023",
    points: [
      "Built Ethereum smart contracts in Solidity for a marketplace and a Twitter-style dApp.",
      "Tested and deployed contracts locally with Ganache and Truffle for reliability and correctness.",
      "Integrated contracts with React frontend using Web3.js and MetaMask for seamless UX.",
      "Wrote modular code with focus on security best practices and gas efficiency.",
    ],
  },
];

const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "Indian Institute of Information Technology Vadodara (IIIT Vadodara)",
    period: "2025 - 2028",
    highlight: "GPA: 8.51 / 10 · Gandhinagar, Gujarat",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    period: "2021 - 2024",
    highlight: "GPA: 9.2 / 10 · Rohini, Delhi-NCT",
  },
];

const codingProfiles = [
  { name: "LeetCode", meta: "300+ DSA problems", url: "https://leetcode.com/u/ABHINAVX03/" },
  { name: "GeeksforGeeks", meta: "Active practice", url: "https://www.geeksforgeeks.org/user/ABHINAVX03/" },
  { name: "GitHub", meta: "ABHINAVX03", url: "https://github.com/ABHINAVX03" },
  { name: "Codeforces", meta: "Pupil", url: "https://codeforces.com/profile/ABHINAVX03" },
  { name: "HackerRank", meta: "Java · React · Problem Solving", url: "https://www.hackerrank.com/profile/ABHINAVX03" },
];

const certifications = [
  "HackerRank Problem Solving",
  "HackerRank React Development",
  "Hackathon - HACKOUT '25",
  "TLE Eliminators - Level 1",
  "TLE Eliminators - Level 2",
  "Coding Society Representative at GGSIPU",
];

// FIX: Rewritten typewriter hook using refs to avoid stale-closure / reschedule bugs.
// Old version: used currentIndex as state → effect re-ran on every keystroke from a stale closure.
// New version: refs track index & whether component is still mounted; effect runs once and cleans up properly.
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState("");
  const indexRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    indexRef.current = 0;
    setDisplayText("");

    const tick = () => {
      if (!mountedRef.current) return;
      if (indexRef.current >= text.length) return;
      indexRef.current += 1;
      setDisplayText(text.slice(0, indexRef.current));
      setTimeout(tick, speed);
    };

    const id = setTimeout(tick, speed);
    return () => {
      mountedRef.current = false;
      clearTimeout(id);
    };
  }, [text, speed]);

  return displayText;
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const bioText =
    "I'm an MCA student at IIIT Vadodara and a full stack developer focused on production-grade web applications. I build performant React interfaces and scalable backend systems with Spring Boot, Node.js, and REST APIs, with additional hands-on blockchain experience in Solidity and Web3.";
  const typewriterText = useTypewriter(bioText, 30);

  const [githubData, setGithubData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(true);

  useEffect(() => {
    // FIX: AbortController prevents setState on unmounted component.
    // Old code had no abort → React "Can't perform state update on unmounted component" warning.
    const controller = new AbortController();

    fetch("/api/github/profile", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        setGithubData(data);
        setLoadingGithub(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return; // component unmounted — silently ignore
        console.error("Error fetching GitHub data:", err);
        setLoadingGithub(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Section label */}
          <motion.div className={styles.sectionLabel} variants={itemVariants}>
            <span className={styles.labelLine} />
            <span style={{ color: "white" }}>About Me</span>
            <span className={styles.labelLine} />
          </motion.div>

          {/* Unique layout with floating elements */}
          <div className={styles.uniqueLayout}>
            {/* Left — Hero content with typewriter */}
            <motion.div className={styles.heroContent} variants={itemVariants}>
              <h2 className={styles.title} style={{ color: "grey" }}>
                Crafting <span className={styles.titleAccent}>Full Stack</span>
                <br />
                Experiences
              </h2>

              {/*
                FIX: aria-live="polite" so screen readers announce the completed text once it's done,
                rather than reading each character individually.
                The visually-hidden span provides the full text immediately for AT,
                while the visible typewriter plays for sighted users.
              */}
              <div
                className={styles.typewriterContainer}
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Visually hidden full text for screen readers — always present */}
                <span className="sr-only">{bioText}</span>
                {/* Visible typewriter — hidden from AT since sr-only covers it */}
                <p className={styles.bio} style={{ color: "white" }} aria-hidden="true">
                  {typewriterText}
                  <span className={styles.cursor}>|</span>
                </p>
              </div>

              <p className={styles.bioSecondary}>
                I care deeply about clean code, system design, and delivering experiences that users love.
                Whether it&apos;s a complex backend architecture or a micro-interaction on a button — every
                detail matters to me.
              </p>
            </motion.div>

            {/* Right — Animated stats and skills */}
            <motion.div className={styles.statsSkillsContainer} variants={itemVariants}>
              {/* Animated Stats */}
              {/* FIX: stagger reduced to 0.08s (was 0.2s) — 7 cards × 0.2 = 1.4s total delay */}
              <div className={styles.animatedStats}>
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className={styles.statCard}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      delay: index * 0.08,
                      duration: 0.45,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <div className={styles.statValue}>{stat.value}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                    <div className={styles.statGlow} />
                  </motion.div>
                ))}
              </div>

              {/* Skills with unique visualization */}
              <div className={styles.skillsVisualization}>
                {skills.map((group, groupIndex) => (
                  <motion.div
                    key={group.category}
                    className={styles.skillGroup}
                    initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + groupIndex * 0.1 }}
                  >
                    <h3 className={styles.skillCategory}>{group.category}</h3>
                    <div className={styles.skillItems}>
                      {group.items.map((item, itemIndex) => (
                        <motion.span
                          key={item}
                          className={styles.skillItem}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{
                            delay: 0.5 + groupIndex * 0.1 + itemIndex * 0.04,
                            duration: 0.3,
                          }}
                          whileHover={{
                            scale: 1.08,
                            backgroundColor: "rgba(34, 196, 112, 0.2)",
                            boxShadow: "0 8px 25px rgba(34, 196, 112, 0.3)",
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Learning Now */}
                <motion.div
                  className={styles.skillGroup}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9 }}
                >
                  <h3 className={styles.skillCategory}>Currently Learning</h3>
                  <div className={styles.skillItems}>
                    {learningNow.map((topic) => (
                      <motion.span
                        key={topic}
                        className={styles.skillItem}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Building Now */}
                <motion.div
                  className={styles.skillGroup}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.0 }}
                >
                  <h3 className={styles.skillCategory}>What I&apos;m Building</h3>
                  <div className={styles.skillItems}>
                    {buildingNow.map((item) => (
                      <motion.span
                        key={item}
                        className={styles.skillItem}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3 }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* GitHub Section */}
          <motion.div className={styles.proGithubSection} variants={itemVariants}>
            <div className={styles.proGithubHeader}>
              <div>
                <h3 className={styles.activityTitle}>Open Source Contributions</h3>
                <p className={styles.activitySubtitle}>
                  My latest activity and repository stats on GitHub.
                </p>
              </div>
              <a
                href={socials.Github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.githubProBtn}
              >
                <FiGithub size={20} />
                <span>View Profile</span>
              </a>
            </div>

            {/* FIX: skeleton loader while GitHub data fetches — prevents layout shift */}
            {loadingGithub ? (
              <div className={styles.proGithubStats} aria-busy="true" aria-label="Loading GitHub stats">
                {[0, 1, 2].map((i) => (
                  <div key={i} className={styles.proStatItem}>
                    <div
                      style={{
                        width: 60,
                        height: 32,
                        borderRadius: 6,
                        background: "rgba(255,255,255,0.07)",
                        animation: "pulse 1.4s ease-in-out infinite",
                        marginBottom: 6,
                      }}
                    />
                    <div
                      style={{
                        width: 80,
                        height: 10,
                        borderRadius: 4,
                        background: "rgba(255,255,255,0.05)",
                        animation: "pulse 1.4s ease-in-out infinite",
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : githubData && !githubData.error ? (
              <div className={styles.proGithubStats}>
                <div className={styles.proStatItem}>
                  <span className={styles.proStatValue}>{githubData.totalStars}</span>
                  <span className={styles.proStatLabel}>Total Stars</span>
                </div>
                <div className={styles.proStatDivider} />
                <div className={styles.proStatItem}>
                  <span className={styles.proStatValue}>{githubData.publicRepos}</span>
                  <span className={styles.proStatLabel}>Repositories</span>
                </div>
                <div className={styles.proStatDivider} />
                <div className={styles.proStatItem}>
                  <span className={styles.proStatValue}>{githubData.followers}</span>
                  <span className={styles.proStatLabel}>Followers</span>
                </div>
              </div>
            ) : null}
          </motion.div>

          {/* Experience Section */}
          <motion.div className={styles.activitySection} variants={itemVariants}>
            <h3 className={styles.activityTitle}>Experience</h3>
            <div className={styles.timelineList}>
              {experience.map((item) => (
                <div key={item.role} className={styles.timelineItem}>
                  <div className={styles.timelineHead}>
                    <h4>{item.role}</h4>
                    <span>{item.period}</span>
                  </div>
                  <p className={styles.timelineOrg}>{item.org}</p>
                  <ul>
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Education Section */}
          <motion.div className={styles.activitySection} variants={itemVariants}>
            <h3 className={styles.activityTitle}>Education</h3>
            <div className={styles.timelineList}>
              {education.map((item) => (
                <div key={item.degree} className={styles.timelineItem}>
                  <div className={styles.timelineHead}>
                    <h4>{item.degree}</h4>
                    <span>{item.period}</span>
                  </div>
                  <p className={styles.timelineOrg}>{item.school}</p>
                  <p className={styles.timelineNote}>{item.highlight}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Coding Profiles & Certifications */}
          <div className={styles.splitGrid}>
            <motion.div className={styles.activitySection} variants={itemVariants}>
              <h3 className={styles.activityTitle}>Coding Profiles</h3>
              <div className={styles.profileGrid}>
                {codingProfiles.map((profile) => (
                  <a
                    key={profile.name}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.profileCard}
                  >
                    <span>{profile.name}</span>
                    <small className={styles.profileMeta}>{profile.meta}</small>
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div className={styles.activitySection} variants={itemVariants}>
              <h3 className={styles.activityTitle}>Certifications</h3>
              <div className={styles.certList}>
                {certifications.map((cert) => (
                  <div key={cert} className={styles.certItem}>
                    {cert}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Socials */}
          <motion.div className={styles.socialsContainer} variants={itemVariants}>
            <div className={styles.socialsGrid}>
              <motion.a
                href={socials.Github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialOrb}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiGithub size={24} />
                <span>GitHub</span>
              </motion.a>

              <motion.a
                href={socials.Linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialOrb}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiLinkedin size={24} />
                <span>LinkedIn</span>
              </motion.a>

              <motion.a
                href={socials.Mail}
                className={styles.socialOrb}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiMail size={24} />
                <span>Email</span>
              </motion.a>

              <div className={styles.locationOrb}>
                <a href={socials.Location} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <FiMapPin size={20} />
                  <span>Delhi, India</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Tech stack slider */}
          <motion.div className={styles.sliderWrap} variants={itemVariants}>
            <p className={styles.sliderLabel}>Technologies I work with</p>
            <StackSlider />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;