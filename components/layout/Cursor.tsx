"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Circle cursor with three states, driven entirely by markup:
 *
 *   <a data-cursor="hover">                     -> circle expands
 *   <a data-cursor="label" data-cursor-text="View case study">  -> expands + shows text
 *
 * Adding a new hover target never requires touching this file.
 * Disabled on touch devices and under prefers-reduced-motion, where a custom
 * cursor is either meaningless or actively harmful.
 */
export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [mode, setMode] = useState<"default" | "hover" | "label">("default");
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

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

      const target = (e.target as HTMLElement)?.closest<HTMLElement>("[data-cursor]");
      if (!target) {
        setMode("default");
        setLabel(null);
        return;
      }
      const kind = target.dataset.cursor;
      if (kind === "label") {
        setMode("label");
        setLabel(target.dataset.cursorText ?? null);
      } else {
        setMode("hover");
        setLabel(null);
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 104 : mode === "hover" ? 52 : 14;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: mode === "default" ? "#ffffff" : "rgba(255,255,255,0.92)",
        opacity: visible ? 1 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 32 }}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-3 text-center text-[11px] font-medium uppercase leading-tight tracking-wide text-black"
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );
}
