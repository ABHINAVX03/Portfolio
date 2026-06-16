"use client";
import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiArrowRight } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import socials from "@/utils/socials";
import formValidation from "@/utils/formValidation";
import { successNotify, errorNotify } from "@/utils/toastify.js";

/* ── Design tokens ── */
const T = {
  accent:  "#6366f1",
  violet:  "#8b5cf6",
  rose:    "#f472b6",
  emerald: "#34d399",
  text:    "#f8fafc",
  muted:   "rgba(255,255,255,0.5)",
  border:  "rgba(255,255,255,0.07)",
  cardBg:  "rgba(10,10,20,0.75)",
  dim:     "rgba(99,102,241,0.08)",
  dimBorder: "rgba(99,102,241,0.22)",
  mono:    "var(--font-jetbrains-mono)",
  sans:    "var(--font-space-grotesk)",
  body:    "var(--font-body)",
};

const card = {
  background: T.cardBg,
  border: `1px solid ${T.border}`,
  borderRadius: "16px",
  backdropFilter: "blur(12px)",
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] } },
};

const contactItems = [
  { icon: <FiMail size={18} />, label: "Email", value: "guptaabhinav697@gmail.com", href: socials.Mail },
  { icon: <FiLinkedin size={18} />, label: "LinkedIn", value: "abhinav-gupta-367369167", href: socials.Linkedin },
  { icon: <FiGithub size={18} />, label: "GitHub", value: "ABHINAVX03", href: socials.Github },
  { icon: <FiMapPin size={18} />, label: "Location", value: "Delhi, India", href: socials.Location },
];

/* ── Input component ── */
function Field({
  id, name, label, type = "text", placeholder, value, onChange,
  as,
}: {
  id: string; name: string; label: string; type?: string;
  placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  as?: "textarea";
}) {
  const [focused, setFocused] = useState(false);
  const sharedStyle: React.CSSProperties = {
    width: "100%",
    fontFamily: T.body,
    fontSize: 14,
    color: T.text,
    background: focused ? "rgba(99,102,241,0.06)" : "rgba(255,255,255,0.03)",
    border: `1px solid ${focused ? "rgba(99,102,241,0.5)" : T.border}`,
    borderRadius: 12,
    padding: "12px 16px",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
    boxShadow: focused ? "0 0 0 3px rgba(99,102,241,0.12)" : "none",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label htmlFor={id} style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.muted }}>
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id} name={name} rows={6} value={value} onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          style={{ ...sharedStyle, resize: "none" }}
        />
      ) : (
        <input
          id={id} type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          autoComplete={type === "email" ? "email" : "name"}
          style={sharedStyle}
        />
      )}
    </div>
  );
}

