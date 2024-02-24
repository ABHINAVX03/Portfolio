"use client";
import { Link } from "react-scroll";
import styles from "./navlinks.module.css";

const pillTabs = [
  { title: "Start", href: "home" },
  { title: "Projects", href: "projects" },
  { title: "About Me", href: "about" },
  { title: "Contact", href: "contact" },
];

const Nav = () => {
  return (
    <nav className={styles.container}>
      <ul>
        {pillTabs.map((tab, index) => (
          <li key={index}>
            <Link to={tab.href}>{tab.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
