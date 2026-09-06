/**
 * Hero collage — geometry from Figma frame 538:4602 "Landing page"
 * (page "Final version", August 2026 revision).
 *
 * The keepsakes survived the redesign but shrank by roughly a third, and the
 * postmark and yellow flower were dropped: eight objects, not ten. Smaller
 * stickers leave the heading room to be the loudest thing on the page, which
 * it wasn't before.
 *
 * ARRAY ORDER IS PAINT ORDER (bottom → top), taken 1:1 from the Figma layer
 * stack — the peel canvas draws in this order too, so it still holds.
 *
 * `box` is each object's UNROTATED footprint, derived from its Figma centre
 * (absoluteBoundingBox mid-point) rather than its x/y, because Figma reports
 * the rotated origin and CSS rotates about the centre — using x/y directly
 * would drift the tilted objects by up to ~30px.
 *
 * `rotate` is CSS-positive (clockwise) = negated Figma rotation.
 *
 * `peel` is which edge lifts under the cursor, degrees clockwise from the top.
 * Each one points away from the middle of the page, so a flap folds out over
 * empty margin rather than over the heading.
 *
 * Moving an object = editing one line here.
 *
 * ---------------------------------------------------------------------------
 * SEPTEMBER 2026 — RE-PLACED FOR THE VIEWPORT, NOT THE ARTBOARD
 *
 * The Figma arrangement packed four of the eight into the top 200px and left
 * everything under y=690 empty. On the artboard that is a composition; in a
 * ~780px browser window it is a crowded top and a bare bottom.
 *
 * They now sit in four tiers spanning the whole first screen, alternating which
 * side leads so it reads as scattered rather than as a grid:
 *
 *   ~110   cloud (left of centre)      polaroid (right of centre)   high, small
 *   ~250   flower (far left)           camera (far right)           upper flanks
 *   ~500   heart (left)                latte (right)                beside the meta line
 *   ~690   cat (left)                  headphones (right)           anchoring the fold
 *
 * Two rules held the whole time. Nothing enters the type's box (x 455-985,
 * y 240-540) — the keepsakes frame the heading, they never crowd it. And the
 * heavy objects (camera, latte, headphones, cat) are spread across both sides
 * and both halves rather than stacked, so no corner outweighs another; the
 * pink flower carries more optical weight than its size, which is what lets the
 * lighter left side hold against the camera and the cup.
 *
 * The latte staying on the right is deliberate: it lands just past the end of
 * "drinking coffee" in the meta line.
 *
 * `peel` was recomputed for every object — it is the angle from the page centre
 * outward, so each flap still folds over empty margin rather than over the type.
 * Alternatives tried and rejected: an even ellipse (mechanical), camera moved
 * left (a dark mass immediately under the wordmark, fighting it), and latte
 * moved left (evens the mass, but strands the heart alone on the right and
 * loses the coffee adjacency).
 *
 * ---------------------------------------------------------------------------
 * September 2026: the keepsakes became peelable stickers, which needed a white
 * die-cut border to read as vinyl rather than curling photographs — see
 * scripts/die-cut-stickers.mjs. The boxes below stay exactly as Figma reports
 * them so a re-sync doesn't fight this file; DIE_CUT_BLEED is added on the way
 * out, which is also why the srcs point at the /die-cut/ variants.
 */

import type { CollageItem } from "./collage";

/**
 * The hero's field, in page coordinates. top is 0 again: the 40px lift that
 * used to live here is now baked into each box below, because the keepsakes
 * were re-placed anyway and one coordinate system beats two.
 */
export const HERO_GROUP = { left: 0, top: 0, width: 1440, height: 899 } as const;

/**
 * Deal-out origin: the centre of the heading block, which the keepsakes open
 * out from on load. Group-local, but the group now sits at top 0, so this is
 * simply the heading's page position — 267 plus half its 246 height. Keep it in
 * step with the heading's `top` in HeroCollage or the stickers will appear to
 * come from somewhere other than behind the type.
 */
export const HERO_CENTER = { x: 720, y: 390 } as const;

/** Half-width of the die-cut border, in canvas px. Must match BORDER_PX in
 *  scripts/die-cut-stickers.mjs — the border is drawn OUTSIDE the artwork, so
 *  every footprint grows by this much on all four sides. */
export const DIE_CUT_BLEED = 5;

const SRC = "/assets/landing/new-ver/die-cut";

type Raw = Omit<CollageItem, "src"> & { file: string };

const RAW: Raw[] = [
  /* ---- bottom of the stack ---- */
  {
    id: "camera",
    file: "55-1.webp",
    alt: "Film camera",
    box: { left: 1208.0, top: 209.0, width: 116, height: 102 },
    peel: 77,
  },
  {
    id: "flower-pink",
    file: "55-2.webp",
    alt: "",
    box: { left: 80.1, top: 211.6, width: 91.8, height: 80.8 },
    peel: 283,
    rotate: -2.7,
  },
  {
    id: "cloud",
    file: "55-3.webp",
    alt: "",
    box: { left: 317.5, top: 109.5, width: 81, height: 65 },
    peel: 304,
  },
  {
    id: "headphones",
    file: "55-4.webp",
    alt: "Headphones",
    box: { left: 1042.3, top: 622.8, width: 131.3, height: 126.4 },
    peel: 127,
    rotate: 21.3,
  },
  {
    id: "latte",
    file: "55-5.webp",
    alt: "Latte with heart art",
    box: { left: 1196.5, top: 482.0, width: 111, height: 108 },
    peel: 105,
  },
  {
    id: "cat",
    file: "56-1.webp",
    alt: "Milo the cat",
    box: { left: 260.5, top: 634.0, width: 115, height: 120 },
    peel: 233,
  },
  {
    id: "polaroid-beach",
    file: "56-2.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 978.3, top: 100.2, width: 87.4, height: 91.5 },
    peel: 51,
    rotate: -11.4,
  },
  /* ---- top of the stack ---- */
  {
    id: "heart",
    file: "56-3.webp",
    alt: "",
    box: { left: 153.8, top: 465.1, width: 76.3, height: 79.9 },
    peel: 258,
    rotate: -10.1,
  },
];

export const HERO_ITEMS: CollageItem[] = RAW.map(({ file, box, ...rest }) => ({
  ...rest,
  src: `${SRC}/${file}`,
  box: {
    left: box.left - DIE_CUT_BLEED,
    top: box.top - DIE_CUT_BLEED,
    width: box.width + DIE_CUT_BLEED * 2,
    height: box.height + DIE_CUT_BLEED * 2,
  },
}));
