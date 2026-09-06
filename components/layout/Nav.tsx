"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import SpecularButton from "@/components/ui/SpecularButton";

/**
 * The navigation, Sept 2026.
 *
 * Three zones, in the order a visitor uses them: who this is (the wordmark),
 * where they can go (the links), and the one thing they might want to do (the
 * CTA). The links sit in the true centre of the page rather than after the
 * wordmark, so the row reads as a masthead instead of a toolbar — and the
 * centre stays centred no matter how wide the two ends get, because the grid is
 * 1fr / auto / 1fr rather than a flex row with space-between.
 *
 * WHAT THIS REPLACED, AND WHY
 * ---------------------------
 * Before this it was a "morphic" cluster (adapted from kokonutui): five fused
 * ink blocks where the hovered item detached into its own white pill and its
 * neighbours' corners re-rounded around the gap. It was the most animated thing
 * above the fold, animating the least interesting content on the page — it
 * fought a hero built on eight hand-placed keepsakes, and it read as a
 * component someone installed rather than something designed for this site.
 *
 * The links are now deliberately quiet: five words in muted ink carrying no
 * chrome at rest, with a hover that does one honest thing — the label darkens
 * to full black over a barely-there wash. The current page is the only item
 * that is black without being hovered, so the nav answers "where am I" without
 * an underline, a dot, or a pill. All the visual weight that used to be spread
 * across five equal blocks now sits on the one item that is an action.
 *
 * The nav is ABSOLUTE, not fixed. A case study is a long read and a bar that
 * followed the reader down 4000px of it would be earning nothing; scrolling
 * away is the feature. Pages set their own top padding to clear it.
 */

type NavItem = {
  label: string;
  href: string;
  ready: boolean;
  /** Landing-page section id — scrolls instead of navigating when already home. */
  anchor?: string;
  /** Leaves the site, so it opens in a new tab. */
  external?: boolean;
  /**
   * Dropped below sm. The row only fits four labels between a wordmark and a
   * button down to about 375px, so something has to give — and the honest
   * thing to give is an anchor to a section further down the same page, which
   * a phone visitor reaches by scrolling anyway. External destinations and
   * other pages stay, because scrolling will not get you to those.
   */
  hideOnMobile?: boolean;
};

/* Resume is the same FlowCV link the footer carries — one URL, so a new
   revision is a one-line change and the two can never disagree. It sits after
   Work because that is the order a hiring manager reads in: the work first,
   then the credentials that back it. */
const LINKS: NavItem[] = [
  { label: "About", href: "/about", ready: true },
  { label: "Work", href: "/#projects", ready: true, anchor: "projects" },
  { label: "Resume", href: "https://flowcv.com/resume/4rqffng202tj", ready: true, external: true },
  { label: "Playground", href: "/#playground", ready: true, anchor: "playground", hideOnMobile: true },
];

const LINKEDIN = "https://www.linkedin.com/in/aasthasingh1708";

/* One shared shape for links and coming-soon items, so the row's rhythm never
   depends on which of the two an item happens to be. px-[10px] keeps ~20px of
   air between labels while letting the hover wash sit a little wider than the
   word — a target you can hit, not a box you have to aim at. */
const ITEM =
  "rounded-[8px] px-[10px] py-[6px] text-[15px] leading-[20px] tracking-[-0.01em] " +
  "transition-colors duration-200 max-lg:px-[8px] max-lg:text-[13px] max-sm:px-[6px]";

