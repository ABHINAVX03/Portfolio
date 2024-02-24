"use client";
import styles from "./about.module.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  titleVariants,
  articleVariants,
  socialsVariants,
} from "@/utils/motions/aboutMotion";
import StackSlider from "../StackSlider/StackSlider";
import socials from "@/utils/socials";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { FaDiscord } from "react-icons/fa";

const About = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.aboutContainer}>
          <div className={styles.subContainer}>
            <div className={styles.textContainer}>
              <motion.h1
                className={styles.about}
                variants={titleVariants}
                initial="initial"
                animate={isInView && "animate"}
                ref={ref}
              >
                About me
              </motion.h1>
              <div className={styles.bioContainer}>
                <motion.article
                  className={styles.text}
                  variants={articleVariants}
                  initial="initial"
                  animate={isInView && "animate"}
                  ref={ref}
                >
                  I am a web developer with strong skills in HTML, CSS and
                  JavaScript, allowing me to create attractive interfaces.
                  Additionally, I have experience developing with technologies
                  such as React, Next and Redux/Toolkit. On the server side, I
                  use Express and relational databases such as SQL, Prisma and
                  PostgreSQL to ensure efficient performance and effective data
                  management.
                </motion.article>
                <motion.div
                  className={styles.socialsContainer}
                  variants={socialsVariants}
                  initial="initial"
                  animate={isInView && "animate"}
                  ref={ref}
                >
                  <a
                    href={socials.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Github"
                  >
                    <GitHubIcon className={styles.icon} />
                  </a>
                  <a
                    href={socials.Linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Linkedin"
                  >
                    <LinkedInIcon className={styles.icon} />
                  </a>
                  <a
                    href={socials.Discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Discord"
                  >
                    <FaDiscord className={styles.discordIcon} />
                  </a>
                  <a
                    href={socials.Mail}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Email"
                  >
                    <EmailIcon className={styles.icon} />
                  </a>
                </motion.div>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <img src="/SVG/about.png" alt="image" className={styles.image} />
            </div>
          </div>
          <div className={styles.stackContainer}>
            <StackSlider />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
