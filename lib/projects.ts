export type Project = {
  id: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  /** Poster/still image. */
  image: string;
  /** Optional looping video that replaces the still. */
  video?: string;
  /** Desktop scatter geometry, straight from Figma FINAL_VERSION frame
   *  414:2699 (1324x983). The Aug 2026 revision straightened the cards
   *  (no rotation) and dropped the tape strips for a cleaner rounded look. */
  layout: {
    left: number;
    top: number;
    width: number;
    height: number;
    innerWidth: number;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "kora",
    title: "Kora",
    year: "2026",
    description:
      "A career exploration app focused on self-discovery of users. A career guide that understands you. Won 3rd place in India's first AI-focused designathon.",
    tags: ["Designathon", "Developed"],
    image: "/assets/landing/kora-thumbnail.webp",
    layout: { left: 0.27, top: 8.36, width: 713.739, height: 479.086, innerWidth: 713.739 },
  },
  {
    id: "digital-gold",
    title: "Digital Gold",
    year: "2026",
    description:
      "Revamped first-time buy, SIP and sell journeys— met with great feedback from the product team.",
    tags: ["Redesign"],
    image: "/assets/landing/digital-gold-thumbnail-poster.webp",
    video: "/assets/landing/digital-gold-thumbnail.mp4",
    layout: { left: 759.787, top: 0, width: 572.145, height: 455.876, innerWidth: 572.145 },
  },
  {
    id: "credit-card-onboarding",
    title: "Credit Card Onboarding",
    year: "2026",
    description:
      "Shipped a smoother credit card application flow. Led to fewer drop-offs at essential KYC step.",
    tags: ["Internship", "Shipped"],
    image: "/assets/landing/cc-onboarding-thumbnail-poster.webp",
    video: "/assets/landing/cc-onboarding-thumbnail.mp4",
    layout: { left: 8.928, top: 525, width: 635.619, height: 458.547, innerWidth: 635.619 },
  },
  {
    id: "sahayak",
    title: "Sahayak",
    year: "2025",
    description:
      "An accessible smartphone user interface for elderly and low-literacy users using voice modality, AI support and intuitive UI for essential tasks",
    tags: ["Side Project"],
    image: "/assets/landing/sahayak-thumbnail.webp",
    layout: { left: 669, top: 513.446, width: 655.191, height: 478.415, innerWidth: 655.191 },
  },
];
