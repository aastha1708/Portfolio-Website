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
      /* Rises further, over-rotated and slightly small, then spring-settles
         into its resting tilt — a postcard tossed onto the desk rather than
         a block fading in. */
      initial={{ opacity: 0, y: 84, rotate: rotate - 2.4, scale: 0.975 }}
      whileInView={{ opacity: 1, y: 0, rotate, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        opacity: { duration: 0.4 },
        default: { type: "spring", stiffness: 90, damping: 13, mass: 0.9 },
      }}
    >
      {children}
    </motion.div>
  );
}
