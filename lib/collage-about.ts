import type { CollageItem } from "./collage";

/**
 * About hero photo wall — geometry from Figma frame 265:3190, then scaled to
 * 82% around the wall's top-right corner (1419, 83). At full size the photos
 * crowded the bio column; the scale-down keeps the composition identical but
 * gives the text clear air (leftmost photo now starts at ~678 vs 515, well
 * past the 664px right edge of the bio).
 */
const S = 0.82;
const AX = 1419;
const AY = 83;
const scaled = (left: number, top: number, width: number, height: number) => ({
  left: Math.round((AX - (AX - left) * S) * 10) / 10,
  top: Math.round((AY + (top - AY) * S) * 10) / 10,
  width: Math.round(width * S * 10) / 10,
  height: Math.round(height * S * 10) / 10,
});

export const ABOUT_PHOTOS: CollageItem[] = [
  {
    id: "clipboard",
    src: "/assets/about/polaroid-clipboard.webp",
    alt: "Browsing a shop full of antiques",
    box: scaled(941, 83, 478, 788),
    depth: 0.5,
  },
  {
    id: "childhood",
    src: "/assets/about/polaroid-childhood.webp",
    alt: "Childhood photo",
    box: scaled(791, 190, 277, 327),
    depth: 0.9,
  },
  {
    id: "friend",
    src: "/assets/about/polaroid-friend.webp",
    alt: "On a scooter with a friend",
    box: scaled(515, 373, 337.896, 274.53),
    depth: 1.1,
  },
  {
    id: "dog",
    src: "/assets/about/polaroid-dog.webp",
    alt: "Sitting with a dog",
    box: scaled(822, 459, 238.75, 258.22),
    depth: 0.8,
  },
  {
    id: "scenery",
    src: "/assets/about/polaroid-scenery.webp",
    alt: "A tree by the water",
    box: scaled(619, 597, 234.256, 275.382),
    depth: 1,
  },
];
