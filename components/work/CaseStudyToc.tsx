"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { scrollParent } from "@/lib/scroll";

export type TocItem = { id: string; label: string };

/**
 * Case-study contents rail (the cindyly.design / polimeter pattern): a sticky
 * left column that tracks the reader's position and jumps on click.
 *
 * Two constraints shaped the implementation:
 *
 * 1. This page renders both standalone AND inside the bottom sheet, where the
 *    scroller is a div rather than the window. So everything — the spy, the
 *    progress rail — resolves the nearest scrollable ancestor instead of
 *    assuming `window`.
 * 2. The rail has to belong to the rest of the portfolio, so it borrows the
 *    section-kicker voice (16px uppercase, ink-muted) and the graph-paper
 *    hairline rather than inventing a new sidebar language.
 */

export default function CaseStudyToc({
  items,
  className = "",
}: {
  items: TocItem[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);

  /* Scroll spy. A band across the upper third of the viewport decides the
     active section: "what am I reading now", not "what is on screen", which
     with three sections visible at once would flicker. */
  useEffect(() => {
    const scroller = scrollParent(rootRef.current);
    const targets = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { root: scroller, rootMargin: "-18% 0px -64% 0px", threshold: 0 }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [items]);

  /* Reading progress for the rail fill. */
  useEffect(() => {
    const scroller = scrollParent(rootRef.current);
    const source: HTMLElement | Window = scroller ?? window;

    let frame = 0;
    const read = () => {
      frame = 0;
      const top = scroller ? scroller.scrollTop : window.scrollY;
      const max = scroller
        ? scroller.scrollHeight - scroller.clientHeight
        : document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, top / max)) : 0);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    read();
    source.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      source.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id);
    el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    /* Keyboard users land where they clicked, not back at the top. */
    el.setAttribute("tabindex", "-1");
    el.focus({ preventScroll: true });
  };

  return (
    <nav ref={rootRef} aria-label="Case study contents" className={className}>
      <p className="mb-[18px] text-[11px] uppercase tracking-[0.14em] text-ink-muted/70">Contents</p>

      <div className="relative flex">
        {/* Hairline rail + reading progress — the same graph-paper grey as the
            page ruling, so it reads as part of the paper. */}
        <div aria-hidden className="relative mr-[14px] w-px shrink-0 bg-black/10">
          <motion.div
            className="absolute inset-x-0 top-0 origin-top bg-black/45"
            style={{ height: "100%" }}
            animate={{ scaleY: progress }}
            transition={{ duration: 0.18, ease: "linear" }}
          />
        </div>

        <ul className="flex flex-col gap-[2px]">
          {items.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                <a
                  href={`#${item.id}`}
                  onClick={jump(item.id)}
                  data-cursor="snap"
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-baseline gap-[10px] py-[7px] text-[13px] leading-[16px] transition-colors duration-200 ${
                    isActive ? "text-black" : "text-ink-muted hover:text-black"
                  }`}
                >
                  <span
                    className={`font-script text-[11px] tabular-nums transition-opacity duration-200 ${
                      isActive ? "opacity-70" : "opacity-35 group-hover:opacity-60"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative">
                    {item.label}
                    {/* The underline draws itself under the active item —
                        one moving mark instead of five competing states. */}
                    <motion.span
                      aria-hidden
                      className="absolute -bottom-[3px] left-0 h-px w-full origin-left bg-black"
                      initial={false}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
