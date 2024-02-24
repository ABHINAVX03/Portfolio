"use client";
import styles from "./form.module.css";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  successNotify,
  warnNotify,
  errorNotify,
  emailWarnNotify,
} from "@/utils/toastify.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "@emailjs/browser";


const Form = () => {
  const ref = useRef();
  const formRef = useRef();
  // const isInView = useInView(ref, { threshold: 0.5 });
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.message === ""
    ) {
      warnNotify();
      return;
    }


    await emailjs
      .sendForm(
        "service_szn9mz7",
        "template_oze8uwe",
        formRef.current,
        "-8AywI-tc_J2nq4CV"
      )
      .then(
        (result) => {
          setFormData({
            user_name: "",
            user_email: "",
            message: "",
          });
          successNotify();
        },
        (error) => {
          errorNotify();
        }
      );
  };

  return (
    <motion.form
      ref={formRef}
      onSubmit={handleSubmit}
      className={styles.form}
      initial={{
        y: 0,
        opacity: 0,
      }}
      animate={{
        y: -40,
        opacity: 1,
      }}
      transition={{ duration: 2 }}
    >
      <input
        type="text"
        name="user_name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.input}
      />
      <input
        type="email"
        name="user_email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className={styles.input}
      />
      <textarea
        name="message"
        rows={8}
        value={formData.message}
        onChange={handleChange}
        placeholder="message"
        className={styles.textarea}
      />
      <button className={styles.button}>Send</button>
      <ToastContainer className={styles.toaster} />
    </motion.form>
  );
};

export default Form;
