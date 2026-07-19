import type { CollageItem } from "./collage-landing";

/**
 * About hero photo wall — geometry from Figma frame 265:3190.
 * Same approach as the landing collage: each box matches its asset's aspect
 * ratio, so the files are placed directly.
 */
export const ABOUT_PHOTOS: CollageItem[] = [
  {
    id: "clipboard",
    src: "/assets/about/polaroid-clipboard.webp",
    alt: "Browsing a shop full of antiques",
    box: { left: 941, top: 83, width: 478, height: 788 },
    depth: 0.5,
  },
  {
    id: "childhood",
    src: "/assets/about/polaroid-childhood.webp",
    alt: "Childhood photo",
    box: { left: 791, top: 190, width: 277, height: 327 },
    depth: 0.9,
  },
  {
    id: "friend",
    src: "/assets/about/polaroid-friend.webp",
    alt: "On a scooter with a friend",
    box: { left: 515, top: 373, width: 337.896, height: 274.53 },
    depth: 1.1,
  },
  {
    id: "dog",
    src: "/assets/about/polaroid-dog.webp",
    alt: "Sitting with a dog",
    box: { left: 822, top: 459, width: 238.75, height: 258.22 },
    depth: 0.8,
  },
  {
    id: "scenery",
    src: "/assets/about/polaroid-scenery.webp",
    alt: "A tree by the water",
    box: { left: 619, top: 597, width: 234.256, height: 275.382 },
    depth: 1,
  },
];
