/**
 * About page content — Figma frame 546:4978 ("Final version" / "About page").
 *
 * The August 2026 design cut the communities cards, the experience rows and
 * the polaroid collage: the page is now the window + bio block, the favourites
 * shelf, and the footer. Their data has gone with them.
 */

/** ---------------------------------------------------------------------
 *  The macOS photo window (Figma 561:340). Order is filmstrip order; the
 *  first is what the window opens on.
 *
 *  Intrinsic dimensions are recorded because the viewer shows every photo at
 *  its true aspect ratio — portrait stays portrait, nothing is cropped to a
 *  common frame — so the layout has to know each shape up front rather than
 *  discovering it after load.
 *  ------------------------------------------------------------------- */
export type WindowPhoto = { src: string; alt: string; width: number; height: number };

export const WINDOW_PHOTOS: WindowPhoto[] = [
  { src: "/assets/about/final/window-1.webp", width: 1200, height: 1600, alt: "Me at the water's edge at sunset, arms thrown up in the surf" },
  { src: "/assets/about/final/window-2.webp", width: 840, height: 975, alt: "Me as a kid in a denim pinafore, on a balcony full of plants" },
  { src: "/assets/about/final/window-3.webp", width: 1200, height: 1600, alt: "A misty monsoon morning, bare trees along a wet road" },
  { src: "/assets/about/final/window-4.webp", width: 1200, height: 1600, alt: "Me mid-slurp over a bowl of ramen" },
  { src: "/assets/about/final/window-5.webp", width: 900, height: 1600, alt: "The Eiffel Tower lit up at night" },
  { src: "/assets/about/final/window-6.webp", width: 852, height: 604, alt: "A meme about explaining that UX isn't graphic design" },
];

/** The viewer's photo area (Figma 561:353). Photos are fitted inside this box,
 *  never cropped to it, so the box is a bound rather than a frame. */
export const PHOTO_AREA = { width: 338, height: 297 } as const;

/** ---------------------------------------------------------------------
 *  Bio (Figma 561:352). Rendered through <BionicText>, so this stays a
 *  single plain string — the weight split is computed, not authored.
 *  ------------------------------------------------------------------- */
export const ABOUT_BIO =
  "Raised around the world, I love sunset, beaches and books. I am a designer, problem solver, and a people person at heart. I have completed my graduation from IIIT-D and am currently working as an experience design professional at Them. I enjoy understanding people, their needs, challenges, and quirks, and turning those insights into intuitive, inclusive, and visually delightful designs. I believe good design should feel like second nature, effortless, user-friendly, and just right.";

/** The three placement lines under the bio (Figma 565:429). The emoji render
 *  as Apple artwork via <Emoji> so they look the same on every platform. */
export const ABOUT_PLACES = [
  { emoji: "🏡", label: "Home", text: "Delhi, India" },
  { emoji: "🏢", label: "Work", text: "Them Pvt. Ltd, Gurugram" },
  { emoji: "🏫", label: "College", text: "Indraprastha Institute of Information Technology, Delhi" },
];

/** ---------------------------------------------------------------------
 *  "some of my favourite things" — a category carousel: Books → Movies →
 *  Shows → Anime → Albums.
 *
 *  August 2026 shrank the shelf (Figma 565:393): covers went 217x293 →
 *  165x223, album sleeves 311x216 → 236x164. The four portrait tilts repeat
 *  across categories on purpose — the shelf keeps its shape while its
 *  contents change.
 *  ------------------------------------------------------------------- */
export type FavouriteItem = { title: string; author?: string; cover?: string; rotate?: number };
export type FavouriteCategory = {
  id: string;
  label: string;
  /** portrait = book/film covers; wide = album sleeves. */
  kind: "portrait" | "wide";
  items: FavouriteItem[];
};

/** Cover geometry, straight from the frame. CSS-positive (clockwise) = the
 *  negated Figma rotations. */
export const COVER = {
  portrait: { width: 165, height: 223, gap: 56 },
  wide: { width: 236, height: 164, gap: 48 },
} as const;

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
      { title: "The Medium", cover: "/assets/about/medium.webp", rotate: TILT[0] },
      { title: "The Pursuit of Happyness", cover: "/assets/about/pursuitofhappieness.webp", rotate: TILT[1] },
      { title: "Jab We Met", cover: "/assets/about/jabwemet.webp", rotate: TILT[2] },
      { title: "How to Lose a Guy in 10 Days", cover: "/assets/about/htlagi10d.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "shows",
    label: "Shows",
    kind: "portrait",
    items: [
      { title: "Modern Family", cover: "/assets/about/modernfamily.webp", rotate: TILT[0] },
      { title: "Interview with the Vampire", cover: "/assets/about/iwtv.webp", rotate: TILT[1] },
      { title: "The First Frost", cover: "/assets/about/firstfrost.webp", rotate: TILT[2] },
      { title: "Brooklyn Nine Nine", cover: "/assets/about/brooklyn99.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "anime",
    label: "Anime",
    kind: "portrait",
    items: [
      { title: "Naruto", cover: "/assets/about/naruto.webp", rotate: TILT[0] },
      { title: "Fruits Basket", cover: "/assets/about/fruitsbasket.webp", rotate: TILT[1] },
      { title: "Haikyuu", cover: "/assets/about/haikyuu.webp", rotate: TILT[2] },
      { title: "Spy x Family", cover: "/assets/about/spyxfamily.webp", rotate: TILT[3] },
    ],
  },
  {
    id: "albums",
    label: "Albums",
    kind: "wide",
    items: [
      { title: "Sept 5th", author: "DVSN", cover: "/assets/about/sept5th.webp" },
      { title: "Fatal Love", author: "MONSTA X", cover: "/assets/about/fatallove.webp" },
      { title: "Mind of Mine", author: "Zayn Malik", cover: "/assets/about/mindofmine.webp" },
    ],
  },
];
