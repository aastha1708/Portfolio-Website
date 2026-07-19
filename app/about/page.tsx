import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import CollageItem from "@/components/collage/CollageItem";
import CommunityCard from "@/components/about/CommunityCard";
import FavouritesCarousel from "@/components/about/FavouritesCarousel";
import { ABOUT_PHOTOS } from "@/lib/collage-about";
import { COMMUNITIES } from "@/lib/about";
import GridBackground, { ABOUT_BANDS } from "@/components/layout/GridBackground";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

export const metadata = {
  title: "About — Aastha Singh",
  description:
    "I grew up around the world from India to Oman to Italy. Currently an experience design professional at Them.",
};

const BIO = [
  "I grew up around the world from India to Oman to Italy. I am currently an experience design professional at Them.",
  "I started off designing in my first semester of my BTech degree and have been love with it ever since.",
];
const TAGS = ["Them · XDP", "IIIT-D · CS"];

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Desktop ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={2697}>
          <GridBackground bands={ABOUT_BANDS} />
          <Nav />

          {/* Hero */}
          <div className="absolute left-[120px] top-[180px] flex flex-col items-start gap-[8px]">
            <h1 className="font-wordmark text-[72px] text-black">
              <SplitText text="hi, I am aastha" delay={0.15} />
            </h1>
            <div className="flex flex-col gap-[32px] text-[22px] font-medium text-[#404040]">
              <p className="w-[544px]">{BIO[0]}</p>
              <p className="w-[399px]">{BIO[1]}</p>
            </div>
          </div>

          <div className="absolute left-[121px] top-[480px] flex items-center gap-[28px]">
            {TAGS.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="absolute inset-0">
            {ABOUT_PHOTOS.map((photo, i) => (
              <CollageItem key={photo.id} item={photo} index={i} />
            ))}
          </div>

          {/* Communities */}
          <div className="absolute left-[119px] top-[994px] flex w-[1200px] flex-col items-start gap-[67px]">
            <Reveal className="w-full">
              <h2 className="w-full text-[16px] uppercase text-ink-muted">my communities</h2>
            </Reveal>
            <div className="flex w-full items-center justify-between">
              {COMMUNITIES.map((c, i) => (
                <Reveal key={c.title} delay={i * 0.08}>
                  <CommunityCard community={c} />
                </Reveal>
              ))}
            </div>
          </div>

          {/* Favourite things */}
          <Reveal style={{ position: "absolute", left: 119, top: 1642, width: 1200 }}>
            <FavouritesCarousel />
          </Reveal>

          <Reveal style={{ position: "absolute", left: 122, top: 2228, width: 1195 }}>
            <PostcardFooter />
          </Reveal>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div className="bg-grid-lines">
        <Nav />
        <section className="px-5 pb-12 pt-28">
          <h1 className="font-wordmark text-[44px] leading-[52px] text-black">hi, I am aastha</h1>
          <div className="mt-6 flex flex-col gap-6 text-[17px] font-medium leading-[26px] text-[#404040]">
            {BIO.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {TAGS.map((tag) => (
              <span key={tag} className="chip text-[15px]">
                {tag}
              </span>
            ))}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3">
            {ABOUT_PHOTOS.map((photo) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={photo.id}
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                className="w-full rounded-[2px] object-cover shadow-paper first:col-span-2"
              />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-8 px-5 py-12">
          <h2 className="text-[15px] uppercase text-ink-muted">my communities</h2>
          {COMMUNITIES.map((c) => (
            <CommunityCard key={c.title} community={c} />
          ))}
        </section>

        <section className="px-5 py-12">
          <FavouritesCarousel />
        </section>
        </div>

        <div className="bg-grid-dots px-5 pb-16 pt-8">
          <PostcardFooter />
        </div>
      </div>
    </main>
  );
}
