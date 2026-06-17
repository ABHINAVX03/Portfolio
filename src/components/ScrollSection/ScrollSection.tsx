"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollSectionProps {
  children: ReactNode;
  /** Unique id passed straight through to the wrapping <section> for nav anchors */
  id?: string;
  /**
   * How strong the depth effect is. 0 = off, 1 = default subtle, 2 = noticeable.
   * Default tuned for a "barely there" professional feel.
   */
  intensity?: number;
}

/**
 * Wraps a page section and applies a subtle scale + opacity shift driven by
 * scroll position, so sections feel like they're gently moving through 3D
 * space as they enter/exit the viewport — rather than just appearing.
 *
 * Performance: only animates `transform` (scale) and `opacity`, both of which
 * are GPU-composited and never trigger layout/paint, so this stays smooth
 * even on mid-range mobile devices.
 *
 * Accessibility: fully disabled under prefers-reduced-motion — sections
 * render at rest (scale 1, opacity 1) with no listeners attached.
 */
const ScrollSection = ({ children, id, intensity = 1 }: ScrollSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Track this section's own progress through the viewport, not global page
  // scroll — keeps the math local and correct regardless of section order
  // or page length.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Tuned ranges: barely-there at intensity=1. Section is at rest (scale 1,
  // opacity 1) through the middle ~50% of its viewport transit, and only
  // eases away near the very top/bottom edges.
  const scaleRange = [0.96 + (1 - intensity) * 0.04, 1, 0.97 + (1 - intensity) * 0.03];
  const opacityRange = [0.55 + (1 - intensity) * 0.45 * 0, 1, 0.7];

  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], scaleRange);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [
    1 - intensity * 0.45,
    1,
    1,
    1 - intensity * 0.3,
  ]);

  // When reduced motion is preferred, pass through static values instead of
  // the motion-value transforms.
  const scale = prefersReducedMotion ? 1 : rawScale;
  const opacity = prefersReducedMotion ? 1 : rawOpacity;

  return (
    <motion.div
      ref={ref}
      id={id}
      style={{
        scale,
        opacity,
        transformStyle: "preserve-3d",
        willChange: prefersReducedMotion ? undefined : "transform, opacity",
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollSection;