import type { CollageItem } from "./collage-landing";

/**
 * About hero photo wall — exact geometry from Figma frame 265:3190.
 *
 * In Figma these five are crops of a single composite image; here each is its
 * own file placed in the same box, which is equivalent visually and far lighter.
 */
export const ABOUT_PHOTOS: CollageItem[] = [
  {
    id: "clipboard",
    src: "/assets/about/polaroid-clipboard.webp",
    alt: "Browsing a shop full of antiques",
    box: { left: 941, top: 83, width: 478, height: 788 },
    cover: true,
  },
  {
    id: "childhood",
    src: "/assets/about/polaroid-childhood.webp",
    alt: "Childhood photo",
    box: { left: 791, top: 190, width: 277, height: 327 },
    cover: true,
  },
  {
    id: "friend",
    src: "/assets/about/polaroid-friend.webp",
    alt: "On a scooter with a friend",
    box: { left: 515, top: 373, width: 337.896, height: 274.53 },
    inner: { width: 314.882, height: 244.002 },
    rotate: -5.79,
    cover: true,
  },
  {
    id: "dog",
    src: "/assets/about/polaroid-dog.webp",
    alt: "Sitting with a dog",
    box: { left: 822, top: 459, width: 238.75, height: 258.22 },
    inner: { width: 235.512, height: 255.235 },
    rotate: 0.73,
    cover: true,
  },
  {
    id: "scenery",
    src: "/assets/about/polaroid-scenery.webp",
    alt: "A tree by the water",
    box: { left: 619, top: 597, width: 234.256, height: 275.382 },
    inner: { width: 230.799, height: 272.459 },
    rotate: 0.73,
    cover: true,
  },
];
