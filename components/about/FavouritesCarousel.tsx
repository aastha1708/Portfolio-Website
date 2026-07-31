"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FAVOURITES } from "@/lib/about";

/**
 * "Some of my favourite things" — a category carousel.
 * The arrows step between Books / Movies / Shows / Anime / Albums, not
 * between items. All five categories are designed now: portrait covers for
 * books/movies/shows/anime, wide album sleeves for albums (Figma 327:212).
 */
export default function FavouritesCarousel() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const category = FAVOURITES[index];

  const step = (delta: number) =>
    setIndex((i) => (i + delta + FAVOURITES.length) % FAVOURITES.length);

  return (
    <section className="flex w-full flex-col items-start gap-[67px]">
      <div className="flex w-full flex-col items-center gap-[24px]">
        <h2 className="w-full text-center text-[16px] uppercase text-ink-muted">
          some of my favourite things
        </h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={category.id}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="font-card -rotate-[0.66deg] text-[32px] leading-[22px] tracking-[-0.408px] text-black"
          >
            {category.label}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="flex w-full items-center justify-between gap-4">
        <CarouselButton direction="prev" onClick={() => step(-1)} label={`Show ${prevLabel(index)}`} />

        <div className="flex min-h-[381px] flex-1 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={category.id}
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex w-full justify-center max-lg:flex-wrap ${
                category.kind === "wide" ? "items-center gap-[48px]" : "items-start gap-[12px]"
              }`}
            >
              {category.items.map((item) => (
                /* Hover: the cover straightens and lifts, like picking it
                   off the shelf — mirrors the project-card hover. */
                <motion.figure
                  key={item.title}
                  className="flex flex-col items-start justify-center"
                  style={{ rotate: item.rotate ?? 0 }}
                  whileHover={reduceMotion ? undefined : { rotate: 0, y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  data-cursor="hover"
                >
                  <div
                    className={`relative ${
                      category.kind === "wide" ? "h-[216px] w-[311px]" : "h-[293px] w-[217px]"
                    }`}
                  >
                    {item.cover && (
                      <Image
                        src={item.cover}
                        alt={`${item.title} cover`}
                        fill
                        sizes={category.kind === "wide" ? "311px" : "217px"}
                        className="object-cover"
                      />
                    )}
                  </div>
                  <figcaption
                    className={`flex flex-col gap-[4px] pt-3 ${
                      category.kind === "wide" ? "px-[32px]" : ""
                    }`}
                  >
                    <span className="text-[20px] font-medium tracking-[-0.2px] text-black">{item.title}</span>
                    {item.author && (
                      <span className="text-[14px] uppercase tracking-[-0.14px] text-ink-muted">{item.author}</span>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </motion.div>
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
      className="grid size-[42px] shrink-0 place-items-center rounded-full border border-[#ddd] bg-white/60 text-ink-muted transition-colors hover:text-black active:scale-[0.94]"
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path
          d={direction === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
