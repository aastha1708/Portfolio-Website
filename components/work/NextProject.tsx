"use client";

import Link from "next/link";
import { PROJECTS } from "@/lib/projects";
import { scrollParent } from "@/lib/scroll";

/**
 * The one navigation affordance in the case-study rail.
 *
 * It replaced "back to all projects", which was doing a job the sheet's close
 * button already does — and doing it worse, since backing out to the landing
 * page just to open the next case study is three actions where one will do.
 * Moving sideways through the work is the thing a reader actually wants next.
 *
 * Wraps around, so the rail never shows a dead end on the last project.
 *
 * The label stays generic ("Next project") to keep the pill a fixed size in a
 * narrow rail; the destination rides on the accessible name.
 *
 * `data-cursor="snap"` gives it the nav's interaction: the cursor takes the
 * pill's own bounding box and fills it, so the hover state is the shape of the
 * thing you're pointing at. The caption-pill treatment (`data-cursor="label"`)
 * is for targets with no visible affordance of their own — on a button that
 * already says what it does it just parks a black slab over the rail.
 */
export default function NextProject({ current }: { current: string }) {
  const index = PROJECTS.findIndex((p) => p.id === current);
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  if (!next || next.id === current) return null;

  /* A case study can be read to the middle before you jump. Reset the scroller
     first, or the next one opens halfway down. */
  const toTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const scroller = scrollParent(e.currentTarget);
    if (scroller) scroller.scrollTop = 0;
    else window.scrollTo({ top: 0 });
  };

  return (
    <Link
      href={`/work/${next.id}`}
      /* REPLACE, not push. The sheet closes with router.back(), so every
         pushed case study would become another step the close button has to
         walk back through — click through three projects and the cross takes
         you to project two, not the work grid. Moving sideways between case
         studies swaps the sheet's contents; it isn't a new level of depth, so
         it shouldn't leave a history entry. This also makes the browser's own
         back button agree with the close button, which is the behaviour people
         actually expect from a modal. */
      replace
      onClick={toTop}
      aria-label={`Next project: ${next.title}`}
      data-cursor="snap"
      className="group/next inline-flex h-[40px] items-center gap-[8px] rounded-full border border-[#8f8f8f] px-[18px] text-[15px] font-medium text-[#6b6b6b] transition-colors duration-200 hover:border-black hover:text-black"
    >
      Next project
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-[16px] transition-transform duration-200 group-hover/next:translate-x-[2px]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
      >
        <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}
