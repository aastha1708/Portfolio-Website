"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-triggered spring pop for small furniture — the plus boxes, the
 * script-note panel. Livelier than Reveal (which is a calm fade for content)
 * but still restrained: one spring, settles fast, fires once.
 */
export default function PopIn({
  children,
  delay = 0,
  y = 18,
  scale = 0.82,
  rotate = 0,
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  /** Starting scale. */
  scale?: number;
  /** Starting tilt — it settles to 0, like the object being laid flat. */
  rotate?: number;
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
      initial={{ opacity: 0, y, scale, rotate }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{
        opacity: { duration: 0.35, delay },
        default: { type: "spring", stiffness: 240, damping: 20, delay },
      }}
    >
      {children}
    </motion.div>
  );
}
