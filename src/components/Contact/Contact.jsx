"use client";
import styles from "./contact.module.css";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  successNotify,
  warnNotify,
  errorNotify,
  emailWarnNotify,
} from "@/utils/toastify.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import socials from "@/utils/socials";

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
    icon: <EmailIcon style={{ fontSize: 22 }} />,
    label: "Email",
    value: "guptaabhinav697@gmail.com",
    href: "mailto:guptaabhinav697@gmail.com",
  },
  {
    icon: <LinkedInIcon style={{ fontSize: 22 }} />,
    label: "LinkedIn",
    value: "abhinav-gupta-367369167",
    href: socials.Linkedin,
  },
  {
    icon: <GitHubIcon style={{ fontSize: 22 }} />,
    label: "GitHub",
    value: "ABHINAVX03",
    href: socials.Github,
  },
  {
    icon: <LocationOnIcon style={{ fontSize: 22 }} />,
    label: "Location",
    value: "Adarsh Nagar, Delhi, India",
    href: null,
  },
];

const Contact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_name || !formData.user_email || !formData.message) {
      warnNotify();
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.user_email)) {
      emailWarnNotify();
      return;
    }
    setIsSending(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setFormData({ user_name: "", user_email: "", message: "" });
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
            </motion.div>

            {/* Right — form */}
            <motion.div className={styles.formColumn} variants={itemVariants}>
              <form onSubmit={handleSubmit} className={styles.form} id="contact-form">
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
        </div>
      </footer>

      <ToastContainer theme="dark" position="bottom-right" />
    </section>
  );
};

export default Contact;
