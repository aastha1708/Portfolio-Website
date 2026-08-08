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
    image: "/assets/landing/kora-thumbnail.webp",
  },
  {
    id: "digital-gold",
    title: "Revamping Digital Gold",
    year: "2026",
    description:
      "Revamped first-time buy, SIP and sell journeys— met with great feedback from the product team.",
    tags: ["Redesign", "Bootcamp"],
    image: "/assets/landing/digital-gold-thumbnail-poster.webp",
    video: "/assets/landing/digital-gold-thumbnail.mp4",
  },
  {
    id: "credit-card-onboarding",
    title: "Onboarding Journey",
    year: "2026",
    description:
      "Shipped a smoother credit card application flow. Led to fewer drop-offs at essential KYC step.",
    tags: ["Internship", "Shipped"],
    image: "/assets/landing/cc-onboarding-thumbnail-poster.webp",
    video: "/assets/landing/cc-onboarding-thumbnail.mp4",
  },
  {
    id: "sahayak",
    title: "Sahayak",
    year: "2025",
    description:
      "An accessible smartphone user interface for elderly and low-literacy users using voice modality, and AI support.",
    tags: ["Side project"],
    image: "/assets/landing/final/sahayak-new-banner.webp",
  },
];
