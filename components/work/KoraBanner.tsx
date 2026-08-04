"use client";

import { motion, useReducedMotion } from "motion/react";
import IphoneFrame from "@/components/work/IphoneFrame";

/**
 * Kora hero plate — Figma 459:3630 (the "Banner" export in
 * design/assets-source/Kora page).
 *
 * Rebuilt live rather than dropped in as the flat PNG. The export bakes the
 * four annotation pills into the pixels, and a baked pill cannot move: the
 * brief asks for them to bounce. Live also buys real text (crisp at any DPI,
 * selectable, in the a11y tree), ~120KB saved, and a plate that scales
 * without resampling. Everything below is measured off that export, so the
 * result is the same picture — dot pitch, phone width, pill geometry and all.
 *
 * Geometry is expressed as percentages of the 1076 x 433 plate and type in
 * container units, so the whole composition scales as one object.
 */

/** Blue annotation pins (Figma 345:757-760), measured from Banner.png. */
const NOTES = [
  { text: "discover", left: 28.62, top: 15.24, width: 9.64, delay: 0 },
  { text: "explore", left: 60.97, top: 15.24, width: 8.9, delay: 0.55 },
  { text: "collect", left: 60.87, top: 66.74, width: 8.16, delay: 1.1 },
  { text: "increased career visibility", left: 19.52, top: 75.0, width: 18.19, delay: 1.65 },
] as const;

/** Pill height as a share of plate height (42.75 / 433). */
const PILL_H = 9.87;

export default function KoraBanner() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-[24px] bg-white shadow-paper">
      <div className="@container relative aspect-[4/5] w-full sm:aspect-[1076/560] lg:aspect-[1076/433]">
        {/* Plate ground: white paper, fine dot field (Figma "Frame 38"). */}
        <div aria-hidden className="bg-dot-plate absolute inset-0" />

        {/* The onboarding screen, cropped by the plate exactly as in the file:
            327.5 / 1076 wide, 31 / 433 from the top, centred on 537.9. */}
        <div className="absolute left-1/2 top-[7.16%] w-[30.44%] min-w-[190px] -translate-x-1/2">
          <IphoneFrame
            src="/assets/kora/screen3.webp"
            alt="Kora's home screen, greeting the student by name and opening the career map"
            sizes="(max-width: 1120px) 30vw, 330px"
            priority
          />
        </div>

        {NOTES.map((note) => (
          <Pill key={note.text} note={note} still={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
}

function Pill({
  note,
  still,
}: {
  note: (typeof NOTES)[number];
  still: boolean;
}) {
  const box = {
    left: `${note.left}%`,
    top: `${note.top}%`,
    width: `${note.width}%`,
    height: `${PILL_H}%`,
  };

  const skin =
    "flex size-full items-center justify-center whitespace-nowrap rounded-[1.3cqw] bg-[#007aff] text-[1.77cqw] leading-none text-white shadow-[0_0.55cqw_1.7cqw_rgba(0,122,255,0.3)]";

  if (still)
    return (
      <span className="absolute hidden md:block" style={box}>
        <span className={skin}>{note.text}</span>
      </span>
    );

  /* Two layers on purpose: the outer one owns the one-shot entrance, the
     inner one the endless float. Sharing a single `y` between a spring and an
     infinite keyframe loop makes the loop restart from 0 and snap. */
  return (
    <motion.span
      className="absolute hidden md:block"
      style={box}
      initial={{ opacity: 0, y: -10, scale: 0.86 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        opacity: { duration: 0.35, delay: 0.25 + note.delay * 0.1 },
        default: { type: "spring", stiffness: 420, damping: 18, delay: 0.25 + note.delay * 0.1 },
      }}
    >
      {/* A pin resting on the board — 3.5px of travel, phase-offset per pill
          so the four never breathe in unison. In sync they'd read as one
          animating block instead of four separate notes. */}
      <motion.span
        className={skin}
        animate={{ y: [0, -3.5, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: note.delay }}
      >
        {note.text}
      </motion.span>
    </motion.span>
  );
}
