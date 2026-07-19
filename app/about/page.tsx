import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import CollageItem from "@/components/collage/CollageItem";
import CommunityCard from "@/components/about/CommunityCard";
import FavouritesCarousel from "@/components/about/FavouritesCarousel";
import { ABOUT_PHOTOS } from "@/lib/collage-about";
import { COMMUNITIES } from "@/lib/about";

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
          <Nav />

          {/* Hero */}
          <div className="absolute left-[120px] top-[180px] flex flex-col items-start gap-[8px]">
            <h1 className="font-wordmark text-[72px] text-black">hi, I am aastha</h1>
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
            <h2 className="w-full text-[16px] uppercase text-ink-muted">my communities</h2>
            <div className="flex w-full items-center justify-between">
              {COMMUNITIES.map((c) => (
                <CommunityCard key={c.title} community={c} />
              ))}
            </div>
          </div>

          {/* Favourite things */}
          <div className="absolute left-[119px] top-[1642px] w-[1200px]">
            <FavouritesCarousel />
          </div>

          <div
            aria-hidden
            className="absolute inset-x-0"
            style={{
              top: 2137,
              height: 560,
              background: "linear-gradient(180deg, #f5f5f5 22%, rgba(240,239,234,0.55) 100%)",
            }}
          />
          <div className="absolute left-[122px] top-[2228px] w-[1195px]">
            <PostcardFooter />
          </div>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
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

        <div className="px-5 pb-16">
          <PostcardFooter />
        </div>
      </div>
    </main>
  );
}
