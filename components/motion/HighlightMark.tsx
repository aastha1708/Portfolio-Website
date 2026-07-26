"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * The yellow marker swipe. The highlight wipes across the phrase when it
 * scrolls into view, like running a highlighter over it. Rendered as an
 * inline-block so the sweep is a single continuous stroke.
 */
export default function HighlightMark({
  children,
  delay = 0.25,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.mark
      className="inline-block bg-transparent text-black"
      style={{
        backgroundImage: "linear-gradient(#eaf24c, #eaf24c)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 0",
      }}
      initial={reduceMotion ? { backgroundSize: "100% 100%" } : { backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ delay, duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.mark>
  );
}
