"use client";
import styles from "./footer.module.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image";
const socials = {
  discord: "https://discord.com/channels/abhinav3688",
github: "https://github.com/ABHINAVX03",
linkedin: "http://www.linkedin.com/in/abhinav-gupta-367369167",
mail: "mailto:guptaabhinav697@gmail.com",
};

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.linksContainer}>
          <a href={socials.github} rel="noopener noreferrer">
            <GitHubIcon />
          </a>
          <a href={socials.linkedin} rel="noopener noreferrer">
            <LinkedInIcon />
          </a>
          <a href={socials.whatsapp} rel="noopener noreferrer">
            <FaDiscord className={styles.discordIcon} />
          </a>
          <a href={socials.mail} rel="noopener noreferrer">
            <EmailIcon alt="Email" className={styles.icon} />
          </a>
        </div>
        <div className={styles.textContainer}>
          &copy; {new Date().getFullYear()}: Abhinav Gupta
          <Image height={50} width={100} src="/icon.ico" alt="logo" className={styles.logo} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
