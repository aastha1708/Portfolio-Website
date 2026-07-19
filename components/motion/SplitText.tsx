"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Per-character entrance for the wordmark. Characters rise and settle with a
 * small stagger — a one-time cost on first paint, so a slightly springier
 * curve is appropriate here than for repeated interactions.
 */
export default function SplitText({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <span className={className}>{text}</span>;

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, y: "0.35em", rotate: -4 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{
            delay: delay + i * 0.032,
            type: "spring",
            stiffness: 300,
            damping: 24,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
