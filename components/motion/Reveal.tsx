"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveal. Short travel, no bounce, fires once — repeated or springy
 * reveals draw attention to the animation instead of the content.
 *
 * `immediate` switches from scroll-triggered (`whileInView`) to mount-triggered
 * (`animate`). `whileInView` is gated on an IntersectionObserver that never
 * fires in some real contexts — in-app browsers (LinkedIn/Instagram),
 * link-preview renderers, restored background tabs — which leaves the content
 * stuck at its hidden initial state. That is fine below the fold (a scrolling
 * user triggers it; a preview only captures the top), but the first viewport
 * must animate on mount so the page can never load blank. Use `immediate` on
 * any block that is above the fold on its page.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 20,
  className = "",
  style,
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: CSSProperties;
  immediate?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion)
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );

  const shown = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-12% 0px -12% 0px" } })}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
