"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveal. Short travel, no bounce, fires once — repeated or springy
 * reveals draw attention to the animation instead of the content.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
