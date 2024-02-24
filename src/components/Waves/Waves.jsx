import { Fragment } from "react";
import styles from "./waves.module.css";

const Waves = () => {
  return (
    <Fragment>
      <svg
        className={styles.waves}
        xmlns="http://www.w3.org/2000/svg"
        xlinkHref="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className={styles.parallax}>
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="0"
            fill="rgb(34,196,112,0.7)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="3"
            fill="rgb(34,196,112,0.5)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="5"
            fill="rgb(34,196,112,0.3)"
          />
          <use
            xlinkHref="#gentle-wave"
            x="48"
            y="7"
            fill="var(--color-primary)"
          />
        </g>
      </svg>
    </Fragment>
  );
};

export default Waves;
