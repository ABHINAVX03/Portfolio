"use client";
import styles from "./contact.module.css";
import Form from "../Form/Form";
import ItemsContact from "../ItemsContact/ItemsContact";
import Footer from "../Footer/Footer";
import BottomNav from "../NavBarBottom/BottomNav";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { titleVariants } from "@/utils/motions/contactMotion";

const Contact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const hideFooter = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    hideFooter();
    window.addEventListener("resize", hideFooter);

    return () => {
      window.removeEventListener("resize", hideFooter);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.textContainer}>
          <motion.h1
            className={styles.title}
            variants={titleVariants}
            initial="initial"
            animate={isInView && "animate"}
            ref={ref}
          >
            Contact me
          </motion.h1>
        </div>
        <div className={styles.subContainer}>
          <div className={styles.itemsContainer}>
            <ItemsContact />
          </div>
          <div className={styles.formContainer}>
            <Form />
          </div>
        </div>
      </div>
      {!isMobile ? <Footer /> : <BottomNav />}
    </div>
  );
};

export default Contact;
