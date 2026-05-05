"use client";
import styles from "./navbar.module.css";
import { Link } from "react-scroll";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { title: "Home", href: "home" },
  { title: "Projects", href: "projects" },
  { title: "About", href: "about" },
  { title: "Contact", href: "contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <Link to="home" smooth duration={600} className={styles.logo}>
          <Image src="/logo.png" width={44} height={44} alt="AG Logo" priority />
          <span className={styles.logoText}>Abhinav<span className={styles.logoAccent}>.</span></span>
        </Link>

        {/* Desktop nav */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                smooth
                duration={600}
                spy
                onSetActive={() => setActiveSection(link.href)}
                className={`${styles.navLink} ${activeSection === link.href ? styles.navLinkActive : ""}`}
              >
                {link.title}
                {activeSection === link.href && <span className={styles.navDot} />}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://drive.google.com/file/d/1eUGL9v-nDdo9setCaWis9LgrIdmSyC9V/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaBtn}
        >
          Resume ↗
        </a>

        {/* Mobile hamburger */}
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${menuOpen ? styles.bar1Open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar2Open : ""}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.bar3Open : ""}`} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            smooth
            duration={600}
            className={styles.mobileLink}
            onClick={() => setMenuOpen(false)}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
