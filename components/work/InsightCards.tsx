"use client";

import Reveal from "@/components/motion/Reveal";

export type Insight = { title: string; body: string };

/**
 * A row of paper cards carrying the findings of one section — research
 * takeaways, design principles, test results (Figma 636:466, 641:811,
 * 459:3699).
 *
 * The cards reveal in sequence rather than together: 60ms apart is below the
 * threshold where it reads as a queue, but enough that the eye is handed a
 * reading order instead of three blocks appearing at once.
 *
 * Equal minimum height is deliberate — cards of different heights in one row
 * imply different weight, and these are peers.
 */
export default function InsightCards({
  cards,
  columns = 3,
  minHeight = 195,
  padding = "p-[24px]",
}: {
  cards: readonly Insight[];
  columns?: 2 | 3;
  /** Figma pins a height per row; we treat it as a floor so copy can't clip. */
  minHeight?: number;
  /** Escape hatch for Kora, whose row was drawn with tighter side padding. */
  padding?: string;
}) {
  return (
    <div className={`grid gap-[24px] ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 0.06}>
          <div
            className={`flex h-full flex-col gap-[12px] rounded-[14px] bg-plate ${padding}`}
            style={{ minHeight }}
          >
            <h3 className="text-[22px] font-medium leading-[28px] text-black">{card.title}</h3>
            <p className="text-[18px] leading-[24px] text-ink-muted">{card.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
