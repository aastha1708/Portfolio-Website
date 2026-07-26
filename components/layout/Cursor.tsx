"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * A single solid circle (no stroke/ring). It rides the pointer with a hint of
 * spring, grows over interactive elements, and on press gains a soft ring in
 * a lighter shade of the same colour — a quiet glow, not an outline.
 * mix-blend-difference keeps it legible on any surface.
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

  const dotX = useSpring(x, { stiffness: 1000, damping: 60, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 1000, damping: 60, mass: 0.3 });

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

  const size = label ? 10 : hovering ? 36 : 16;

  return (
    <>
      {/* The circle */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.88 : 1,
          /* Pressed: same colour, lighter shade, feathered outward — the glow. */
          boxShadow: pressed
            ? "0 0 0 6px rgba(255, 255, 255, 0.35), 0 0 14px 8px rgba(255, 255, 255, 0.18)"
            : "0 0 0 0px rgba(255, 255, 255, 0), 0 0 0px 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
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
            <span className="block -translate-x-1/2 translate-y-[14px] whitespace-nowrap rounded-full bg-black px-3 py-[7px] text-[11px] font-medium uppercase tracking-[0.04em] text-white shadow-sm">
              {label}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
