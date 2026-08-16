"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll parallax. The wrapped block drifts against the page as it passes
 * through the viewport, which separates it from the flat background and gives
 * a long page some depth.
 *
 * Deliberately small. Parallax earns its keep at the amplitude where you feel
 * it and don't see it — past roughly 40px it starts reading as the page
 * failing to keep up with your scroll. The default 24px is about one line of
 * body text.
 *
 * The offset is spring-smoothed rather than bound straight to scroll progress,
 * so a trackpad flick doesn't snap the element to its end position.
 *
 * Off entirely under prefers-reduced-motion: parallax is exactly the kind of
 * uncommanded background movement that triggers vestibular symptoms.
 */
export default function Parallax({
  children,
  /** Total travel in px across the element's pass through the viewport. */
  distance = 24,
  className,
  style,
}: {
  children: ReactNode;
  distance?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(scrollYProgress, [0, 1], [distance / 2, -distance / 2]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  if (reduceMotion) {
    return (
      <div ref={ref} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y }}>
      {children}
    </motion.div>
  );
}
