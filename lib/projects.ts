export type Project = {
  /** URL slug — kept stable across redesigns so shared links keep working. */
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  /** Poster/still image. */
  image: string;
  /** Optional looping video that replaces the still. */
  video?: string;
  /**
   * Designed, not yet written up. The card renders inert — no link, no hover
   * lift — and says "coming soon" through the cursor instead. Sending a
   * hiring manager to an empty case study is worse than telling them it isn't
   * ready; this way the work still shows and the promise stays honest.
   */
  comingSoon?: boolean;
};

/**
 * Copy, tags and media from Figma frame 569:566 (page "Final version").
 *
 * The August 2026 design dropped the scattered collage of cards for an even
 * 2x2 grid, so per-project geometry no longer lives here — ProjectGrid derives
 * every position from the index. Array order is grid order: row-major, top-left
 * first.
 */
export const PROJECTS: Project[] = [
  {
    id: "kora",
    title: "Kora",
    year: "2026",
    description:
      "A career exploration app focused on self-discovery of users. Won 3rd place in India's first AI-focused designathon.",
    tags: ["Designathon", "Developed"],
    image: "/assets/landing/final/kora-thumbnail.webp",
  },
  {
    id: "design-system",
    title: "Design System",
    year: "2026",
    description:
      "Built high-quality Figma components with variables for faster project setup and maintenance.",
    tags: ["Atomic DS", "Tokenization"],
    image: "/assets/landing/final/design-system-thumbnail.webp",
    comingSoon: true,
  },
  {
    id: "sahayak",
    title: "Sahayak",
    year: "2025",
    description:
      "An accessible smartphone user interface for elderly and low-literacy users using voice modality, and AI support.",
    tags: ["Side Project"],
    image: "/assets/landing/final/sahayak-thumbnail.webp",
    comingSoon: true,
  },
  {
    id: "dyslexiar",
    title: "DyslexiAR",
    year: "2024",
    description:
      "An AR learning tool using game-like phonics practice to make dyslexia assessment less stressful for children.",
    tags: ["Augmented Reality"],
    image: "/assets/landing/final/dyslexiar-thumbnail.webp",
  },
];
