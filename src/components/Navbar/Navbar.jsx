"use client";
import styles from "./navbar.module.css";
import { Link } from "react-scroll";
import Nav from "../NavLinks/Nav";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);

  useEffect(() => {
    const navColored = () => {
      if (typeof window !== "undefined" && window.scrollY >= 950) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", navColored);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("scroll", navColored);
      }
    };
  }, []);

  return (
    <header>
      <nav
        className={navbar ? `${styles.navbar} ${styles.active}` : styles.navbar}
      >
        <Link to="home">
          <img src="/logo.png" alt="logo" className={styles.logo} />
        </Link>
        <div className={styles.itemsContainer}>
          <Nav />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
