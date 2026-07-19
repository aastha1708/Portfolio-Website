"use client";

import { motion, useReducedMotion } from "motion/react";

/** Cross-route fade. Short and subtle — page transitions that make you wait
 *  are worse than no transition at all. */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
