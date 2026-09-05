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
 * September 2026: the keepsakes became peelable stickers, which needed a white
 * die-cut border to read as vinyl rather than curling photographs — see
 * scripts/die-cut-stickers.mjs. The boxes below stay exactly as Figma reports
 * them so a re-sync doesn't fight this file; DIE_CUT_BLEED is added on the way
 * out, which is also why the srcs point at the /die-cut/ variants.
 */

import type { CollageItem } from "./collage";

export const HERO_GROUP = { left: 0, top: 0, width: 1440, height: 939 } as const;

/** Deal-out origin: the centre of the heading block (Figma 538:4721). The
 *  stickers open up from behind the type to their resting spots. */
export const HERO_CENTER = { x: 720, y: 420 } as const;

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
    box: { left: 1151, top: 236, width: 116, height: 102 },
    peel: 70,
  },
  {
    id: "flower-pink",
    file: "55-2.webp",
    alt: "",
    box: { left: 102.8, top: 153.1, width: 91.8, height: 80.8 },
    peel: 296,
    rotate: -2.7,
  },
  {
    id: "cloud",
    file: "55-3.webp",
    alt: "",
    box: { left: 345, top: 175, width: 81, height: 65 },
    peel: 308,
  },
  {
    id: "headphones",
    file: "55-4.webp",
    alt: "Headphones",
    box: { left: 1059.5, top: 584.5, width: 131.3, height: 126.4 },
    peel: 114,
    rotate: 21.3,
  },
  {
    id: "latte",
    file: "55-5.webp",
    alt: "Latte with heart art",
    box: { left: 1222, top: 445, width: 111, height: 108 },
    peel: 93,
  },
  {
    id: "cat",
    file: "56-1.webp",
    alt: "Milo the cat",
    box: { left: 239, top: 610, width: 115, height: 120 },
    peel: 245,
  },
  {
    id: "polaroid-beach",
    file: "56-2.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 941.2, top: 140.8, width: 87.4, height: 91.5 },
    peel: 43,
    rotate: -11.4,
  },
  /* ---- top of the stack ---- */
  {
    id: "heart",
    file: "56-3.webp",
    alt: "",
    box: { left: 157.5, top: 436.1, width: 76.3, height: 79.9 },
    peel: 271,
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
