import { useState } from "react";
import styles from "./bottomBarNavi.module.css";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import ContactPageIcon from "@mui/icons-material/ContactPage";

const BottomBarNavi = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <>
      <div className={styles.container}>
        <ul className={styles.nav}>
          <span
            className={styles.navCircle}
            style={{
              left: activeIndex * 120 + 65 + "px",
              transition: "left 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          ></span>
          <li className={styles.navItem}>
            <div
              href="#"
              className={activeIndex === 0 ? styles.navItemActive : ""}
              onClick={() => handleClick(0)}
            >
              <HomeIcon
                className={styles.navItemIcon}
                style={{ width: "40px", height: "40px" }}
              />
              <span className={styles.navitemText}>Home</span>
            </div>
          </li>
          <li className={styles.navItem}>
            <span
              className={activeIndex === 1 ? styles.navItemActive : ""}
              onClick={() => handleClick(1)}
            >
              <WorkIcon
                className={styles.navItemIcon}
                style={{ width: "40px", height: "40px" }}
              />
              <span className={styles.navitemText}>Projects</span>
            </span>
          </li>
          <li className={styles.navItem}>
            <span
              className={activeIndex === 2 ? styles.navItemActive : ""}
              onClick={() => handleClick(2)}
            >
              <PersonIcon
                className={styles.navItemIcon}
                style={{ width: "40px", height: "40px" }}
              />
              <span className={styles.navitemText}>About</span>
            </span>
          </li>
          <li className={styles.navItem}>
            <span
              className={activeIndex === 3 ? styles.navItemActive : ""}
              onClick={() => handleClick(3)}
            >
              <ContactPageIcon
                className={styles.navItemIcon}
                style={{ width: "40px", height: "40px" }}
              />
              <span className={styles.navitemText}>Contact</span>
            </span>
          </li>
        </ul>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="filter-svg"
        className={styles.filterSvg}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default BottomBarNavi;
