import styles from "./stackslider.module.css";
import Image from "next/image";
import logos from "@/utils/logos";

const StackSlider = () => {
  const infiniteLogos = [...logos, ...logos];

  return (
    <div className={styles.slider}>
      <div className={styles.slide}>
        {infiniteLogos.map((logo, index) => (
          <Image
            key={index}
            src={logo}
            alt="Logo"
            width={500}
            height={300}
            className={styles.img}
          />
        ))}
      </div>
    </div>
  );
};

export default StackSlider;
