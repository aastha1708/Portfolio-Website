"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Cross-route fade. Short and subtle — page transitions that make you wait are
 * worse than no transition at all.
 *
 * The wrapper is ALWAYS rendered, and reduced motion collapses the duration
 * rather than removing the element. Returning a bare fragment instead — which
 * is what this used to do — changes the DOM structure between the server render
 * and the client one, because the server has no way to know the visitor's
 * setting. React finds a <div> where it expected none, gives up on hydrating,
 * and rebuilds the entire page tree on the client: every animation restarts,
 * and any state below here is thrown away. It only ever showed up for visitors
 * who had the setting on, which is exactly the group least able to absorb a
 * full re-render.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
