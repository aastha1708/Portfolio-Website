"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

/**
 * Morphic navbar (adapted from kokonutui/morphic-navbar).
 *
 * The link cluster is one continuous pill. The lifted item — hovered, or the
 * active route when the pointer is elsewhere — pops out as its own rounded
 * segment, and its neighbours' corners morph to wrap around the gap. Restyled
 * from kokonut's black glass to the portfolio's paper palette: the cluster is
 * a faint ink wash, the lifted segment is a white paper chip.
 */

type NavItem = {
  label: string;
  href: string;
  ready: boolean;
  /** Landing-page section id — scrolls instead of navigating when already home. */
  anchor?: string;
};

const LINKS: NavItem[] = [
  { label: "About", href: "/about", ready: true },
  { label: "Work", href: "/#projects", ready: true, anchor: "projects" },
  { label: "Playground", href: "/playground", ready: false },
  { label: "Visitor Gallery", href: "/gallery", ready: false },
];

/* Light-mode take on the kokonut cluster: the fused blocks are a soft ink
   wash instead of solid black, and the lifted segment is a white paper pill
   carried by its shadow. Same morph, palette that belongs to this site. */
/* px-[14px] gives the 28px gap between labels that the Figma row specifies,
   since the gap there is measured text-edge to text-edge. */
const SEGMENT =
  "flex items-center justify-center whitespace-nowrap bg-black/[0.05] py-[9px] px-[14px] text-[16px] text-ink-muted transition-all duration-300 max-lg:px-[10px] max-lg:text-[13px]";

export default function Nav() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  const activeLabel = LINKS.find((l) => l.ready && !l.anchor && pathname.startsWith(l.href))?.label ?? null;
  const lifted = hovered ?? activeLabel;

  const scrollToAnchor = (anchor: string) => (e: React.MouseEvent) => {
    if (pathname !== "/") return; // let the /#anchor navigation happen
    e.preventDefault();
    // Desktop and mobile render separate sections — scroll whichever is live.
    const targets = document.querySelectorAll<HTMLElement>(`[data-section="${anchor}"]`);
    for (const el of targets) {
      if (el.offsetParent !== null || el.getClientRects().length) {
        el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        return;
      }
    }
  };

  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Full-bleed row, 60px from each edge (Figma frame 394:1269) — the logo
          and the link cluster sit at opposite ends of the whole page. */}
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between px-gutter py-[34px] max-lg:px-5 max-lg:py-6"
      >
        <Link
          href="/"
          data-cursor="hover"
          aria-label="Aastha Singh — home"
          className="block size-[48px] shrink-0 overflow-hidden rounded-[4px] max-lg:size-[40px]"
        >
          <Image
            src="/assets/landing/final/aastha-logo.webp"
            alt=""
            width={96}
            height={96}
            priority
            className="size-full object-cover"
          />
        </Link>

        {/* -mr matches the segment's own padding, so the cluster's text edge —
            not its hover pill — lines up with the 60px page gutter. */}
        <ul
          className="-mr-[14px] flex items-stretch overflow-hidden rounded-xl max-lg:-mr-[10px]"
          onPointerLeave={() => setHovered(null)}
        >
          {LINKS.map((item, i) => {
            const isLifted = lifted === item.label;
            const prev = i > 0 ? LINKS[i - 1] : null;
            const next = i < LINKS.length - 1 ? LINKS[i + 1] : null;
            /* The kokonut morph: every segment is a solid ink block; the
               lifted one detaches as its own rounded pill (the mx margin opens
               a gap of page colour), and its neighbours' corners round toward
               the gap so the cluster appears to split and re-fuse. */
            const shape = isLifted
              ? "mx-2 rounded-xl !bg-white font-semibold !text-black shadow-[0_1px_6px_rgba(15,23,42,0.12)]"
              : [
                  (i === 0 || lifted === prev?.label) && "rounded-l-xl",
                  (i === LINKS.length - 1 || lifted === next?.label) && "rounded-r-xl",
                ]
                  .filter(Boolean)
                  .join(" ");

            return (
              <li key={item.label} className="flex" onPointerEnter={() => setHovered(item.label)}>
                {item.ready ? (
                  <Link
                    href={item.href}
                    data-cursor="snap"
                    aria-current={activeLabel === item.label ? "page" : undefined}
                    onClick={item.anchor ? scrollToAnchor(item.anchor) : undefined}
                    className={`${SEGMENT} ${shape}`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  /* Coming-soon pages morph like real links — the hover cursor
                     label is what communicates their state. */
                  <span
                    data-cursor="label"
                    data-cursor-text="Coming soon"
                    aria-disabled="true"
                    className={`${SEGMENT} ${shape} cursor-default`}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </motion.header>
  );
}
