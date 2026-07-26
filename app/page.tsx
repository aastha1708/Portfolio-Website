import Image from "next/image";
import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import TornDivider from "@/components/layout/TornDivider";
import SectionHeading from "@/components/layout/SectionHeading";
import PostcardFooter from "@/components/layout/PostcardFooter";
import ProjectGrid from "@/components/work/ProjectGrid";
import HeroCollage from "@/components/collage/HeroCollage";
import GridBackground, { LANDING_BANDS } from "@/components/layout/GridBackground";
import Reveal from "@/components/motion/Reveal";
import BounceChip from "@/components/motion/BounceChip";
import HighlightMark from "@/components/motion/HighlightMark";
import StickyNote from "@/components/motion/StickyNote";
import FooterMotion from "@/components/motion/FooterMotion";

const PHILOSOPHY_CHIPS = [
  { label: "Craft Obsessed", left: 211, top: 1265 },
  { label: "Builds With AI", left: 1057, top: 1340 },
  { label: "Edge Case Hunter", left: 100, top: 1564 },
  { label: "Third Culture Kid", left: 1097, top: 1571 },
];

const PHILOSOPHY = (
  <>
    I care about craft, how clearly things communicate, handle edge cases and build trust. I build with AI,
    prototyping ideas and exploring the <HighlightMark>edge of design and technology.</HighlightMark>
  </>
);

const NOTE = "I turn ambiguity into clear product design direction and ship with cross-functional teams at speed.";

export default function LandingPage() {
  return (
    <main>
      {/* ---------- Desktop: the exact 1440 Figma composition ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={3657}>
          <GridBackground bands={LANDING_BANDS} />
          <Nav />
          <HeroCollage />

          <div className="absolute inset-x-0" style={{ top: 960 }}>
            <TornDivider />
          </div>

          {/* Philosophy */}
          <Reveal style={{ position: "absolute", left: 291, top: 1100, width: 869 }}>
            <p className="text-center text-[32px] font-medium leading-[47px] tracking-[0.08px] text-black">
              {PHILOSOPHY}
            </p>
          </Reveal>

          <Reveal delay={0.08} style={{ position: "absolute", left: 535, top: 1241, width: 352, height: 440 }}>
            <StickyNote className="relative size-full">
              <Image src="/assets/landing/sticky-note-1.webp" alt="" fill sizes="352px" className="object-contain" />
              <p
                className="font-script absolute -translate-x-1/2 text-center text-[18px] leading-[28px] tracking-[0.9px] text-black/75"
                style={{ left: 175.5, top: 147, width: 211 }}
              >
                {NOTE}
              </p>
            </StickyNote>
          </Reveal>

          {PHILOSOPHY_CHIPS.map((chip, i) => (
            <Reveal key={chip.label} delay={0.1 + i * 0.06} y={12} style={{ position: "absolute", left: chip.left, top: chip.top }}>
              <BounceChip delay={i * 0.7}>[ {chip.label} ]</BounceChip>
            </Reveal>
          ))}

          <div className="absolute inset-x-0" style={{ top: 1747 }}>
            <TornDivider flip />
          </div>

          {/* Work */}
          <Reveal style={{ position: "absolute", left: 409, top: 1869, width: 655 }}>
            <SectionHeading
              title="my projects"
              subtitle="project that i designed with love— click on one to unfold the whole story"
            />
          </Reveal>
          <div className="absolute" style={{ left: 58, top: 2034 }}>
            <ProjectGrid />
          </div>

          <FooterMotion style={{ position: "absolute", left: 122, top: 3212, width: 1195 }}>
            <PostcardFooter />
          </FooterMotion>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div className="bg-grid-lines">
          <Nav />
          <HeroCollage variant="mobile" />
        </div>
        <TornDivider />
        <section className="bg-grid-rules px-5 py-16">
          <Reveal>
            <p className="text-center text-[22px] font-medium leading-[34px] text-black">{PHILOSOPHY}</p>
          </Reveal>
          <Reveal delay={0.06}>
            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {PHILOSOPHY_CHIPS.map((chip, i) => (
                <li key={chip.label}>
                  <BounceChip className="text-[15px]" delay={i * 0.7}>
                    [ {chip.label} ]
                  </BounceChip>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <StickyNote className="relative mx-auto mt-12 h-[440px] w-[352px] max-w-full">
              <Image src="/assets/landing/sticky-note-1.webp" alt="" fill sizes="352px" className="object-contain" />
              <p className="font-script absolute left-1/2 top-[147px] w-[211px] -translate-x-1/2 text-center text-[18px] leading-[28px] tracking-[0.9px] text-black/75">
                {NOTE}
              </p>
            </StickyNote>
          </Reveal>
        </section>
        <TornDivider flip />
        <section className="bg-grid-lines py-16">
          <Reveal>
            <SectionHeading
              title="my projects"
              subtitle="project that i designed with love— click on one to unfold the whole story"
              className="px-5 pb-12"
            />
          </Reveal>
          <ProjectGrid />
        </section>
        <div className="bg-grid-dots px-5 py-16">
          <FooterMotion>
            <PostcardFooter />
          </FooterMotion>
        </div>
      </div>
    </main>
  );
}
