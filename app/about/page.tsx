import Image from "next/image";
import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import CollageItem from "@/components/collage/CollageItem";
import CommunityCard from "@/components/about/CommunityCard";
import FavouritesCarousel from "@/components/about/FavouritesCarousel";
import { ABOUT_PHOTOS } from "@/lib/collage-about";
import { COMMUNITIES, EXPERIENCE, type Experience } from "@/lib/about";
import GridBackground, { ABOUT_BANDS } from "@/components/layout/GridBackground";
import FooterField from "@/components/layout/FooterField";
import DotGridMouse from "@/components/motion/DotGridMouse";
import Reveal from "@/components/motion/Reveal";
import FooterMotion from "@/components/motion/FooterMotion";

export const metadata = {
  title: "About — Aastha Singh",
  description:
    "I grew up around the world from India to Oman to Italy. Currently an experience design professional at Them.",
};

const BIO = [
  "I grew up around the world from India to Oman to Italy. I am currently an experience design professional at Them.",
  "I started off designing in my first semester of my BTech degree and have been in love with it ever since.",
];

/** Experience row (Figma 330:393) — logo tile, serif title, quiet role line,
    handwritten year. Replaced the old chips. */
function ExperienceRow({ item }: { item: Experience }) {
  return (
    <div className="flex flex-col items-start overflow-clip rounded-[12px] bg-[#f0efea] py-[10px] pl-[12px] pr-[16px]">
      <div className="flex w-full items-start justify-between gap-6 lg:w-[472px]">
        <div className="flex min-w-0 flex-1 items-center gap-[10px]">
          <span className="relative size-[42px] shrink-0 overflow-hidden rounded-[12px] bg-white">
            <Image src={item.logo} alt="" fill sizes="42px" className="object-contain" />
          </span>
          <span className="flex min-w-0 flex-col justify-center gap-[4px]">
            <span className="truncate font-serif text-[18px] font-medium tracking-[-0.408px] text-black">
              {item.title}
            </span>
            <span className="text-[14px] text-ink-muted">{item.role}</span>
          </span>
        </div>
        <span className="font-script shrink-0 whitespace-nowrap text-[18px] leading-[22px] tracking-[-0.408px] text-ink-muted">
          {item.year}
        </span>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Desktop ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={2525}>
          <GridBackground bands={ABOUT_BANDS} />
          <Nav />

          {/* Hero (Figma 335:460) */}
          <div className="absolute left-[121px] top-[120px] flex flex-col items-start gap-[8px]">
            <Reveal immediate>
              <h1 className="font-display text-[56px] leading-[96px] tracking-[-1.68px] text-black">
                hi, I am aastha
              </h1>
            </Reveal>
            <div className="flex flex-col gap-[22px] text-[22px] leading-[26px] text-[#404040]">
              <Reveal immediate delay={0.05}>
                <p className="w-[544px]">{BIO[0]}</p>
              </Reveal>
              <Reveal immediate delay={0.1}>
                <p className="w-[543px]">{BIO[1]}</p>
              </Reveal>
            </div>
            <div className="mt-[34px] flex flex-col gap-[14px]">
              {EXPERIENCE.map((item, i) => (
                <Reveal immediate key={item.title} delay={0.15 + i * 0.06}>
                  <ExperienceRow item={item} />
                </Reveal>
              ))}
            </div>
          </div>

          <div className="absolute inset-0">
            {ABOUT_PHOTOS.map((photo, i) => (
              <CollageItem key={photo.id} item={photo} index={i} />
            ))}
          </div>

          {/* Communities (Figma 273:3767) */}
          <div className="absolute left-[119px] top-[804px] flex w-[1200px] flex-col items-start gap-[67px]">
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

          {/* Favourite things (Figma 273:3768) */}
          <Reveal style={{ position: "absolute", left: 119, top: 1413, width: 1200 }}>
            <FavouritesCarousel />
          </Reveal>

          {/* Footer dot field — canvas twin of .bg-grid-dots that leans
              toward the cursor, same as the landing page. */}
          <DotGridMouse fullBleed className="absolute" style={{ top: 1965, height: 560 }} />
          <FooterMotion style={{ position: "absolute", left: 122, top: 2056, width: 1195 }}>
            <PostcardFooter />
          </FooterMotion>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div className="bg-grid-lines">
        <Nav />
        <section className="px-5 pb-12 pt-28">
          <h1 className="font-display text-[38px] leading-[48px] tracking-[-1.1px] text-black">hi, I am aastha</h1>
          <div className="mt-6 flex flex-col gap-6 text-[17px] leading-[26px] text-[#404040]">
            {BIO.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-[14px]">
            {EXPERIENCE.map((item) => (
              <ExperienceRow key={item.title} item={item} />
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

        <FooterField />
      </div>
    </main>
  );
}
