import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import CaseStudyToc, { type TocItem } from "@/components/work/CaseStudyToc";
import NextProject from "@/components/work/NextProject";
import Reveal from "@/components/motion/Reveal";

/**
 * Every case study on the site is this page: a contents rail on the left and a
 * 1080 reading column on the right. Kora fills it with the real thing; the
 * other three fill it with their hero and a coming-soon note. Same frame
 * either way — a visitor should never feel they've landed on a different
 * website halfway through the work.
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
          {/* Shown only when the rail isn't carrying it. */}
          <div className={hasRail ? "mb-8 xl:hidden" : "mb-8"}>
            <Reveal immediate>
              <NextProject current={slug} />
            </Reveal>
          </div>
          {children}
        </article>
      </div>
    </main>
  );
}
