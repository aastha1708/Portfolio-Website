"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Hover behaviour for the pinned note: it's fixed near the top edge, so a
 * nudge swings it slightly around that point — a low-damping spring gives it
 * the small wobble a real piece of paper would have.
 */
export default function StickyNote({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
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
      style={{ ...style, transformOrigin: "50% 6%" }}
      whileHover={{ rotate: -2.4, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 130, damping: 8, mass: 0.6 }}
    >
      {children}
    </motion.div>
  );
}
