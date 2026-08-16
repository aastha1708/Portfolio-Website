"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { scrollParent } from "@/lib/scroll";

export type Feature = {
  title: string;
  body: string;
  image: string;
  alt: string;
};

/**
 * The four steps of the Kora journey (Figma 459:3725), driven by scroll.
 *
 * WHAT STAYS ON SCREEN
 * --------------------
 * Everything the reader needs to answer "what am I looking at": the section
 * kicker, the headline, all four step cards, and the artwork for the current
 * step. The first version pinned only the cards and the image, leaving the
 * headline to scroll away — so by step three you were watching phone screens
 * with no idea what they were illustrating. The heading is part of the pinned
 * panel now, not a thing above it.
 *
 * Other notes on the choices:
 *
 * - Nothing is hidden behind the interaction. All four cards stay readable the
 *   whole time; scroll only moves the emphasis and the image. A
 *   scroll-to-reveal version would have made three quarters of the section
 *   invisible to anyone who doesn't scroll it exactly right — and invisible to
 *   search and screen readers.
 * - Steps are plain IntersectionObservers on spacer divs rather than scroll
 *   maths. That works unchanged inside the case-study bottom sheet, where the
 *   scroller is a div and window scroll offsets mean nothing.
 * - Under prefers-reduced-motion the pin is dropped entirely: the section
 *   becomes a plain heading and a stack of four cards with their art beside
 *   them.
 */
export default function FeatureScroller({
  features,
  kicker,
  title,
}: {
  features: Feature[];
  kicker: string;
  title: string;
}) {
  const reduceMotion = useReducedMotion();
  const stepsRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const host = stepsRef.current;
    if (!host) return;
    const steps = Array.from(host.querySelectorAll<HTMLElement>("[data-step]"));
    if (!steps.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setIndex(Number(entry.target.getAttribute("data-step")));
        }
      },
      /* A 1px-tall band across the middle of the scroller: whichever step
         crosses it owns the panel. No thresholds to tune, no jitter. */
      { root: scrollParent(host), rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    steps.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [reduceMotion]);

  const Header = (
    <div className="flex flex-col gap-[14px]">
      <p className="text-[16px] font-medium uppercase text-ink-muted">{kicker}</p>
      <h2 className="font-display text-[32px] leading-[1.15] tracking-[-0.408px] text-black">{title}</h2>
    </div>
  );

  if (reduceMotion) {
    return (
      <div className="flex flex-col gap-[24px]">
        {Header}
        {features.map((f) => (
          <div key={f.title} className="flex flex-wrap items-center gap-[24px]">
            <div className="flex min-w-[280px] flex-1 flex-col gap-[8px] rounded-[14px] bg-plate p-[16px]">
              <h3 className="text-[18px] font-medium text-black">{f.title}</h3>
              <p className="text-[14px] text-ink-muted">{f.body}</p>
            </div>
            <div className="relative size-[220px] shrink-0 overflow-hidden rounded-[24px] bg-white">
              <Image src={f.image} alt={f.alt} fill sizes="220px" className="object-contain p-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="relative" ref={stepsRef}>
      {/* The pinned panel — heading included. `top` keeps it clear of the fixed
          nav on the standalone page and of the sheet's chrome inside the
          modal. */}
      <div className="sticky top-[88px] flex flex-col gap-[24px]">
        {Header}

        <div className="flex flex-wrap items-center justify-between gap-[36px]">
          <ol className="flex w-full max-w-[529px] flex-col gap-[16px]">
            {features.map((f, i) => {
              const on = i === index;
              return (
                <motion.li
                  key={f.title}
                  className="flex flex-col gap-[8px] rounded-[14px] p-[16px]"
                  animate={{
                    backgroundColor: on ? "#e7e4d5" : "#f5f4f1",
                    /* The active card lifts a hair off the page — the same
                       paper-lift language as the project cards. */
                    boxShadow: on
                      ? "0 11px 24px rgba(181,181,181,0.22), 0 43px 43px rgba(181,181,181,0.12)"
                      : "0 0px 0px rgba(181,181,181,0), 0 0px 0px rgba(181,181,181,0)",
                    x: on ? 6 : 0,
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h3 className="text-[18px] font-medium text-black">{f.title}</h3>
                  <motion.p
                    className="text-[14px]"
                    animate={{ color: on ? "#404040" : "#8a8a8a" }}
                    transition={{ duration: 0.45 }}
                  >
                    {f.body}
                  </motion.p>
                </motion.li>
              );
            })}
          </ol>

          <div className="relative hidden h-[364px] w-[456px] max-w-full shrink-0 overflow-hidden rounded-[53px] bg-white lg:block">
            <AnimatePresence initial={false}>
              <motion.div
                key={features[index].title}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.94, y: 14 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.03, y: -10 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src={features[index].image}
                  alt={features[index].alt}
                  fill
                  sizes="456px"
                  className="object-contain px-[70px] py-[31px]"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll runway — one step per feature, sitting under the pinned panel
          so the section is exactly as tall as the story it tells. */}
      <div aria-hidden>
        {features.map((f, i) => (
          <div key={f.title} data-step={i} className="h-[52vh]" />
        ))}
      </div>
    </div>
  );
}
