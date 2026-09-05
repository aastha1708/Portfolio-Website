import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import CaseStudyToc, { type TocItem } from "@/components/work/CaseStudyToc";
import NextProject from "@/components/work/NextProject";
import Reveal from "@/components/motion/Reveal";

/**
 * Every case study on the site is this page: a contents rail on the left and
 * the article on the right. Kora fills it with the real thing; the other three
 * fill it with their hero and a coming-soon note. Same frame either way — a
 * visitor should never feel they've landed on a different website halfway
 * through the work.
 *
 * TWO WIDTHS, NOT ONE
 * -------------------
 * The article occupies a 1080 track — the Figma frame's width — but sets its
 * contents in an 880 measure centred inside it. The distinction matters,
 * because the two numbers answer different questions.
 *
 * 1080 is a LAYOUT width: it is what positions the rail. The rail, the gap and
 * the track are one centred group, so anything subtracted from the track drags
 * the rail inward with it. The rail's place on the page is part of the design
 * and shouldn't move because the prose got narrower, so the track keeps its
 * original width and the rail keeps its original x.
 *
 * 880 is a READING width. Body copy set at 22/32 across 1080px runs past 100
 * characters a line and the eye loses its place on every return sweep; 880 puts
 * it at roughly 75-80, the range typography has agreed on for a century. The
 * 100px it gives back on each side is the article's margin — air around the
 * document instead of content pushed to the window.
 *
 * Everything sized off the old full-width column (FeatureScroller's panel, the
 * phone rows, the persona still) was rescaled to 880 rather than left to wrap.
 *
 * NO FOOTER. A case study is a bottom sheet over the page you came from, not a
 * destination of its own, so it has no reason to end with a sign-off and a
 * second set of contact links — the page underneath already has those. The
 * standalone /work/<slug> route exists for direct links and search, and ends
 * the same way for consistency.
 *
 * The "next project" pill sits at the top of the rail, so the first thing in
 * view is: onward navigation and the contents on the left, the title and the
 * hero on the right. There is deliberately no "back to all projects" — the
 * sheet's close button already does that, and the useful move from the end of
 * one case study is sideways into the next one, not back to the grid. Below xl
 * the rail is hidden, so the pill moves inline above the article.
 *
 * No graph-paper ruling here, by design: the ruling belongs to the landing and
 * about pages, and a case study reads better on plain paper.
 */
export default function CaseStudyShell({
  slug,
  toc,
  children,
}: {
  /** Current project id, so the rail knows which project comes next. */
  slug: string;
  /** Omitted for coming-soon pages, which have nothing to navigate. */
  toc?: TocItem[];
  children: ReactNode;
}) {
  const hasRail = Boolean(toc?.length);

  return (
    <main className="relative min-h-screen pb-[140px]">
      <Nav />

      <div className="mx-auto flex w-full max-w-[1420px] justify-center gap-[56px] px-6 pt-[120px] max-lg:px-5 max-lg:pt-[104px]">
        {hasRail ? (
          /* 168 rather than 150: the pill needs the extra px, and the column
             still clears the 1080 article inside max-w-[1420px]. */
          <div className="w-[168px] shrink-0 max-xl:hidden">
            <div className="sticky top-[120px] flex flex-col gap-[28px]">
              <Reveal immediate>
                <NextProject current={slug} />
              </Reveal>
              <Reveal immediate delay={0.1}>
                <CaseStudyToc items={toc!} />
              </Reveal>
            </div>
          </div>
        ) : null}

        <article className="w-full min-w-0 max-w-[1080px]">
          {/* The measure, centred in the track. max-w rather than px, so the
              inset collapses on its own once the viewport is narrower than the
              measure — a phone gets the page gutter and nothing more. */}
          <div className="mx-auto w-full max-w-[880px]">
            {/* Shown only when the rail isn't carrying it. Inside the measure,
                so it lines up with the article's first line rather than
                hanging off the wider track. */}
            <div className={hasRail ? "mb-8 xl:hidden" : "mb-8"}>
              <Reveal immediate>
                <NextProject current={slug} />
              </Reveal>
            </div>
            {children}
          </div>
        </article>
      </div>
    </main>
  );
}
