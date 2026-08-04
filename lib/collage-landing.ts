/**
 * Hero collage — geometry from Figma frame 394:1126 "FINAL_VERSION"
 * (August 2026 revision).
 *
 * The redesign swapped the logo-heavy desk for pure keepsakes: pressed
 * flowers, a film camera, the beach polaroid, headphones, a latte, Milo the
 * cat. No links — every sticker is now a loose object the visitor can pick
 * up and drag around the desk (see CollageItem's drag support).
 *
 * ARRAY ORDER IS PAINT ORDER (bottom → top), taken 1:1 from the Figma layer
 * stack. DOM order does the layering, so no z-index juggling.
 *
 * Each `box` is the object's visual footprint on the 1440 canvas.
 * Moving an object = editing one line here.
 */

import type { CollageItem } from "./collage";

export const HERO_GROUP = { left: 0, top: 0, width: 1440, height: 960 } as const;

/** Deal-out origin: the wordmark's optical centre. Stickers open up from
 *  here to their resting spots when the hero first comes into view. */
export const HERO_CENTER = { x: 720, y: 430 } as const;

export const HERO_ITEMS: CollageItem[] = [
  /* ---- bottom of the stack ---- */
  {
    id: "camera",
    src: "/assets/landing/new-ver/55-1.webp",
    alt: "Film camera",
    box: { left: 1204, top: 215, width: 174, height: 153 },
    cursor: "say cheese",
    depth: 1,
  },
  {
    id: "flower-pink",
    src: "/assets/landing/new-ver/55-2.webp",
    alt: "",
    box: { left: 58, top: 101, width: 121, height: 107 },
    cursor: "pressed & kept",
    idle: true,
    depth: 1.3,
  },
  {
    id: "cloud",
    src: "/assets/landing/new-ver/55-3.webp",
    alt: "",
    box: { left: 362, top: 236, width: 106, height: 85 },
    cursor: "head in the clouds",
    idle: true,
    depth: 1.2,
  },
  {
    id: "headphones",
    src: "/assets/landing/new-ver/55-4.webp",
    alt: "Headphones",
    box: { left: 1002, top: 597, width: 223.616, height: 219.886 },
    cursor: "on loop",
    depth: 0.8,
  },
  {
    id: "latte",
    src: "/assets/landing/new-ver/55-5.webp",
    alt: "Latte with heart art",
    box: { left: 1174, top: 446, width: 139.442, height: 135.722 },
    cursor: "my fuel",
    depth: 1.2,
  },
  {
    id: "cat",
    src: "/assets/landing/new-ver/56-1.webp",
    alt: "Milo the cat",
    box: { left: 182, top: 660, width: 163, height: 171 },
    cursor: "milo",
    depth: 0.9,
  },
  {
    id: "polaroid-beach",
    src: "/assets/landing/new-ver/56-2.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 905, top: 140.206, width: 193.573, height: 199.835 },
    cursor: "long time no sea",
    depth: 0.7,
  },
  {
    id: "heart",
    src: "/assets/landing/new-ver/56-3.webp",
    alt: "",
    box: { left: 106, top: 362.967, width: 133.081, height: 137.128 },
    cursor: "made with love",
    depth: 1.1,
  },
  {
    id: "postmark",
    src: "/assets/landing/new-ver/56-4.webp",
    alt: "",
    box: { left: 239, top: 471, width: 161, height: 86 },
    cursor: "sent with love",
    depth: 0.6,
  },
  /* ---- top of the stack ---- */
  {
    id: "flower-yellow",
    src: "/assets/landing/new-ver/how-to-become-a-content-creator-(6).webp",
    alt: "",
    box: { left: 1250, top: 672.534, width: 125.034, height: 130.128 },
    cursor: "picked fresh",
    idle: true,
    depth: 1.4,
  },
];
