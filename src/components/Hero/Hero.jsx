"use client";
import styles from "./hero.module.css";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { textVariants } from "@/utils/motions/heroMotion";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Waves from "../Waves/Waves";

const Hero = () => {
  const [downloadCount, setDownloadCount] = useState(0);

  const handleType = (count) => {
    setDownloadCount(count);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.dataContainer}
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <h1 className={styles.name}>Abhinav Gupta</h1>
          <h2>
            <span className={styles.seniority}>
              <Typewriter
                words={["Full stack", "React"]}
                loop={false}
                cursor
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
                onType={handleType}
              />
            </span>{" "}
            developer
          </h2>
          <a
            href="https://drive.google.com/file/d/1YM6bpmSylztGeyAgDf6IECwtz_4pWi60/view?usp=sharing"
            download="https://drive.google.com/file/d/1YM6bpmSylztGeyAgDf6IECwtz_4pWi60/view?usp=sharing"
            aria-label="Download Resume"
          >
            <span className={styles.icon}>
              <CloudDownloadIcon alt="Resume" />
            </span>
            Download Resume
          </a>
        </motion.div>
      </div>
      <div className={styles.wavesContainer}>
        <Waves />
      </div>
    </div>
  );
};

export default Hero;
