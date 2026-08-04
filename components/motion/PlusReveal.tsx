"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";

/**
 * Dashed plus-box → spirograph reveal (Figma: closed 414:2684, open-state
 * icon 423:2765, floating card 423:2766).
 *
 * The 72px dashed box never changes size. On click its plus becomes a small
 * filled ink square ("occupied"), and the line-drawing pops out into a
 * floating paper card offset up-and-beside the box — an origin-aware pop, the
 * card growing out of the box's corner. The drawing then spins slowly
 * (the Yan Liu treatment). Clicking again folds everything back.
 *
 * `offset` places the card per box, straight from the Figma open states.
 * The spin animates `rotate` only and is dropped under reduced motion — the
 * reveal itself still works, instantly.
 */

const CARD = { width: 145, height: 135 };

export default function PlusReveal({
  shape,
  offset = { dx: 106, dy: -53 },
  className = "",
  spinDuration = 28,
}: {
  /** Line-drawing asset revealed in the floating card. */
  shape: string;
  /** Card position relative to the box's top-left, from the Figma canvas
   *  "Finalest version" (445:2776) — each box floats its card differently. */
  offset?: { dx: number; dy: number };
  className?: string;
  /** Seconds per revolution — vary per box so open boxes never sync. */
  spinDuration?: number;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  /* The pop grows out of whichever box corner the card is anchored to. */
  const origin = `${offset.dy < 0 ? "bottom" : "top"} ${offset.dx > 0 ? "left" : "right"}`;
  const tilt = offset.dx > 0 ? -10 : 10;

  return (
    <motion.button
      type="button"
      aria-expanded={open}
      aria-label={open ? "Hide doodle" : "Reveal doodle"}
      data-cursor="label"
      data-cursor-text={open ? "fold it away" : "open me"}
      onClick={() => setOpen((o) => !o)}
      className={`relative flex size-[72px] items-center justify-center border border-dashed border-black/35 bg-transparent ${
        open ? "z-20" : ""
      } ${className}`}
      whileHover={reduceMotion ? undefined : { scale: 1.05 }}
      whileTap={reduceMotion ? undefined : { scale: 0.95 }}
    >
      {/* plus ↔ filled square */}
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.span
            key="square"
            className="block size-[24px] bg-black"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.4 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 24 }}
          />
        ) : (
          <motion.svg
            key="plus"
            viewBox="0 0 24 24"
            className="size-[24px] text-black/70"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: -45 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, rotate: 45 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Floating card — pops out of the box's near corner. */}
      <AnimatePresence>
        {open && (
          <motion.span
            aria-hidden
            className="shadow-paper absolute flex items-center justify-center rounded-[10px] bg-white p-[16px]"
            style={{
              width: CARD.width,
              height: CARD.height,
              left: offset.dx,
              top: offset.dy,
              transformOrigin: origin,
            }}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.25, rotate: tilt }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.25, rotate: tilt * 0.8 }}
            transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 240, damping: 22 }}
          >
            <motion.img
              src={shape}
              alt=""
              className="size-full object-contain"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={
                reduceMotion
                  ? undefined
                  : { rotate: { duration: spinDuration, repeat: Infinity, ease: "linear" } }
              }
            />
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
