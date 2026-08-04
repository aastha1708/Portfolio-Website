"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
  useReducedMotion,
} from "motion/react";

/**
 * The x-ray cursor.
 *
 * A single solid disc riding the pointer under mix-blend-difference, so it
 * inverts whatever it passes over instead of picking a colour that has to
 * work on both the paper ground and the dark plates. Aug 2026 gave it three
 * more behaviours, in order of how often you'll see them:
 *
 *  1. Squash & stretch. The disc reads its own velocity and elongates along
 *     the direction of travel, easing back to a circle when it settles. It's
 *     the difference between a dot that is moved and a thing that moves —
 *     and it costs one extra transform, no extra element.
 *  2. Snap. Elements marked `data-cursor="snap"` (nav segments, the contents
 *     rail, footer links) hand the cursor their bounding box: the disc morphs
 *     into a rounded rectangle locked to the target and the hover state
 *     becomes physical rather than decorative. Motion of the disc is damped
 *     while snapped, so it sits still on the target instead of jittering.
 *  3. Aperture. A second, slower ring trails the disc — the x-ray's lens.
 *     It lags far enough to be legible as a trail, never far enough to look
 *     like a bug.
 *
 * Opt in from markup:
 *   data-cursor="hover"                                   grow
 *   data-cursor="snap"                                    morph to the element
 *   data-cursor="label" data-cursor-text="View case study" caption pill
 *
 * Off on touch and under prefers-reduced-motion, where it falls back to the
 * system cursor entirely (see the [data-custom-cursor] rule in globals.css).
 */

type Snap = { x: number; y: number; w: number; h: number; r: number };

const DOT = 16;
const HOVER = 36;

export default function Cursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [snap, setSnap] = useState<Snap | null>(null);
  const snapEl = useRef<HTMLElement | null>(null);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  /* Where the disc actually wants to be: the pointer, or the centre of a
     snapped target. Kept separate from the raw pointer so snapping stays on
     the compositor (transforms only, no animated left/top). */
  const tx = useMotionValue(-100);
  const ty = useMotionValue(-100);

  /* Two followers at different weights: the disc is nearly on the pointer,
     the aperture lags behind it. */
  const dotX = useSpring(tx, { stiffness: 1000, damping: 60, mass: 0.3 });
  const dotY = useSpring(ty, { stiffness: 1000, damping: 60, mass: 0.3 });
  const ringX = useSpring(x, { stiffness: 170, damping: 22, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 170, damping: 22, mass: 0.6 });

  /* --- squash & stretch ------------------------------------------------
     Speed drives how far from round the disc gets; direction drives which
     way it points. Both are read off the smoothed follower, not the raw
     pointer, so a single jumpy event can't flick it. */
  const vx = useVelocity(dotX);
  const vy = useVelocity(dotY);
  const speed = useMotionValue(0);
  const angle = useMotionValue(0);

  useMotionValueEvent(vx, "change", () => sync());
  useMotionValueEvent(vy, "change", () => sync());
  const sync = () => {
    const dx = vx.get();
    const dy = vy.get();
    const s = Math.min(Math.hypot(dx, dy) / 2600, 1); // 0..1, saturates fast
    speed.set(s);
    if (s > 0.06) angle.set((Math.atan2(dy, dx) * 180) / Math.PI);
  };

  const stretchX = useSpring(useTransform(speed, [0, 1], [1, 1.55]), {
    stiffness: 260,
    damping: 26,
  });
  const stretchY = useSpring(useTransform(speed, [0, 1], [1, 0.68]), {
    stiffness: 260,
    damping: 26,
  });
  const spin = useSpring(angle, { stiffness: 220, damping: 24 });

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

    const readSnap = (el: HTMLElement): Snap => {
      const r = el.getBoundingClientRect();
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 8;
      return {
        x: r.left + r.width / 2,
        y: r.top + r.height / 2,
        w: r.width + 10,
        h: r.height + 8,
        r: Math.min(radius + 5, (r.height + 8) / 2),
      };
    };

    const release = () => {
      snapEl.current = null;
      setSnap(null);
    };

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, select, [role='button']"
      );
      const kind = el?.dataset.cursor;

      if (el && kind === "snap") {
        const box = readSnap(el);
        tx.set(box.x);
        ty.set(box.y);
        setLabel(null);
        setHovering(false);
        if (snapEl.current !== el) {
          snapEl.current = el;
          setSnap(box);
        }
        return;
      }

      tx.set(e.clientX);
      ty.set(e.clientY);
      release();

      if (!el) {
        setHovering(false);
        setLabel(null);
      } else if (kind === "label" && el.dataset.cursorText) {
        setLabel(el.dataset.cursorText);
        setHovering(false);
      } else {
        setLabel(null);
        setHovering(true);
      }
    };

    /* A snapped target can move under the cursor (the nav segments morph on
       hover, the contents rail scrolls). Re-measure on the frames that
       matter instead of every frame. */
    const remeasure = () => {
      const el = snapEl.current;
      if (!el) return;
      if (!el.isConnected) return release();
      const box = readSnap(el);
      tx.set(box.x);
      ty.set(box.y);
      setSnap(box);
    };

    const hide = () => setVisible(false);
    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", remeasure, { passive: true, capture: true });
    window.addEventListener("resize", remeasure);
    /* The nav segments resize themselves on hover — catch the end of that
       morph so the cursor lands on the final box, not the one it started on. */
    document.addEventListener("transitionend", remeasure, true);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    const settle = setInterval(remeasure, 120);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", remeasure, { capture: true });
      window.removeEventListener("resize", remeasure);
      document.removeEventListener("transitionend", remeasure, true);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      clearInterval(settle);
    };
  }, [enabled, x, y, tx, ty]);

  if (!enabled) return null;

  const size = label ? 10 : hovering ? HOVER : DOT;

  return (
    <>
      {/* Aperture — the trailing lens. Hidden while snapped or captioned, so
          those states stay one clean shape. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 54 : 40,
          height: hovering ? 54 : 40,
          opacity: visible && !label && !snap ? (hovering ? 0.5 : 0.28) : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* The disc. Snapped it becomes the target's own outline; free it keeps
          its velocity shape. */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] bg-white mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          /* Velocity shape is for the free disc only — a snapped cursor is
             locked to a target and must not wobble on it. */
          scaleX: snap ? 1 : stretchX,
          scaleY: snap ? 1 : stretchY,
          rotate: snap ? 0 : spin,
        }}
        animate={{
          width: snap ? snap.w : size,
          height: snap ? snap.h : size,
          borderRadius: snap ? snap.r : 999,
          opacity: visible ? (snap ? 0.9 : 1) : 0,
          scale: pressed ? (snap ? 0.97 : 0.88) : 1,
          /* Pressed: same colour, lighter shade, feathered outward. */
          boxShadow:
            pressed && !snap
              ? "0 0 0 6px rgba(255, 255, 255, 0.35), 0 0 14px 8px rgba(255, 255, 255, 0.18)"
              : "0 0 0 0px rgba(255, 255, 255, 0)",
        }}
        transition={{ type: "spring", stiffness: 380, damping: 30, mass: 0.6 }}
      />

      {/* Caption pill */}
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
