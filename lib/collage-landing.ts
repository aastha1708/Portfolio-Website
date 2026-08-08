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
 * stack. DOM order does the layering, so no z-index juggling.
 *
 * `box` is each object's UNROTATED footprint, derived from its Figma centre
 * (absoluteBoundingBox mid-point) rather than its x/y, because Figma reports
 * the rotated origin and CSS rotates about the centre — using x/y directly
 * would drift the tilted objects by up to ~30px.
 *
 * `rotate` is CSS-positive (clockwise) = negated Figma rotation.
 *
 * Moving an object = editing one line here.
 */

import type { CollageItem } from "./collage";

export const HERO_GROUP = { left: 0, top: 0, width: 1440, height: 939 } as const;

/** Deal-out origin: the centre of the heading block (Figma 538:4721). The
 *  stickers open up from behind the type to their resting spots. */
export const HERO_CENTER = { x: 720, y: 420 } as const;

export const HERO_ITEMS: CollageItem[] = [
  /* ---- bottom of the stack ---- */
  {
    id: "camera",
    src: "/assets/landing/new-ver/55-1.webp",
    alt: "Film camera",
    box: { left: 1151, top: 236, width: 116, height: 102 },
    cursor: "say cheese",
    depth: 1,
  },
  {
    id: "flower-pink",
    src: "/assets/landing/new-ver/55-2.webp",
    alt: "",
    box: { left: 102.8, top: 153.1, width: 91.8, height: 80.8 },
    rotate: -2.7,
    cursor: "pressed & kept",
    idle: true,
    depth: 1.3,
  },
  {
    id: "cloud",
    src: "/assets/landing/new-ver/55-3.webp",
    alt: "",
    box: { left: 345, top: 175, width: 81, height: 65 },
    cursor: "head in the clouds",
    idle: true,
    depth: 1.2,
  },
  {
    id: "headphones",
    src: "/assets/landing/new-ver/55-4.webp",
    alt: "Headphones",
    box: { left: 1059.5, top: 584.5, width: 131.3, height: 126.4 },
    rotate: 21.3,
    cursor: "on loop",
    depth: 0.8,
  },
  {
    id: "latte",
    src: "/assets/landing/new-ver/55-5.webp",
    alt: "Latte with heart art",
    box: { left: 1222, top: 445, width: 111, height: 108 },
    cursor: "my fuel",
    depth: 1.2,
  },
  {
    id: "cat",
    src: "/assets/landing/new-ver/56-1.webp",
    alt: "Milo the cat",
    box: { left: 239, top: 610, width: 115, height: 120 },
    cursor: "milo",
    depth: 0.9,
  },
  {
    id: "polaroid-beach",
    src: "/assets/landing/new-ver/56-2.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 941.2, top: 140.8, width: 87.4, height: 91.5 },
    rotate: -11.4,
    cursor: "long time no sea",
    depth: 0.7,
  },
  /* ---- top of the stack ---- */
  {
    id: "heart",
    src: "/assets/landing/new-ver/56-3.webp",
    alt: "",
    box: { left: 157.5, top: 436.1, width: 76.3, height: 79.9 },
    rotate: -10.1,
    cursor: "made with love",
    depth: 1.1,
  },
];
