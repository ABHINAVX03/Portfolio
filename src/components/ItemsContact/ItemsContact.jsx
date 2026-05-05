import { Fragment, useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./itemsContact.module.css";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import socials from "@/utils/socials";
import { itemsVariants } from "@/utils/motions/itemsContactMotion";

const ItemsContact = () => {
  const ref = useRef();
  const isInView = useInView(ref, { threshold: 0.5 });

  return (
    <div className={styles.itemsCntnr}>
      <motion.ul
        className={styles.ulCntnr}
        variants={itemsVariants}
        initial="initial"
        animate={isInView && "animate"}
        ref={ref}
      >
        <a href={socials.Location} target="_blank" rel="noopener noreferrer">
          <li>
            <LocationOnIcon className={styles.icon} style={{ fontSize: 45 }} />
            Adrash Nagar, Delhi, India
          </li>
        </a>
        <a href={socials.Linkedin} target="_blank" rel="noopener noreferrer">
          <li>
            <LinkedInIcon className={styles.icon} style={{ fontSize: 45 }} />
            LinkedIn
          </li>
        </a>
        <a href={socials.Mail} target="_blank" rel="noopener noreferrer">
          <li>
            <EmailIcon className={styles.icon} style={{ fontSize: 45 }} />
            guptaabhinav697@gmail.com
          </li>
        </a>
      </motion.ul>
    </div>
  );
};

export default ItemsContact;
