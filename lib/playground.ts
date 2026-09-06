/**
 * Playground — "Record of my curiosity", Figma frame 700:6549 on
 * "Landing page 6/9/26".
 *
 * The seven experiments, laid out on a canvas that is wider than the window
 * that shows it. Every number below is the Figma value, measured relative to
 * the 1228 x 639 viewport ("Demo video holder"), so a re-sync from the file is
 * a straight comparison rather than a translation.
 *
 * `box` is the artwork; the caption sits directly under it at `captionTop`,
 * which is Figma's own offset rather than a computed gap — the cards are hand
 * placed and their captions are not all the same distance down.
 *
 * ORDER IS PAINT ORDER, and it is deliberate: the two cards that overlap
 * their neighbours (gyde over iceback, resdump over gesture-graph) are drawn
 * after them, which is what the frame shows.
 *
 * NOTE ON CARD 2. The Figma caption on the gyde card still reads "ARTS /
 * Prototyped an AR Sandbox…" — a copy-paste from card 3 that was never
 * updated. The artwork is unmistakably the travel app, so the copy here is
 * gyde's, per Aastha's own list.
 */

export type PlaygroundItem = {
  id: string;
  title: string;
  description: string;
  src: string;
  alt: string;
  /** Artwork box, in canvas coordinates. */
  box: { left: number; top: number; width: number; height: number };
  /** Top of the caption block, relative to the card's own origin. */
  captionTop: number;
  /**
   * How near the card sits, and the whole basis of the parallax. 1 is the
   * plane of the canvas; above 1 is nearer the viewer and travels faster,
   * below 1 is further away and lags. Assigned by size rather than at random —
   * the big cards read as close and the small ones as distant, so the depth
   * agrees with what the eye already assumes from scale.
   */
  depth: number;
};

/** The window the canvas is seen through — Figma 700:6551. */
export const CANVAS_VIEWPORT = { width: 1228, height: 639 } as const;

/**
 * The repeating tile.
 *
 * This is what makes the canvas infinite. The cards are laid out once inside a
 * tile of this size, and the tile repeats in both axes forever; pan far enough
 * in any direction and you arrive back at the same seven, which is exactly what
 * the reference component does.
 *
 * WHY THIS SIZE. The tile has to be at least as large as the content, or a card
 * overlaps its own copy: the cards occupy 30 → 1217 across (1187) and -6 → 707
 * down (713). Rounding up to 1320 x 800 leaves ~130 and ~90 of gutter between
 * the last card of one tile and the first of the next, which reads as the same
 * kind of spacing that already exists between cards — so the seam is invisible
 * and you cannot tell where one repetition ends.
 *
 * The reference sets its tile to the window size, which it can because its cards
 * are authored to fit one screen. Ours are Aastha's composition, and it is
 * taller than the window it is seen through.
 */
export const CANVAS_TILE = { width: 1320, height: 800 } as const;

const SRC = "/assets/landing/playground";

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    id: "iceback",
    title: "Iceback Mastercard",
    description: "Designed a conversation-focused landing page for IceBack for both mobile + web.",
    src: `${SRC}/iceback.webp`,
    alt: "The IceBack Mastercard landing page on a laptop, with an iridescent card render",
    box: { left: 30, top: 76, width: 218, height: 224 },
    captionTop: 240,
    depth: 1.06,
  },
  {
    id: "arts",
    title: "ARTS",
    description: "Prototyped an AR Sandbox as an urban design tool with GenAI.",
    src: `${SRC}/arts.webp`,
    alt: "An AR sandbox scene: coloured blocks arranged as buildings on a white plane",
    box: { left: 353, top: -6, width: 176, height: 167 },
    captionTop: 183,
    depth: 0.9,
  },
  {
    id: "phobia-vr",
    title: "Phobia VR",
    description: "Designed a VR game for phobia simulation for multiple phobia for exposure therapy.",
    src: `${SRC}/phobia-vr.webp`,
    alt: "A dim room in the VR game, a wooden chair and a spider on the floor",
    box: { left: 774, top: 40, width: 222, height: 229 },
    captionTop: 245,
    depth: 1.02,
  },
  {
    id: "gesture-graph",
    title: "Gesture Graph",
    description: "Experimented with this MR game using shadow graphs.",
    src: `${SRC}/gesture-graph.webp`,
    alt: "Playing the mixed-reality game in a headset, hand raised to cast a shadow",
    box: { left: 1060, top: 148, width: 157, height: 169 },
    captionTop: 185,
    depth: 0.88,
  },
  {
    id: "last-coach",
    title: "The Last Coach",
    description: "Freelanced a website for a fitness coaching business and its branding.",
    src: `${SRC}/last-coach.webp`,
    alt: "The Last Coach website, its wordmark set large over a dark hero",
    box: { left: 595, top: 351, width: 223, height: 126 },
    captionTop: 142,
    depth: 0.94,
  },
  {
    id: "gyde",
    title: "Gyde",
    description: "Designed a prototype focusing on interaction design for a travel app.",
    src: `${SRC}/gyde.webp`,
    alt: "Two phones showing the Gyde travel app: a home feed and a mountain destination",
    box: { left: 183, top: 338, width: 276, height: 305 },
    captionTop: 321,
    depth: 1.14,
  },
  {
    id: "resdump",
    title: "Resdump",
    description: "Vibe-coded an app to help job seeking individuals tailor their resume to each JD.",
    src: `${SRC}/resdump.webp`,
    alt: "The résumé dump wordmark, white on a black tile",
    box: { left: 889, top: 280, width: 271, height: 280 },
    captionTop: 296,
    depth: 1.1,
  },
];
