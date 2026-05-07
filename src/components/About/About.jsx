"use client";
import styles from "./about.module.css";
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import StackSlider from "../StackSlider/StackSlider";
import socials from "@/utils/socials";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

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

const itemVariants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    scale: 0.95,
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
      staggerChildren: 0.1
    } 
  },
};

const stats = [
  { value: "200+", label: "DSA Problems" },
  { value: "9.2", label: "CGPA (BCA)" },
  { value: "5", label: "Projects Shipped" },
  { value: "2", label: "Internships / Deployments" },
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
    highlight: "GPA: 9.0 / 10 · Gandhinagar, Gujarat",
  },
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Guru Gobind Singh Indraprastha University (GGSIPU)",
    period: "2021 - 2024",
    highlight: "GPA: 9.2 / 10 · Rohini, Delhi-NCT",
  },
];

const codingProfiles = [
  { name: "LeetCode", meta: "200+ DSA solved", url: "https://leetcode.com/" },
  { name: "GeeksforGeeks", meta: "Active practice", url: "https://www.geeksforgeeks.org/" },
  { name: "GitHub", meta: "ABHINAVX03", url: "https://github.com/ABHINAVX03" },
  { name: "Codeforces", meta: "Pupil", url: "https://codeforces.com/" },
  { name: "HackerRank", meta: "Java · React · Problem Solving", url: "https://www.hackerrank.com/" },
];

const certifications = [
  "HackerRank Problem Solving",
  "HackerRank React Development",
  "Hackathon - HACKOUT '25",
  "TLE Eliminators - Level 1",
  "TLE Eliminators - Level 2",
  "Coding Society Representative at GGSIPU",
];

// Typewriter effect hook
const useTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  return displayText;
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const bioText = "I'm an MCA student at IIIT Vadodara and a Full Stack Developer focused on production-grade web applications. I build performant frontend experiences with React and architect scalable backend systems using Spring Boot, Node.js, and REST APIs, with additional hands-on blockchain development in Solidity and Web3.";
  const typewriterText = useTypewriter(bioText, 30);

  const [githubData, setGithubData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(true);

  useEffect(() => {
    fetch('/api/github/profile')
      .then(res => res.json())
      .then(data => {
        setGithubData(data);
        setLoadingGithub(false);
      })
      .catch(err => {
        console.error("Error fetching GitHub data:", err);
        setLoadingGithub(false);
      });
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
            <span>About Me</span>
            <span className={styles.labelLine} />
          </motion.div>

          {/* Unique layout with floating elements */}
          <div className={styles.uniqueLayout}>
            {/* Left — Hero content with typewriter */}
            <motion.div className={styles.heroContent} variants={itemVariants}>
              <h2 className={styles.title}>
                Crafting <span className={styles.titleAccent}>Full Stack</span>
                <br />Experiences
              </h2>
              
              <div className={styles.typewriterContainer}>
                <p className={styles.bio}>
                  {typewriterText}
                  <span className={styles.cursor}>|</span>
                </p>
              </div>

              <p className={styles.bioSecondary}>
                I care deeply about clean code, system design, and delivering experiences that users love. Whether it&apos;s a complex backend architecture or a micro-interaction on a button — every detail matters to me.
              </p>
            </motion.div>

            {/* Right — Animated stats and skills */}
            <motion.div className={styles.statsSkillsContainer} variants={itemVariants}>
              {/* Animated Stats */}
              <div className={styles.animatedStats}>
                {stats.map((stat, index) => {
                  return (
                    <motion.div
                      key={stat.label} 
                      className={styles.statCard}
                      initial={{ scale: 0, rotateY: -90 }}
                      animate={isInView ? { scale: 1, rotateY: 0 } : {}}
                      transition={{
                        delay: index * 0.2,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <div className={styles.statValue}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                      <div className={styles.statGlow} />
                    </motion.div>
                  );
                })}
              </div>

              {/* Skills with unique visualization */}
              <div className={styles.skillsVisualization}>
                {skills.map((group, groupIndex) => (
                  <motion.div 
                    key={group.category} 
                    className={styles.skillGroup}
                    initial={{ opacity: 0, x: groupIndex % 2 === 0 ? -50 : 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 + groupIndex * 0.2 }}
                  >
                    <h3 className={styles.skillCategory}>{group.category}</h3>
                    <div className={styles.skillItems}>
                      {group.items.map((item, itemIndex) => (
                        <motion.span 
                          key={item} 
                          className={styles.skillItem}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            delay: 1 + groupIndex * 0.2 + itemIndex * 0.1,
                            type: "spring",
                            stiffness: 300
                          }}
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(34, 196, 112, 0.2)",
                            boxShadow: "0 8px 25px rgba(34, 196, 112, 0.3)"
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  className={styles.skillGroup}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.6 }}
                >
                  <h3 className={styles.skillCategory}>Currently Learning</h3>
                  <div className={styles.skillItems}>
                    {learningNow.map((topic, topicIndex) => (
                      <motion.span
                        key={topic}
                        className={styles.skillItem}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 1.7 + topicIndex * 0.12,
                          type: "spring",
                          stiffness: 280
                        }}
                      >
                        {topic}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  className={styles.skillGroup}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 1.9 }}
                >
                  <h3 className={styles.skillCategory}>What I&apos;m Building</h3>
                  <div className={styles.skillItems}>
                    {buildingNow.map((item, itemIndex) => (
                      <motion.span
                        key={item}
                        className={styles.skillItem}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{
                          delay: 2 + itemIndex * 0.12,
                          type: "spring",
                          stiffness: 280
                        }}
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.proGithubSection}
            variants={itemVariants}
          >
            <div className={styles.proGithubHeader}>
              <div>
                <h3 className={styles.activityTitle}>Open Source Contributions</h3>
                <p className={styles.activitySubtitle}>
                  My latest activity and repository stats on GitHub.
                </p>
              </div>
              <a href="https://github.com/ABHINAVX03" target="_blank" rel="noopener noreferrer" className={styles.githubProBtn}>
                <GitHubIcon style={{ fontSize: 20 }} />
                <span>View Profile</span>
              </a>
            </div>

            {!loadingGithub && githubData && !githubData.error && (
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
            )}

            <div className={styles.proGithubGraphContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://github-readme-activity-graph.vercel.app/graph?username=ABHINAVX03&theme=github-dark&hide_border=true&line=22c470&point=4f8ef7&area=true&area_color=22c470&bg_color=00000000"
                alt="GitHub contribution activity graph for ABHINAVX03"
                className={styles.proGithubGraph}
                loading="lazy"
              />
              <div className={styles.graphGlow}></div>
            </div>
          </motion.div>

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
                  <div key={cert} className={styles.certItem}>{cert}</div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Socials with unique floating design */}
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
                <GitHubIcon style={{ fontSize: 24 }} />
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
                <LinkedInIcon style={{ fontSize: 24 }} />
                <span>LinkedIn</span>
              </motion.a>
              
              <motion.a 
                href={socials.Mail} 
                className={styles.socialOrb}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <EmailIcon style={{ fontSize: 24 }} />
                <span>Email</span>
              </motion.a>
              
              <div className={styles.locationOrb}>
                <LocationOnIcon style={{ fontSize: 20 }} />
                <span>Delhi, India</span>
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
