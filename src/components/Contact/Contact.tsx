"use client";
import styles from "./contact.module.css";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  successNotify,
  errorNotify,
} from "@/utils/toastify.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import socials from "@/utils/socials";
import formValidation from "@/utils/formValidation";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const contactItems = [
  {
    icon: <FiMail size={22} />,
    label: "Email",
    value: "guptaabhinav697@gmail.com",
    href: socials.Mail,
  },
  {
    icon: <FiLinkedin size={22} />,
    label: "LinkedIn",
    value: "abhinav-gupta-367369167",
    href: socials.Linkedin,
  },
  {
    icon: <FiGithub size={22} />,
    label: "GitHub",
    value: "ABHINAVX03",
    href: socials.Github,
  },
  {
    icon: <FiMapPin size={22} />,
    label: "Location",
    value: "Delhi, India",
    href: socials.Location,
  },
];

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
    company_url_confirm: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidation(formData)) return;

    setIsSending(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setFormData({ user_name: "", user_email: "", message: "", company_url_confirm: "" });
        successNotify();
      } else {
        console.error("Email error:", data);
        errorNotify();
      }
    } catch (err) {
      console.error("Error sending email:", err);
      errorNotify();
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section className={styles.section} ref={ref}>
      <div className={styles.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* Header */}
          <motion.div className={styles.header} variants={itemVariants}>
            <div className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              <span>Get In Touch</span>
              <span className={styles.labelLine} />
            </div>
            <h2 className={styles.title}>
              Let&apos;s <span className={styles.titleAccent}>Work Together</span>
            </h2>
            <p className={styles.subtitle}>
              Open to full-time roles, freelance projects, and collaborations.
              Drop me a message and I&apos;ll get back to you promptly.
            </p>
          </motion.div>

          {/* Two columns */}
          <div className={styles.grid}>
            {/* Left — contact info */}
            <motion.div className={styles.infoColumn} variants={itemVariants}>
              <h3 className={styles.infoTitle}>Contact Details</h3>
              <div className={styles.contactItems}>
                {contactItems.map((item) => (
                  <div key={item.label} className={styles.contactItem}>
                    <div className={styles.contactIcon}>{item.icon}</div>
                    <div className={styles.contactText}>
                      <span className={styles.contactLabel}>{item.label}</span>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className={styles.contactValue}>
                          {item.value}
                        </a>
                      ) : (
                        <span className={styles.contactValue}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability card */}
              <div className={styles.availCard}>
                <div className={styles.availDot} />
                <div>
                  <p className={styles.availTitle}>Available for opportunities</p>
                  <p className={styles.availText}>Full-time · Freelance · Remote</p>
                </div>
              </div>
              <a href={socials.Mail} className={styles.hireCard}>
                Hire Me
              </a>
            </motion.div>

            {/* Right — form */}
            <motion.div className={styles.formColumn} variants={itemVariants}>
              <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
                <input
                  type="text"
                  name="company_url_confirm"
                  value={formData.company_url_confirm}
                  onChange={handleChange}
                  className={styles.honeypot}
                  tabIndex={-1}
                  autoComplete="new-password"
                  aria-hidden="true"
                />
                <div className={styles.formRow}>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="user_name" className={styles.label}>Name</label>
                    <input
                      id="user_name"
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className={styles.input}
                      autoComplete="name"
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="user_email" className={styles.label}>Email</label>
                    <input
                      id="user_email"
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className={styles.input}
                      autoComplete="email"
                    />
                  </div>
                </div>
                <div className={styles.fieldGroup}>
                  <label htmlFor="message" className={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={styles.textarea}
                  />
                </div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={isSending}
                  id="contact-submit-btn"
                >
                  {isSending ? (
                    <>
                      <span className={styles.spinner} />
                      Sending...
                    </>
                  ) : (
                    <>Send Message →</>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p className={styles.footerText}>
            © {new Date().getFullYear()} Abhinav Gupta · Built with Next.js & Spring Boot
          </p>
          <p className={styles.footerSub}>Full Stack Developer · Delhi, India</p>
          <a href={socials.Mail} className={styles.footerCta}>Email Me</a>
        </div>
      </footer>

      <ToastContainer theme="dark" position="bottom-right" />
    </section>
  );
};

export default Contact;