const Contact = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "", user_email: "", message: "", company_url_confirm: "",
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
    <section id="contact" ref={ref} style={{ position: "relative", zIndex: 1, padding: "100px 0 0", display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", width: "100%", flex: 1 }}>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {/* ── Header ── */}
          <motion.div variants={itemVariants} style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${T.accent})` }} />
              <span style={{ fontFamily: T.mono, fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: T.accent }}>
                Get In Touch
              </span>
              <div style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${T.accent}, transparent)` }} />
            </div>

            <h2 style={{
              fontFamily: T.sans, fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700,
              letterSpacing: "-0.04em", margin: "0 0 16px", lineHeight: 1.05,
            }}>
              <span style={{ color: T.text }}>Let&apos;s Work </span>
              <span style={{ background: `linear-gradient(135deg, ${T.accent}, ${T.violet}, ${T.rose})`, backgroundClip: "text", WebkitBackgroundClip: "text", color: "transparent" }}>
                Together
              </span>
            </h2>
            <p style={{ fontFamily: T.body, fontSize: 16, color: T.muted, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
              Open to full-time roles, freelance projects, and collaborations. Drop me a message — I&apos;ll respond promptly.
            </p>
          </motion.div>

          {/* ── Two columns ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 32, marginBottom: 80, alignItems: "start" }} className="contact-grid">

            {/* ── LEFT — info ── */}
            <motion.div variants={itemVariants} style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* contact items */}
              <div style={{ ...card, padding: "24px" }}>
                <p style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, margin: "0 0 16px" }}>
                  Contact Details
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {contactItems.map((item) => (
                    <div
                      key={item.label}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "12px 14px", borderRadius: 12,
                        border: `1px solid ${T.border}`,
                        background: "rgba(255,255,255,0.02)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(99,102,241,0.3)";
                        (e.currentTarget as HTMLElement).style.background = T.dim;
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = T.border;
                        (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)";
                      }}
                    >
                      <div style={{
                        width: 38, height: 38, borderRadius: 10,
                        background: T.dim, border: `1px solid ${T.dimBorder}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: T.accent, flexShrink: 0,
                      }}>
                        {item.icon}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 0 }}>
                        <span style={{ fontFamily: T.mono, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: T.muted }}>
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              fontFamily: T.body, fontSize: 13, color: "rgba(255,255,255,0.65)",
                              textDecoration: "none", transition: "color 0.2s ease",
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}
                            onMouseEnter={e => { e.currentTarget.style.color = "#c7d2fe"; }}
                            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <span style={{ fontFamily: T.body, fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{item.value}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* availability card */}
              <div style={{
                ...card,
                padding: "20px 22px",
                borderColor: "rgba(52,211,153,0.2)",
                background: "rgba(52,211,153,0.05)",
                display: "flex", alignItems: "center", gap: 14,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: T.emerald, flexShrink: 0,
                  boxShadow: `0 0 0 3px rgba(52,211,153,0.2)`,
                  animation: "contactPulse 2.4s ease-in-out infinite",
                }} />
                <div>
                  <p style={{ fontFamily: T.sans, fontSize: 14, fontWeight: 700, color: T.emerald, margin: "0 0 2px" }}>Available for opportunities</p>
                  <p style={{ fontFamily: T.mono, fontSize: 11, color: T.muted, letterSpacing: "0.04em", margin: 0 }}>Full-time · Freelance · Remote</p>
                </div>
              </div>

              {/* hire me CTA */}
              <a
                href={socials.Mail}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px 24px", borderRadius: 12,
                  background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                  color: "#fff", fontFamily: T.sans, fontSize: 14, fontWeight: 700,
                  textDecoration: "none", letterSpacing: "0.01em",
                  boxShadow: "0 0 24px rgba(99,102,241,0.3)",
                  transition: "all 0.25s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 40px rgba(99,102,241,0.55)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(99,102,241,0.3)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                }}
              >
                Hire Me <FiArrowRight size={14} />
              </a>
            </motion.div>

            {/* ── RIGHT — form ── */}
            <motion.div
              variants={itemVariants}
              style={{
                ...card,
                padding: "32px",
                borderColor: "rgba(99,102,241,0.15)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* glowing top line */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${T.accent}, ${T.violet}, ${T.rose}, transparent)`,
              }} />

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {/* honeypot */}
                <input
                  type="text"
                  name="company_url_confirm"
                  value={formData.company_url_confirm}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="new-password"
                  aria-hidden="true"
                  style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
                />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                  <Field id="user_name" name="user_name" label="Name" placeholder="Your name" value={formData.user_name} onChange={handleChange} />
                  <Field id="user_email" name="user_email" label="Email" type="email" placeholder="your@email.com" value={formData.user_email} onChange={handleChange} />
                </div>

                <Field id="message" name="message" label="Message" placeholder="Tell me about your project or opportunity..." value={formData.message} onChange={handleChange} as="textarea" />

                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    alignSelf: "flex-end",
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "13px 28px", borderRadius: 9999,
                    background: `linear-gradient(135deg, ${T.accent}, ${T.violet})`,
                    color: "#fff", border: "none", cursor: isSending ? "not-allowed" : "pointer",
                    fontFamily: T.sans, fontSize: 14, fontWeight: 700, letterSpacing: "0.01em",
                    boxShadow: "0 4px 20px rgba(99,102,241,0.3)",
                    transition: "all 0.25s ease",
                    opacity: isSending ? 0.65 : 1,
                  }}
                  onMouseEnter={e => {
                    if (!isSending) {
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(99,102,241,0.5)";
                    }
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(99,102,241,0.3)";
                  }}
                >
                  {isSending ? (
                    <>
                      <span style={{
                        width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)",
                        borderTopColor: "#fff", borderRadius: "50%",
                        animation: "contactSpin 0.7s linear infinite", display: "inline-block",
                      }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <FiArrowRight size={14} /></>
                  )}
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* ── Footer ── */}
      <footer style={{
        borderTop: `1px solid ${T.border}`,
        padding: "24px 0",
        marginTop: "auto",
      }}>
        <div style={{
          maxWidth: 1280, margin: "0 auto", padding: "0 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 10,
        }}>
          <p style={{ fontFamily: T.body, fontSize: 13, color: T.muted, margin: 0 }}>
            © {new Date().getFullYear()} Abhinav Gupta · Built with Next.js &amp; Spring Boot
          </p>
          <p style={{ fontFamily: T.mono, fontSize: 11, color: "rgba(255,255,255,0.3)", margin: 0, letterSpacing: "0.06em" }}>
            Full Stack Developer · Delhi, India
          </p>
          <a
            href={socials.Mail}
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              padding: "7px 16px", borderRadius: 9999,
              border: `1px solid ${T.dimBorder}`,
              background: T.dim, color: "#c7d2fe",
              fontFamily: T.body, fontSize: 12, fontWeight: 700, textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(99,102,241,0.18)";
              (e.currentTarget as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = T.dim;
              (e.currentTarget as HTMLElement).style.color = "#c7d2fe";
            }}
          >
            Email Me
          </a>
        </div>
      </footer>

      <ToastContainer theme="dark" position="bottom-right" />

      <style>{`
        @keyframes contactPulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(52,211,153,0.2); }
          50%       { box-shadow: 0 0 0 7px rgba(52,211,153,0); }
        }
        @keyframes contactSpin { to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .contact-grid button[type="submit"] { align-self: stretch !important; width: 100% !important; }
        }
      `}</style>
    </section>
  );
};

export default Contact;