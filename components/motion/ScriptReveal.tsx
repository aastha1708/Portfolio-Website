"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Entrance for connected-script type (Homemade Apple). Splitting a script font
 * per character breaks its ligature joins, so instead the whole line is
 * revealed with a left-to-right wipe — reads like the name being written.
 */
export default function ScriptReveal({
  text,
  className = "",
  delay = 0,
  duration = 1.1,
}: {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={`inline-block ${className}`}
      /* Generous vertical over-scan so ascenders/descenders never clip. */
      initial={{ clipPath: "inset(-40% 105% -40% -5%)", opacity: 0 }}
      animate={{ clipPath: "inset(-40% -5% -40% -5%)", opacity: 1 }}
      transition={{
        clipPath: { delay, duration, ease: [0.65, 0, 0.35, 1] },
        opacity: { delay, duration: 0.2 },
      }}
    >
      {text}
    </motion.span>
  );
}
