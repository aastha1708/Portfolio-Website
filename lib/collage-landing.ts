/**
 * Hero collage — geometry from Figma group 310:1093.
 *
 * ARRAY ORDER IS PAINT ORDER (bottom → top), taken 1:1 from the Figma layer
 * stack. DOM order does the layering, so no z-index juggling: the daisy sits
 * behind the coffee, the camera/orchid/seashell behind the book, the seashell
 * in front of the beach polaroid, the airpods in front of it too, and the
 * dried flowers behind the airpods — exactly as composed in the file.
 *
 * Each `box` is the object's visual footprint on the 1440 canvas, cross-checked
 * against the source PNGs (see git history for the full derivation notes).
 * Moving an object = editing one line here.
 */

import type { CollageItem } from "./collage";

export const HERO_GROUP = { left: 10, top: 81, width: 1420, height: 806 } as const;

export const HERO_ITEMS: CollageItem[] = [
  /* ---- bottom of the stack ---- */
  {
    id: "gingham",
    src: "/assets/landing/ghingham-paper.webp",
    alt: "",
    box: { left: 1086, top: 47, width: 334, height: 269 },
    depth: 0.4,
  },
  {
    id: "claude",
    src: "/assets/landing/claude-logo.webp",
    alt: "Claude",
    box: { left: 338, top: 436, width: 128, height: 128 },
    pad: { x: 12, y: 12 },
    cursor: "Claude",
    href: "https://claude.ai",
    magnetic: 0.35,
    depth: 1.5,
  },
  {
    id: "dry-flower",
    src: "/assets/landing/dry-flower.webp",
    alt: "",
    box: { left: 273, top: 116, width: 165.655, height: 168.969 },
    cursor: "kept forever",
    depth: 1.1,
    idle: true,
  },
  {
    id: "figma",
    src: "/assets/landing/figma-logo.webp",
    alt: "Figma",
    box: { left: 1056, top: 431, width: 86, height: 86 },
    pad: { x: 18.8, y: 6.7 },
    cursor: "Figma",
    href: "https://figma.com",
    magnetic: 0.35,
    depth: 1.5,
  },
  {
    id: "polaroid-beach",
    src: "/assets/landing/polaroid-beach.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 34, top: 210, width: 243, height: 254 },
    cursor: "long time no sea",
    depth: 0.8,
  },
  {
    id: "paperclip",
    src: "/assets/landing/pin.webp",
    alt: "",
    box: { left: 57, top: 186, width: 66.28, height: 95.278 },
    depth: 0.5,
  },
  {
    id: "postcard",
    src: "/assets/landing/polaroid-postcard.webp",
    alt: "Postcard and polaroids",
    box: { left: 971, top: 15, width: 421, height: 527 },
    cursor: "open it",
    depth: 0.7,
    planned: "the postcard opens up; the cat polaroid ('milo') needs its own asset for a separate hover",
  },
  {
    id: "daisy",
    src: "/assets/landing/daisy.webp",
    alt: "",
    box: { left: 1182, top: 355, width: 178.79, height: 186.076 },
    cursor: "picked fresh",
    idle: true,
    depth: 1.3,
  },
  {
    id: "coffee",
    src: "/assets/landing/coffee.webp",
    alt: "Iced coffee",
    box: { left: 1154, top: 290, width: 143, height: 239 },
    cursor: "my fuel",
    depth: 1.2,
    planned: "coffee sound ice",
  },
  {
    id: "pinterest",
    src: "/assets/landing/pinterest-logo.webp",
    alt: "Pinterest",
    box: { left: 886, top: 39, width: 76.166, height: 76.166 },
    rotate: -14.33,
    cursor: "Pinterest",
    href: "https://pinterest.com",
    magnetic: 0.35,
    depth: 1.5,
  },
  {
    id: "notion",
    src: "/assets/landing/notion-logo.webp",
    alt: "Notion",
    box: { left: 50, top: 661, width: 128, height: 128 },
    pad: { x: 37, y: 36 },
    cursor: "Notion",
    href: "https://notion.so",
    magnetic: 0.35,
    depth: 1.5,
  },
  {
    id: "orchid",
    src: "/assets/landing/orchid.webp",
    alt: "",
    box: { left: 0, top: 398, width: 257, height: 241 },
    cursor: "in bloom",
    idle: true,
    depth: 0.6,
  },
  {
    id: "seashell",
    src: "/assets/landing/seashell.webp",
    alt: "",
    box: { left: 181, top: 226, width: 247.294, height: 203.292 },
    cursor: "hear the ocean",
    depth: 1,
  },
  {
    id: "airpods",
    src: "/assets/landing/airpods.webp",
    alt: "",
    box: { left: 188, top: 116, width: 181, height: 181 },
    cursor: "on repeat",
    depth: 0.9,
  },
  {
    id: "spotify",
    src: "/assets/landing/spotify-logo.webp",
    alt: "Spotify",
    box: { left: 1261, top: 614, width: 72, height: 72 },
    cursor: "now playing",
    href: "https://spotify.com",
    magnetic: 0.35,
    depth: 1.5,
    planned: "on hover shows my profile and what im listening to",
  },
  {
    id: "camera",
    src: "/assets/landing/camera.webp",
    alt: "Point-and-shoot camera",
    box: { left: 110, top: 502, width: 356, height: 267 },
    cursor: "say cheese",
    depth: 1,
    planned:
      "lens faces the visitor; clicking 'takes' their photo and files it in the visitor gallery",
  },
  {
    id: "book",
    src: "/assets/landing/kite-runner-book.webp",
    alt: "The Kite Runner",
    box: { left: 78, top: 297, width: 316, height: 260 },
    rotate: -12.63,
    cursor: "flip a page",
    depth: 0.9,
    planned: "flip the page of the book and show my fav quote from it",
  },
  /* ---- top of the stack ---- */
  {
    id: "antigravity",
    src: "/assets/landing/antigravity-logo.webp",
    alt: "Antigravity",
    box: { left: 369, top: 8.49, width: 76.963, height: 76.963 },
    cursor: "Antigravity",
    href: "https://antigravity.google",
    magnetic: 0.35,
    depth: 1.5,
  },
];
