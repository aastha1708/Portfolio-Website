/**
 * Hero collage — exact geometry from Figma group 310:1093.
 *
 * The group sits at (10, 81) inside the 1440x3657 landing frame and measures
 * 1420 x 806. Every object below is verbatim from Figma: `box` is the
 * post-rotation bounding box, `inner` is the unrotated element, and `crop`
 * reproduces Figma's image-fill offset (percentages of `inner`).
 *
 * Editing the collage means editing this file — nothing else.
 */

export const HERO_GROUP = { left: 10, top: 81, width: 1420, height: 806 } as const;

export type Crop = { left: number; top: number; width: number; height: number };

export type CollageItem = {
  id: string;
  src: string;
  alt: string;
  box: { left: number; top: number; width: number; height: number };
  /** Unrotated inner size. Omit when the object isn't rotated. */
  inner?: { width: number; height: number };
  rotate?: number;
  /** Figma image-fill crop, as % of `inner`. Omit for object-cover fills. */
  crop?: Crop;
  cover?: boolean;
  /** Cursor label on hover. */
  cursor?: string;
  href?: string;
  /** Continuous idle motion (Figma note: "little movement"). */
  idle?: boolean;
  /** Planned richer interaction, not yet implemented. */
  planned?: string;
};

export const HERO_ITEMS: CollageItem[] = [
  {
    id: "gingham",
    src: "/assets/landing/ghingham-paper.webp",
    alt: "",
    box: { left: 1086, top: 47, width: 334, height: 269 },
    crop: { left: -164.35, top: -43.47, width: 284.41, height: 440.49 },
  },
  {
    id: "claude",
    src: "/assets/landing/claude-logo.webp",
    alt: "Claude",
    box: { left: 338, top: 436, width: 128, height: 128 },
    crop: { left: 9.41, top: 9.38, width: 81.18, height: 81.24 },
    cursor: "Open",
    href: "https://claude.ai",
  },
  {
    id: "dry-flower",
    src: "/assets/landing/dry-flower.webp",
    alt: "",
    box: { left: 273, top: 116, width: 165.655, height: 168.969 },
    inner: { width: 114.901, height: 126.605 },
    rotate: 33.45,
    crop: { left: -8.46, top: -12.85, width: 269.22, height: 305.41 },
  },
  {
    id: "figma",
    src: "/assets/landing/figma-logo.webp",
    alt: "Figma",
    box: { left: 1056, top: 431, width: 86, height: 86 },
    crop: { left: 21.88, top: 7.81, width: 56.24, height: 84.38 },
    cursor: "Open",
    href: "https://figma.com",
  },
  {
    id: "polaroid-beach",
    src: "/assets/landing/polaroid-beach.webp",
    alt: "Polaroid photo taken at the beach",
    box: { left: 34, top: 210, width: 243, height: 254 },
    crop: { left: -87.68, top: -133.73, width: 284.96, height: 340.91 },
    cursor: "long time no sea",
  },
  {
    id: "paperclip",
    src: "/assets/landing/pin.webp",
    alt: "",
    box: { left: 57, top: 186, width: 66.28, height: 95.278 },
    inner: { width: 55.725, height: 89.09 },
    rotate: -7.08,
    crop: { left: -292.19, top: -37.07, width: 679.37, height: 531.18 },
  },
  {
    id: "postcard",
    src: "/assets/landing/polaroid-postcard.webp",
    alt: "Postcard and polaroids",
    box: { left: 971, top: 15, width: 421, height: 527 },
    cover: true,
    cursor: "open it",
    planned: "the postcard opens up",
  },
  {
    id: "daisy",
    src: "/assets/landing/daisy.webp",
    alt: "",
    box: { left: 1182, top: 355, width: 178.79, height: 186.076 },
    inner: { width: 172.143, height: 179.719 },
    rotate: -2.16,
    crop: { left: -217.15, top: -219.48, width: 529.88, height: 634.43 },
    idle: true,
  },
  {
    id: "coffee",
    src: "/assets/landing/coffee.webp",
    alt: "Iced coffee",
    box: { left: 1154, top: 290, width: 143, height: 239 },
    crop: { left: -130.45, top: -185.45, width: 389.56, height: 290.78 },
    cursor: "listen",
    planned: "coffee sound ice",
  },
  {
    id: "pinterest",
    src: "/assets/landing/pinterest-logo.webp",
    alt: "Pinterest",
    box: { left: 878.09, top: 30.66, width: 92.651, height: 92.651 },
    inner: { width: 76.166, height: 76.166 },
    rotate: -14.33,
    cursor: "Open",
    href: "https://pinterest.com",
  },
  {
    id: "notion",
    src: "/assets/landing/notion-logo.webp",
    alt: "Notion",
    box: { left: 50, top: 661, width: 128, height: 128 },
    crop: { left: 25.78, top: 28.12, width: 42.07, height: 43.33 },
    cursor: "Open",
    href: "https://notion.so",
  },
  {
    id: "orchid",
    src: "/assets/landing/orchid.webp",
    alt: "",
    box: { left: 0, top: 398, width: 257, height: 241 },
    crop: { left: -28.47, top: -55.43, width: 159.29, height: 212.6 },
  },
  {
    id: "seashell",
    src: "/assets/landing/seashell.webp",
    alt: "",
    box: { left: 181, top: 226, width: 247.294, height: 203.292 },
    inner: { width: 139.285, height: 212.593 },
    rotate: -70.11,
    crop: { left: -350.26, top: -14.8, width: 464.74, height: 380.6 },
  },
  {
    id: "airpods",
    src: "/assets/landing/airpods.webp",
    alt: "",
    box: { left: 188, top: 116, width: 181, height: 181 },
    crop: { left: 0.07, top: -173.4, width: 347.27, height: 434.08 },
  },
  {
    id: "spotify",
    src: "/assets/landing/spotify-logo.webp",
    alt: "Spotify",
    box: { left: 1261, top: 614, width: 72, height: 72 },
    cover: true,
    cursor: "now playing",
    href: "https://spotify.com",
    planned: "on hover shows my profile and what im listening to",
  },
  {
    id: "camera",
    src: "/assets/landing/camera.webp",
    alt: "Point-and-shoot camera",
    box: { left: 110, top: 502, width: 356, height: 267 },
    cover: true,
    cursor: "say cheese",
    planned:
      "lens faces the visitor; clicking 'takes' their photo and files it in the visitor gallery",
  },
  {
    id: "book",
    src: "/assets/landing/kite-runner-book.webp",
    alt: "The Kite Runner",
    box: { left: 78, top: 297, width: 365.19, height: 322.785 },
    inner: { width: 316, height: 260 },
    rotate: -12.63,
    crop: { left: -8.32, top: -8.84, width: 187.18, height: 284.21 },
    cursor: "flip a page",
    planned: "flip the page of the book and show my fav quote from it",
  },
  {
    id: "antigravity",
    src: "/assets/landing/antigravity-logo.webp",
    alt: "Antigravity",
    box: { left: 369, top: 8.49, width: 76.963, height: 76.963 },
    cover: true,
    cursor: "Open",
    href: "https://antigravity.google",
  },
];
