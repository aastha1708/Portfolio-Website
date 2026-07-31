import type { Community } from "@/components/about/CommunityCard";

export const COMMUNITIES: Community[] = [
  {
    title: "Coordinator at GirlUp",
    body: "From managing socials to coordinating this UN-founded club for the empowerment of women and marginalised groups. It's where I learned to grow.",
    photo: "/assets/about/girlup.webp",
    logo: "/assets/about/girlup-logo.webp",
    logoSize: 58,
  },
  {
    title: "Design Lead at Sports Council",
    body: "Design lead for my college sports council, turning Canva into a real tool for jerseys, social posts and event identity.",
    photo: "/assets/about/sports-council.webp",
    logo: "/assets/about/sports-council-logo.webp",
    logoSize: 27,
  },
  {
    title: "Volleyball & Football team",
    body: "All work and no play makes for dull design. Playing midfield for my college team is the best kind of break.",
    photo: "/assets/about/football-team.webp",
    logo: "/assets/about/football-logo.webp",
    logoSize: 28,
  },
];

/** Experience rows under the bio (Figma 330:432) — replaced the old chips. */
export type Experience = { logo: string; title: string; role: string; year: string };

export const EXPERIENCE: Experience[] = [
  {
    logo: "/assets/about/them-logo.webp",
    title: "Them Consulting Ltd · Gurugram, India",
    role: "Experience Design Professional",
    year: "2026",
  },
  {
    logo: "/assets/about/iiitd-logo.webp",
    title: "IIIT-D · Delhi, India",
    role: "Computer Science",
    year: "2022 - 2026",
  },
];

/**
 * "some of my favourite things" — a category carousel: Books → Movies →
 * Shows → Anime → Albums. All five categories are designed now (Figma frames
 * 273:3768, 327:138, 327:175, 330:305, 327:212).
 *
 * The four portrait rotations repeat across categories on purpose — the
 * shelf keeps its shape while its contents change.
 */
export type FavouriteItem = { title: string; author?: string; cover?: string; rotate?: number };
export type FavouriteCategory = {
  id: string;
  label: string;
  /** portrait = 217x293 covers; wide = 311x216 album sleeves. */
  kind: "portrait" | "wide";
  items: FavouriteItem[];
};

const TILT = [3.31, -2.33, 0.47, -5.28];

export const FAVOURITES: FavouriteCategory[] = [
  {
    id: "books",
    label: "Books",
    kind: "portrait",
    items: [
      { title: "Six of Crows", author: "Leigh Bardugo", cover: "/assets/about/soc-book.webp", rotate: TILT[0] },
      { title: "The Cruel Prince", author: "Holly Black", cover: "/assets/about/tcp-book.webp", rotate: TILT[1] },
      { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", cover: "/assets/about/tpoi-book.webp", rotate: TILT[2] },
      { title: "The Jasad Heir", author: "Sara Hashem", cover: "/assets/about/tjh-book.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "movies",
    label: "Movies",
    kind: "portrait",
    items: [
      { title: "The Medium", cover: "/assets/about/movie-the-medium.webp", rotate: TILT[0] },
      { title: "The Pursuit of Happyness", cover: "/assets/about/movie-pursuit.webp", rotate: TILT[1] },
      { title: "Jab We Met", cover: "/assets/about/movie-jab-we-met.webp", rotate: TILT[2] },
      { title: "How to Lose a Guy in 10 Days", cover: "/assets/about/movie-htlagi10d.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "shows",
    label: "Shows",
    kind: "portrait",
    items: [
      { title: "Modern Family", cover: "/assets/about/show-modern-family.webp", rotate: TILT[0] },
      { title: "Interview with the Vampire", cover: "/assets/about/show-iwtv.webp", rotate: TILT[1] },
      { title: "The First Frost", cover: "/assets/about/show-first-frost.webp", rotate: TILT[2] },
      { title: "Brooklyn Nine Nine", cover: "/assets/about/show-b99.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    kind: "portrait",
    items: [
      { title: "Naruto", cover: "/assets/about/anime-naruto.webp", rotate: TILT[0] },
      { title: "Fruits Basket", cover: "/assets/about/anime-fruits-basket.webp", rotate: TILT[1] },
      { title: "Haikyuu", cover: "/assets/about/anime-haikyuu.webp", rotate: TILT[2] },
      { title: "Spy x Family", cover: "/assets/about/anime-spy-x-family.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "albums",
    label: "Albums",
    kind: "wide",
    items: [
      { title: "Sept 5th", author: "DVSN", cover: "/assets/about/album-sept-5th.webp" },
      { title: "Fatal Love", author: "MONSTA X", cover: "/assets/about/album-fatal-love.webp" },
      { title: "Mind of Mine", author: "Zayn Malik", cover: "/assets/about/album-mind-of-mine.webp" },
    ],
  },
];