export default function Nav() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

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
      {/* Full-bleed row, 60px from each edge (Figma frame 394:1269). From md up
          the outer columns are 1fr, so the link cluster is centred on the PAGE
          rather than on whatever is left over between the wordmark and the
          button — which is the difference between a masthead and a toolbar.

          Below md that same rule breaks the row: equal 1fr columns have to be
          as wide as the widest end, so a 137px button forces a 137px gutter on
          the left too and the whole thing overflows a phone. There, the links
          simply sit between the two ends instead. Nobody reads a 375px row as
          "centred" anyway; they read it as three things that fit.

          And at 375 they only just fit: wordmark, three labels and the button
          come to ~367 of the 375 available once the sm overrides here and on
          ITEM tighten the gutter, the gaps and the label padding. That is the
          width this row is designed against — anything added to it needs to
          earn its place by pushing something else out. */}
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between gap-3 px-gutter py-[28px] md:grid md:grid-cols-[1fr_auto_1fr] max-lg:px-5 max-lg:py-5 max-sm:gap-1.5 max-sm:px-4"
      >
        {/* The "AS" wordmark, painted as a mask (see .logo-wordmark). 30 tall:
            this is type, so it is set against the links rather than sized like
            an icon — a hair above their cap height, which reads as a masthead
            initial and not as a logo tile parked in the corner. Width follows
            from the artwork's proportions, so the caller sets one number. */}
        <div className="justify-self-start">
          <Link
            href="/"
            data-cursor="quiet"
            aria-label="Aastha Singh — home"
            className="block transition-opacity duration-200 hover:opacity-60"
          >
            <span
              aria-hidden
              className="logo-wordmark block aspect-[160/124] h-[30px] w-auto max-lg:h-[26px]"
            />
          </Link>
        </div>

        <ul className="flex items-center gap-[2px] justify-self-center">
          {/* Items render in order; the coming-soon ones hide themselves below
              sm rather than being filtered here, so the list stays one source of
              truth for what the site contains. */}
          {LINKS.map((item) => {
            // Anchor items live on the landing page, so they never own a route.
            const current = item.ready && !item.anchor && pathname.startsWith(item.href);

            return (
              <li key={item.label} className={!item.ready || item.hideOnMobile ? "max-sm:hidden" : undefined}>
                {item.ready ? (
                  /* "quiet", not "snap" and not the default. Snap hands the
                     cursor this element's bounding box, and the cursor is a
                     white disc under mix-blend-difference — over paper that
                     inverts to a solid black plate behind the label. The
                     default for any <a> is barely better: a 36px disc that
                     lands on the word as a black blob. Quiet keeps it at its
                     resting dot and lets the grey wash be the hover state. */
                  <Link
                    href={item.href}
                    data-cursor="quiet"
                    aria-current={current ? "page" : undefined}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noreferrer noopener" : undefined}
                    onClick={item.anchor ? scrollToAnchor(item.anchor) : undefined}
                    className={`${ITEM} ${
                      current ? "text-black" : "text-ink-muted"
                    } hover:bg-black/[0.05] hover:text-black`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  /* Unbuilt pages stay in the row — the roadmap is part of the
                     story — but they don't take the hover wash, because a
                     surface that lights up promises somewhere to go. The cursor
                     label is what explains them.

                     Below sm they drop out entirely (see hideOnMobile). Four
                     labels between a wordmark and a button on a 375px screen
                     leaves nothing but labels, and an item you can't open is
                     the first that should go — there is no hover on a phone to
                     tell you why it doesn't respond. */
                  <span
                    data-cursor="label"
                    data-cursor-text="Coming soon"
                    aria-disabled="true"
                    className={`${ITEM} block cursor-default text-ink-muted/60 hover:text-ink-muted`}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        {/* The only action in the row, so it is the only thing carrying colour
            and weight. Ink pill on paper — the same black this site already
            uses for the Kora CTA and the scroll-to-top button — which is also
            what lets the specular rim read: a white travelling highlight needs
            a dark object to travel on. */}
        <div className="justify-self-end">
          <SpecularButton
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer noopener"
            /* Same reason as the links: the pill lights its own rim, and a
               36px disc inverted to white over black ink would sit straight on
               the label. */
            data-cursor="quiet"
            /* Tighter and brighter than the component's defaults. Those are set
               for a large hero button; at 38px tall the streak has very little
               border to travel, so a 40-degree falloff smears it into a general
               glow. 26 keeps it a highlight with a start and an end. */
            intensity={1.35}
            shineFade={26}
            thickness={1.1}
            /* Tailwind's utilities layer outranks the components layer where
               .specular-button lives, so these override its padding with no
               importance flag. */
            className="max-lg:px-[16px] max-lg:py-[10px] max-lg:text-[13px] max-sm:px-[14px] max-sm:py-[9px] max-sm:text-[12px]"
          >
            Let&rsquo;s connect!
          </SpecularButton>
        </div>
      </nav>
    </motion.header>
  );
}
