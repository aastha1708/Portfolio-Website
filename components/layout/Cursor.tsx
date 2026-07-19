"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Two-part cursor: a small dot that tracks the pointer almost exactly, and a
 * ring that trails slightly behind it. Deliberately restrained — the ring grows
 * from 28px to 44px on interactive elements rather than ballooning, and labels
 * are a compact pill beside the cursor instead of text stuffed into a big
 * circle. Big circles read as a template; a quiet dot reads as craft.
 *
 * Opt in from markup:
 *   data-cursor="hover"
 *   data-cursor="label" data-cursor-text="View case study"
 *
 * Disabled on touch and under prefers-reduced-motion.
 */
export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Dot: near-instant. Ring: a touch of lag, which is what sells the weight.
  const dotX = useSpring(x, { stiffness: 1400, damping: 70, mass: 0.25 });
  const dotY = useSpring(y, { stiffness: 1400, damping: 70, mass: 0.25 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const on = fine && !reduceMotion;
    setEnabled(on);
    document.documentElement.dataset.customCursor = on ? "on" : "off";
    return () => {
      delete document.documentElement.dataset.customCursor;
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, [role='button']"
      );
      if (!el) {
        setHovering(false);
        setLabel(null);
        return;
      }
      const kind = el.dataset.cursor;
      if (kind === "label" && el.dataset.cursorText) {
        setLabel(el.dataset.cursorText);
        setHovering(false);
      } else {
        setLabel(null);
        setHovering(true);
      }
    };

    const hide = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const ringSize = label ? 8 : hovering ? 44 : 28;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: visible && !label ? 0.7 : 0,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />

      {/* Leading dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: 6,
          height: 6,
          opacity: visible && !label ? (hovering ? 0 : 1) : 0,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />

      {/* Label pill */}
      <AnimatePresence>
        {label && visible && (
          <motion.div
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9999]"
            style={{ x: dotX, y: dotY }}
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.86 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
          >
            <span className="-translate-x-1/2 -translate-y-1/2 block whitespace-nowrap rounded-full bg-black px-3 py-[7px] text-[11px] font-medium uppercase tracking-[0.04em] text-white shadow-sm">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
