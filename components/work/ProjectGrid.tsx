"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { PROJECTS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

/** Desktop scatter canvas (Figma frame 414:2699). */
const W = 1324;
const H = 983;

/**
 * Desktop: the exact Figma scatter, dealt out from the centre — the four
 * cards start as one stacked pile and spring to their spots as the section
 * scrolls into view (the Cindy Ly projects treatment). Plays once.
 * Mobile: a plain stack of the same cards.
 */
/** Beat of stillness between the pile appearing and the cards fanning out —
 *  the visitor should register "a stack of work" before it resolves. */
const HOLD = 0.55;

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
      const { layout } = PROJECTS[i];
      return {
        x: W / 2 - (layout.left + layout.width / 2),
        y: H / 2 - (layout.top + layout.height / 2),
        scale: 0.72,
        opacity: 0,
        rotate: i % 2 ? 5 : -5,
      };
    },
    /* Two beats: the pile fades in at the centre almost at once, holds, then
       every card springs to its slot (scale riding along so the pile also
       grows as it fans — the Cindy Ly read). */
    visible: (i: number) => ({
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        opacity: { duration: 0.3, delay: i * 0.05 },
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
        className="relative hidden h-[983px] w-[1324px] lg:block"
        initial={reduceMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        {PROJECTS.map((p, i) => (
          /* pointer-events juggling: each full-size layer must not eat hovers
             meant for the cards beneath it. */
          <motion.div
            key={p.id}
            className="pointer-events-none absolute inset-0 [&>*]:pointer-events-auto"
            custom={i}
            variants={card}
          >
            <ProjectCard project={p} />
          </motion.div>
        ))}
      </motion.div>
      <div className="flex flex-col gap-12 px-5 lg:hidden">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} absolute={false} />
        ))}
      </div>
    </>
  );
}
