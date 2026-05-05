import styles from "./stackslider.module.css";
import Image from "next/image";
import logos from "@/utils/logos";

const StackSlider = () => {
  // Triple to ensure seamless scroll on all screen sizes
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        {infiniteLogos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="Tech logo"
            width={80}
            height={44}
            className={styles.img}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default StackSlider;
