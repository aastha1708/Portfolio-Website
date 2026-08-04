import Link from "next/link";
import type { ReactNode } from "react";
import Nav from "@/components/layout/Nav";
import FooterField from "@/components/layout/FooterField";
import CaseStudyToc, { type TocItem } from "@/components/work/CaseStudyToc";
import Reveal from "@/components/motion/Reveal";

/**
 * Every case study on the site is this page: a contents rail on the left, a
 * 1080 reading column on the right, the postcard footer under both. Kora
 * fills it with the real thing; the other three fill it with their hero and
 * a coming-soon note. Same frame either way — a visitor should never feel
 * they've landed on a different website halfway through the work.
 *
 * No graph-paper ruling here, by design: the ruling belongs to the landing
 * and about pages, and a case study reads better on plain paper.
 */
export default function CaseStudyShell({
  toc,
  children,
}: {
  /** Omitted for coming-soon pages, which have nothing to navigate. */
  toc?: TocItem[];
  children: ReactNode;
}) {
  return (
    <main className="relative min-h-screen">
      <Nav />

      <div className="mx-auto flex w-full max-w-[1420px] justify-center gap-[56px] px-6 pb-[120px] pt-[120px] max-lg:px-5 max-lg:pt-[104px]">
        {toc?.length ? (
          <div className="w-[150px] shrink-0 max-xl:hidden">
            <div className="sticky top-[120px]">
              <Reveal immediate delay={0.1}>
                <CaseStudyToc items={toc} />
              </Reveal>
            </div>
          </div>
        ) : null}

        <article className="w-full max-w-[1080px] min-w-0">
          <Reveal immediate>
            <Link
              href="/"
              data-cursor="hover"
              className="text-[13px] uppercase tracking-[0.04em] text-ink-muted transition-colors hover:text-black"
            >
              &larr; back to all projects
            </Link>
          </Reveal>
          {children}
        </article>
      </div>

      <FooterField />
    </main>
  );
}
