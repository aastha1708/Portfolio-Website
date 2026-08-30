"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * A single headline number that counts up once, when it scrolls into view.
 *
 * Used for exactly one thing per page — a metric the reader is meant to stop
 * on. The count is short (0.9s) and eased out hard, so it lands rather than
 * ticks: a long count turns a result into a slot machine.
 *
 * Under prefers-reduced-motion, and before hydration, the final value is what
 * renders — the number is content, not decoration, so it must never depend on
 * the animation running.
 */
export default function CountUp({
  value,
  decimals = 0,
  duration = 0.9,
  className,
}: {
  value: number;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px -15% 0px" });
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      /* easeOutExpo: most of the distance is covered immediately, so the
         number reads as arriving rather than as being counted. */
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setShown(value * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setShown(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Tabular figures stop the width jittering as the digits change. */}
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{shown.toFixed(decimals)}</span>
    </span>
  );
}
