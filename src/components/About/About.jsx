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
  { value: 1, label: "Years Experience", suffix: "+" },
  { value: 10, label: "Projects Built", suffix: "+" },
  { value: 5, label: "Tech Stacks", suffix: "+" },
  { value: 100, label: "Passion", suffix: "%" },
];

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Java", "Spring Boot", "REST APIs", "Node.js", "Express.js", "WebSockets"] },
  { category: "Database", items: ["PostgreSQL", "MySQL", "Prisma ORM", "MongoDB", "Redis"] },
  { category: "DevOps & Tools", items: ["Git", "Docker", "Maven", "Postman", "Vercel", "IntelliJ IDEA"] },
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

// Animated counter hook
const useAnimatedCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef();
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let startTime;
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(easeOutQuart * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  return { count, ref };
};

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  
  const bioText = "I'm a Full Stack Developer based in Delhi, India with a focus on building production-grade web applications. On the frontend, I create pixel-perfect, performant UIs with React & Next.js. On the backend, I architect scalable REST APIs and microservices using Java Spring Boot.";
  const typewriterText = useTypewriter(bioText, 30);

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
                I care deeply about clean code, system design, and delivering experiences that users love. Whether it's a complex backend architecture or a micro-interaction on a button — every detail matters to me.
              </p>
            </motion.div>

            {/* Right — Animated stats and skills */}
            <motion.div className={styles.statsSkillsContainer} variants={itemVariants}>
              {/* Animated Stats */}
              <div className={styles.animatedStats}>
                {stats.map((stat, index) => {
                  const { count, ref } = useAnimatedCounter(stat.value);
                  return (
                    <motion.div 
                      key={stat.label} 
                      className={styles.statCard}
                      ref={ref}
                      initial={{ scale: 0, rotateY: -90 }}
                      animate={isInView ? { scale: 1, rotateY: 0 } : {}}
                      transition={{ 
                        delay: index * 0.2, 
                        type: "spring", 
                        stiffness: 200,
                        damping: 20
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(34, 196, 112, 0.2)"
                      }}
                    >
                      <div className={styles.statValue}>
                        {count}{stat.suffix}
                      </div>
                      <div className={styles.statLabel}>
                        {stat.label}
                      </div>
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
