"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import SectionLabel from "@/components/layout/SectionLabel";
import { COVER, FAVOURITES } from "@/lib/about";

/**
 * "Some of my favourite things" — a category carousel (Figma 565:389).
 * The arrows step between Books / Movies / Shows / Anime / Albums, not
 * between items.
 *
 * August 2026 shrank the covers by about a quarter so the shelf reads as one
 * row of objects rather than four competing posters; sizes and gaps live in
 * COVER so both breakpoints stay in step.
 */
export default function FavouritesCarousel({ fluid = false }: { fluid?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const category = FAVOURITES[index];
  const size = COVER[category.kind];

  const step = (delta: number) =>
    setIndex((i) => (i + delta + FAVOURITES.length) % FAVOURITES.length);

  return (
    <section className="flex w-full flex-col items-center gap-[67px]">
      <div className="flex w-full flex-col items-center gap-[25px]">
        <SectionLabel className="w-full">some of my favourite things</SectionLabel>
        <AnimatePresence mode="wait">
          <motion.p
            key={category.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="font-display -rotate-[0.66deg] text-[32px] leading-[1.2] tracking-[-0.408px] text-black"
          >
            {category.label}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <CarouselButton direction="prev" onClick={() => step(-1)} label={`Show ${prevLabel(index)}`} />

        {/* Fixed height so stepping between categories doesn't make the page
            jump — portrait covers and album sleeves are different shapes. */}
        <div className="flex min-h-[289px] flex-1 items-center">
          <AnimatePresence mode="wait">
            {/* Covers arrive one after another rather than as a block — a
                shelf being set down, not a slide transition. 45ms apart is
                below the threshold where it reads as waiting. */}
            <motion.ul
              key={category.id}
              initial={reduceMotion ? false : "out"}
              animate="in"
              exit={reduceMotion ? undefined : "out"}
              variants={{ in: { transition: { staggerChildren: 0.045 } }, out: {} }}
              className="flex w-full items-start justify-center max-lg:flex-wrap"
              style={{ gap: fluid ? 24 : size.gap }}
            >
              {category.items.map((item) => (
                /* Hover: the cover straightens and lifts, like picking it off
                   the shelf — mirrors the project-card hover. Width is pinned
                   to the artwork so a long title ("How to Lose a Guy in 10
                   Days") can't stretch its own item wider than the cover and
                   knock the shelf out of rhythm. */
                <motion.li
                  key={item.title}
                  className="flex shrink-0 flex-col items-start"
                  style={{ width: fluid ? 140 : size.width }}
                  variants={{
                    out: { opacity: 0, y: 14, rotate: item.rotate ?? 0 },
                    in: { opacity: 1, y: 0, rotate: item.rotate ?? 0 },
                  }}
                  whileHover={reduceMotion ? undefined : { rotate: 0, y: -8, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  data-cursor="hover"
                >
                  {/* No placeholder tint behind the artwork: on a page this
                      sparse a 4% wash reads as a grey panel sitting under the
                      shelf rather than as a loading state. */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ aspectRatio: `${size.width} / ${size.height}` }}
                  >
                    {item.cover && (
                      <Image
                        src={item.cover}
                        alt={`${item.title} cover`}
                        fill
                        sizes={`${size.width}px`}
                        className="object-cover"
                      />
                    )}
                  </div>
                  {/* Fixed caption height so a two-line title doesn't shove
                      its neighbours' baselines around. */}
                  <div className="flex h-[51px] w-full flex-col gap-[4px] pt-[10px]">
                    <span className="text-[20px] font-medium leading-[24px] tracking-[-0.2px] text-black">
                      {item.title}
                    </span>
                    {item.author && (
                      <span className="text-[14px] uppercase leading-[16px] tracking-[-0.14px] text-ink-muted">
                        {item.author}
                      </span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        <CarouselButton direction="next" onClick={() => step(1)} label={`Show ${nextLabel(index)}`} />
      </div>
    </section>
  );
}

const prevLabel = (i: number) => FAVOURITES[(i - 1 + FAVOURITES.length) % FAVOURITES.length].label;
const nextLabel = (i: number) => FAVOURITES[(i + 1) % FAVOURITES.length].label;

function CarouselButton({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor="hover"
      className="group/arrow grid size-[42px] shrink-0 place-items-center rounded-full border border-hairline bg-white text-ink-muted transition-[color,transform,box-shadow] duration-200 hover:scale-[1.08] hover:text-black hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)] active:scale-[0.94]"
    >
      <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
