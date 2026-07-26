"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * The postcard "lands on the desk" as you reach the bottom of the page:
 * it rises into view and settles at the same slight tilt it has in the
 * design file (1.02°, Figma frame 246:2649).
 */
export default function FooterMotion({
  children,
  style,
  className = "",
  rotate = -1.02,
}: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion)
    return (
      <div className={className} style={{ ...style, transform: `rotate(${rotate}deg)` }}>
        {children}
      </div>
    );

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 56, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 70, damping: 14, mass: 0.9 }}
    >
      {children}
    </motion.div>
  );
}
