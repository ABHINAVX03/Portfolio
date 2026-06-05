import styles from "./stackslider.module.css";
import Image from "next/image";
import logos from "@/utils/logos";

const StackSlider = () => {
  return (
    <div className={styles.slider}>
      <div className={styles.track}>
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className={styles.group}
            aria-hidden={groupIndex === 1}
          >
            {logos.map((logo) => (
              <Image
                key={`${groupIndex}-${logo}`}
                src={logo}
                alt="Tech logo"
                width={80}
                height={44}
                className={styles.img}
                loading="lazy"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StackSlider;
