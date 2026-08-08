"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

/* Grid geometry — Figma 569:566. Two rows of two 550x492 cards with a 60px
   gutter both ways, on an 1160x1044 canvas. */
const CARD_W = 550;
const CARD_H = 492;
const GUTTER = 60;
const COLS = 2;
const W = COLS * CARD_W + (COLS - 1) * GUTTER; // 1160
const ROWS = Math.ceil(PROJECTS.length / COLS);
const H = ROWS * CARD_H + (ROWS - 1) * GUTTER; // 1044

const slot = (i: number) => ({
  left: (i % COLS) * (CARD_W + GUTTER),
  top: Math.floor(i / COLS) * (CARD_H + GUTTER),
});

/**
 * The four cards arrive as one compact stack in the middle of the grid, sit
 * there for a beat, then open out to their places — the Cindy Ly work-section
 * treatment. Plays once per page load, when the section scrolls into view.
 *
 * HOLD is the length of that beat — long enough to register "a stack of work"
 * before it resolves, short enough that a scrolling visitor isn't left looking
 * at four unlabelled cards.
 */
const HOLD = 1;

export default function ProjectGrid() {
  const reduceMotion = useReducedMotion();

  const spread = (i: number) => ({
    type: "spring" as const,
    stiffness: 150,
    damping: 21,
    delay: HOLD + i * 0.07,
  });

  const card: Variants = {
    hidden: (i: number) => {
      const { left, top } = slot(i);
      return {
        x: W / 2 - (left + CARD_W / 2),
        y: H / 2 - (top + CARD_H / 2),
        // Compact enough to read as a pile of work, not four cards overlapping.
        scale: 0.58,
        opacity: 0,
        rotate: [-4, 2.5, -1.5, 4][i % 4],
      };
    },
    /* Two beats: the pile fades in at the centre almost at once, holds, then
       every card springs to its slot (scale riding along so the pile also
       grows as it fans). */
    visible: (i: number) => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        opacity: { duration: 0.35, delay: i * 0.06 },
        x: spread(i),
        y: spread(i),
        scale: spread(i),
        rotate: spread(i),
      },
    }),
  };

  return (
    <>
      <motion.div
        className="relative hidden lg:block"
        style={{ width: W, height: H }}
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {PROJECTS.map((p, i) => (
          /* Each layer is positioned at the card's slot and transformed back
             to the centre, so the spring animates a pure transform — no
             layout thrash, and the stacking order stays the DOM order. */
          <motion.div key={p.id} className="absolute" style={slot(i)} custom={i} variants={card}>
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>

      <div className="flex flex-col gap-10 px-5 lg:hidden">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} fixed={false} />
        ))}
      </div>
    </>
  );
}
