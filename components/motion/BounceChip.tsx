"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * A chip with a very quiet idle bounce — 3px of travel on a slow ease, with
 * per-chip phase offsets so the four never move in unison.
 */
export default function BounceChip({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={`chip ${className}`}>{children}</span>;

  return (
    <motion.span
      className={`chip ${className}`}
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.span>
  );
}
