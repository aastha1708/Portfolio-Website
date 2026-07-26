"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/projects";

/**
 * Paper card for one project. Geometry comes from the Figma frame; the card
 * itself is a normal flow component so the same markup serves the mobile stack.
 */
export default function ProjectCard({ project, absolute = true }: { project: Project; absolute?: boolean }) {
  const reduceMotion = useReducedMotion();
  const { layout } = project;

  const card = (
    <Link
      href={`/work/${project.id}`}
      className="block"
      aria-label={`${project.title} — view case study`}
      data-cursor="label"
      data-cursor-text="View case study"
    >
    <motion.article
      className="group relative flex flex-col gap-[10px] bg-[#f5f4f1] p-[24px] shadow-paper"
      style={absolute ? { width: layout.innerWidth } : undefined}
      whileHover={reduceMotion ? undefined : { y: -8, rotate: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
    >
      {layout.tape && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 h-[55.408px] w-[114px] overflow-hidden transition-transform duration-300 group-hover:-translate-y-[3px]"
          style={{
            top: layout.tape.top,
            transform: `translateX(calc(-50% + ${layout.tape.dx}px)) rotate(${layout.tape.rotate}deg)`,
          }}
        >
          <Image src="/assets/landing/tape-1.webp" alt="" fill sizes="114px" className="object-cover" />
        </span>
      )}

      <div className="flex w-full flex-col gap-[24px]">
        {/* Image quietly pushes in on hover — the card is the target, the
            zoom just confirms it's live. */}
        <div className="group/media relative h-[282px] w-full overflow-hidden">
          {project.video ? (
            <>
              {/* Looping video, with a still poster for reduced-motion users. */}
              <video
                className="absolute inset-0 size-full scale-100 object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:hidden motion-reduce:transition-none"
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
                sizes="(max-width: 1024px) 100vw, 660px"
                className="hidden object-cover motion-reduce:block"
              />
            </>
          ) : (
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 660px"
              className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
            />
          )}
        </div>

        <div className="flex w-full flex-col gap-[18px]">
          <div className="flex w-full flex-col gap-[12px]">
            <div className="flex w-full items-center justify-between whitespace-nowrap leading-[22px] tracking-[-0.408px]">
              <h3 className="font-serif text-[28px] font-medium text-black">{project.title}</h3>
              <span className="font-script text-[18px] text-ink-muted">{project.year}</span>
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

  if (!absolute) return card;

  return (
    <div
      className="absolute flex items-center justify-center"
      style={{ left: layout.left, top: layout.top, width: layout.width, height: layout.height }}
    >
      <div style={{ transform: `rotate(${layout.rotate}deg)` }}>{card}</div>
    </div>
  );
}
