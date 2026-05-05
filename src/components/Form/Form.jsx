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

const Form = () => {
  const ref = useRef();
  const [isSending, setIsSending] = useState(false);
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
      formData.user_name === "" ||
      formData.user_email === "" ||
      formData.message === ""
    ) {
      warnNotify();
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email)) {
      emailWarnNotify();
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          user_name: "",
          user_email: "",
          message: "",
        });
        successNotify();
      } else {
        console.error("Email error:", data);
        errorNotify();
      }
    } catch (error) {
      console.error("Error sending email:", error);
      errorNotify();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <motion.form
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
        value={formData.user_name}
        onChange={handleChange}
        placeholder="Name"
        className={styles.input}
      />
      <input
        type="email"
        name="user_email"
        value={formData.user_email}
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
      <button className={styles.button} disabled={isSending} type="submit">
        {isSending ? "Sending..." : "Send"}
      </button>
      <ToastContainer className={styles.toaster} />
    </motion.form>
  );
};

export default Form;
