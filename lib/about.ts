import type { Community } from "@/components/about/CommunityCard";

export const COMMUNITIES: Community[] = [
  {
    title: "Coordinator at GirlUp",
    body: "From managing socials to coordinating this UN-founded club for the empowerment of women and marginalised groups. It's where I learned to grow.",
    photo: "/assets/about/girlup.webp",
    logoSize: 58,
  },
  {
    title: "Design Lead at Sports Council",
    body: "Design lead for my college sports council, turning Canva into a real tool for jerseys, social posts and event identity.",
    photo: "/assets/about/sports-council.webp",
    logoSize: 27,
  },
  {
    title: "Volleyball & Football team",
    body: "All work and no play makes for dull design. Playing midfield for my college team is the best kind of break.",
    photo: "/assets/about/football-team.webp",
    logoSize: 28,
  },
];

/**
 * "some of my favourite things" is a category carousel, not a book carousel:
 * Books -> Movies -> Shows -> Songs. Only Books is designed so far; the rest
 * are placeholders that render the same card shape.
 */
export type FavouriteItem = { title: string; author: string; cover?: string };
export type FavouriteCategory = { id: string; label: string; items: FavouriteItem[] };

export const FAVOURITES: FavouriteCategory[] = [
  {
    id: "books",
    label: "Books",
    items: [
      { title: "Six of Crows", author: "Leigh Bardugo", cover: "/assets/about/soc-book.webp" },
      { title: "The Cruel Prince", author: "Holly Black", cover: "/assets/about/tcp-book.webp" },
      { title: "The Palace of Illusions", author: "Chitra Banerjee Divakaruni", cover: "/assets/about/tpoi-book.webp" },
      { title: "The Jasad Heir", author: "Sara Hashem", cover: "/assets/about/tjh-book.webp" },
    ],
  },
  { id: "movies", label: "Movies", items: [] },
  { id: "shows", label: "Shows", items: [] },
  { id: "songs", label: "Songs", items: [] },
];
