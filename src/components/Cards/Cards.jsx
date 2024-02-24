import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  cardsContainerVariants,
  cardsVariants,
} from "@/utils/motions/cardsMotion";
import projects from "@/utils/projects.json";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import styles from "./cardslist.module.css";

const Cards = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <motion.div
      className={styles.container}
      variants={cardsContainerVariants}
      initial="initial"
      animate={isInView && "animate"}
      ref={ref}
    >
      {projects.data.map((project, index) => (
        <motion.div
          className={styles.cardContainer}
          key={index}
          variants={cardsVariants}
        >
          <div className={styles.card}>
            {index % 2 !== 0 ? (
              <>
                <div className={styles.frontContent}>
                  <img
                    src={project.image}
                    alt="image"
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <p className={styles.heading}>{project.name}</p>
                  <p className={styles.type}>{project.type}</p>
                  <article className={styles.article}>
                    {project.description}
                  </article>
                  <div className={styles.iconContainer}>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoButton}
                    >
                      Repo
                      <ArrowForwardIcon />
                    </a>
                    {project.deploy && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.deployButton}
                      >
                        Deploy
                        <InsertLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.content}>
                  <p className={styles.heading}>{project.name}</p>
                  <p className={styles.type}>{project.type}</p>
                  <article className={styles.article}>
                    {project.description}
                  </article>
                  <div className={styles.iconContainer}>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.repoButton}
                    >
                      Repo
                      <ArrowForwardIcon />
                    </a>
                    {project.deploy && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.deployButton}
                      >
                        Deploy
                        <InsertLinkIcon />
                      </a>
                    )}
                  </div>
                </div>
                <div className={styles.frontContent}>
                  <img
                    src={project.image}
                    alt="image"
                    className={styles.image}
                  />
                </div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Cards;
