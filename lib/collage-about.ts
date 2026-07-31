import type { CollageItem } from "./collage";

/**
 * About hero photo wall — geometry from Figma frame 330:342 (July 2026
 * revision). The tall clipboard photo is gone; the wall is now four photos
 * in a tighter cluster that sits beside the bio instead of crowding it, so
 * the old 82% scale-down hack is no longer needed — these are raw Figma
 * coordinates on the 1440 canvas.
 *
 * Rotated items: Figma reports the rotated bounding box, so each `box` here
 * is the UNROTATED footprint recovered from the bbox centre, with `rotate`
 * applied by CollageItem.
 */
export const ABOUT_PHOTOS: CollageItem[] = [
  {
    id: "childhood",
    src: "/assets/about/polaroid-childhood.webp",
    alt: "Childhood photo",
    box: { left: 967, top: 120, width: 277, height: 327 },
    depth: 0.9,
  },
  {
    id: "dog",
    src: "/assets/about/polaroid-dog.webp",
    alt: "Sitting with a dog",
    box: { left: 1011.6, top: 383.5, width: 235.512, height: 255.235 },
    rotate: 0.73,
    depth: 0.8,
  },
  {
    id: "scenery",
    src: "/assets/about/polaroid-scenery.webp",
    alt: "A tree by the water",
    box: { left: 832.6, top: 412.4, width: 230.799, height: 272.459 },
    rotate: 12.93,
    depth: 1,
  },
  {
    id: "friend",
    src: "/assets/about/polaroid-friend.webp",
    alt: "On a scooter with a friend",
    box: { left: 732.5, top: 237.3, width: 314.882, height: 244.002 },
    rotate: -5.79,
    depth: 1.1,
  },
];
