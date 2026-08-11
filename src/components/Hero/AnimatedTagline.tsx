"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
  "I build scalable systems and elegant interfaces.",
  "I craft pixel-perfect UIs with resilient backends.",
  "I turn product ideas into thoughtful engineering.",
];

export default function AnimatedTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 2200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <p
      aria-live="polite"
      style={{
        fontSize: "clamp(1rem, 1.3vw, 1.2rem)",
        color: "var(--c-text-secondary)",
        fontFamily: "var(--font-body)",
        margin: 0,
        maxWidth: "560px",
        lineHeight: 1.7,
      }}
    >
      {TAGLINES[index]}
    </p>
  );
}
