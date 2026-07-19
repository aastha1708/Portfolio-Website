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
  /** Desktop scatter geometry, straight from Figma (frame 246:2575, 1324x983). */
  layout: {
    left: number;
    top: number;
    width: number;
    height: number;
    rotate: number;
    innerWidth: number;
    /** Tape strip offset relative to card centre. */
    tape: { dx: number; top: number; rotate: number } | null;
  };
};

export const PROJECTS: Project[] = [
  {
    id: "kora",
    title: "Kora",
    year: "2026",
    description:
      "A career exploration app focused on self- discovery of users. A career guide that understands you. Won 3rd place in India's first AI-focused desginathon.",
    tags: ["Designathon", "Developed"],
    image: "/assets/landing/kora-thumbnail.webp",
    layout: {
      left: 0.27, top: 0.24, width: 713.739, height: 479.086, rotate: -0.66,
      innerWidth: 708.389, tape: { dx: 2.06, top: -33.66, rotate: -5.09 },
    },
  },
  {
    id: "digital-gold",
    title: "Digital Gold",
    year: "2026",
    description:
      "Revamped first-time buy, SIP and sell journeys— met with great feedback from the product team.",
    tags: ["Redesign"],
    image: "/assets/landing/digital-gold-poster.webp",
    video: "/assets/landing/digital-gold.mp4",
    layout: {
      left: 752, top: 0, width: 572.145, height: 455.876, rotate: 1,
      innerWidth: 564.446, tape: { dx: 395.85 - 286, top: -31, rotate: 6.92 },
    },
  },
  {
    id: "credit-card-onboarding",
    title: "Credit Card Onboarding",
    year: "2026",
    description:
      "Shipped a smoother credit card application flow. Led to fewer drop-offs at essential KYC step.",
    tags: ["Internship", "Shipped"],
    image: "/assets/landing/cc-onboarding-poster.webp",
    video: "/assets/landing/cc-onboarding.mp4",
    layout: {
      left: 0, top: 525, width: 635.619, height: 458.547, rotate: 1.15,
      innerWidth: 626.817, tape: { dx: -3.43, top: -40.13, rotate: 5.92 },
    },
  },
  {
    id: "sahayak",
    title: "Sahayak",
    year: "2025",
    description:
      "An accessible smartphone user interface for elderly and low-literacy users using voice modality, AI support and intuitive UI for essential tasks",
    tags: ["Side Project"],
    image: "/assets/landing/sahayak-thumbnail.webp",
    layout: {
      left: 669, top: 506, width: 655.191, height: 478.415, rotate: -0.66,
      innerWidth: 601.837 + 48, tape: { dx: 9.74, top: -45.99, rotate: -5.09 },
    },
  },
];
