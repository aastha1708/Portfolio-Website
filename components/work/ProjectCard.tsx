"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

/**
 * Paper card for one project — Figma 569:459.
 *
 * 550x492 on the desktop stage, fluid in the mobile stack. All the internal
 * rhythm (24 padding, 24 between media and meta, 18 and 12 inside the meta
 * block) comes straight from the frame; the card is a normal flow component so
 * the same markup serves both breakpoints.
 */
export default function ProjectCard({ project, fixed = true }: { project: Project; fixed?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <Link
      href={`/work/${project.id}`}
      className="block"
      aria-label={`${project.title} — view case study`}
      data-cursor="label"
      data-cursor-text="View case study"
    >
      <motion.article
        className={`group flex flex-col justify-center rounded-[14px] bg-plate p-[24px] shadow-paper ${
          fixed ? "h-[492px] w-[550px]" : "w-full"
        }`}
        whileHover={reduceMotion ? undefined : { y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        <div className="flex w-full flex-1 flex-col gap-[24px]">
          {/* Media quietly pushes in on hover — the card is the target, the
              zoom just confirms it's live. */}
          <div
            className={`relative w-full flex-1 overflow-hidden rounded-[12px] bg-black/[0.04] ${
              fixed ? "" : "aspect-[502/302]"
            }`}
          >
            {project.video ? (
              <>
                {/* Looping video, with a still poster for reduced-motion users. */}
                <video
                  className="absolute inset-0 size-full object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:hidden motion-reduce:transition-none"
                  src={project.video}
                  poster={project.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="none"
                  aria-label={`${project.title} preview`}
                />
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 502px"
                  className="hidden object-cover motion-reduce:block"
                />
              </>
            ) : (
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 502px"
                className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
              />
            )}
          </div>

          <div className="flex w-full shrink-0 flex-col gap-[18px]">
            <div className="flex w-full flex-col gap-[12px]">
              <div className="flex w-full items-center justify-between gap-4 leading-[22px] tracking-[-0.408px]">
                {/* Figma's 22px leading on 26px display type leaves no room
                    below the baseline, so `truncate`'s overflow clip cut the
                    descenders off "Revamping" and "Onboarding". The padding
                    gives them somewhere to go inside the clip box; the equal
                    negative margin cancels it again, so the row keeps the
                    frame's exact height and the title stays aligned with the
                    year. Symmetric on purpose — padding on one side only would
                    shift the title up against an `items-center` row. */}
                <h3 className="font-display -my-[10px] truncate py-[10px] text-[26px] text-black">
                  {project.title}
                </h3>
                <span className="font-script shrink-0 text-[18px] text-ink-muted">{project.year}</span>
              </div>
              <p className="w-full text-[16px] leading-[20px] text-ink-muted">{project.description}</p>
            </div>
            <ul className="flex items-center gap-[8px]">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-[4px] bg-chip-bg px-[8px] py-[4px] text-[14px] font-medium capitalize tracking-[0.035px] text-chip-text"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.article>
    </Link>
  );
}
