import Image from "next/image";
import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import TornDivider from "@/components/layout/TornDivider";
import SectionHeading from "@/components/layout/SectionHeading";
import PostcardFooter from "@/components/layout/PostcardFooter";
import ProjectGrid from "@/components/work/ProjectGrid";
import HeroCollage from "@/components/collage/HeroCollage";

const PHILOSOPHY_CHIPS = [
  { label: "Craft Obsessed", left: 211, top: 1265 },
  { label: "Builds With AI", left: 1057, top: 1340 },
  { label: "Edge Case Hunter", left: 100, top: 1564 },
  { label: "Third Culture Kid", left: 1097, top: 1571 },
];

export default function LandingPage() {
  return (
    <main>
      {/* ---------- Desktop: the exact 1440 Figma composition ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={3657}>
          <Nav />
          <HeroCollage />

          <div className="absolute inset-x-0" style={{ top: 960 }}>
            <TornDivider />
          </div>

          {/* Philosophy */}
          <p
            className="absolute text-center text-[32px] font-medium leading-[47px] tracking-[0.08px] text-black"
            style={{ left: 291, top: 1100, width: 869 }}
          >
            I care about craft, how clearly things communicate, handle edge cases and build trust. I build with AI,
            prototyping ideas and exploring the{" "}
            <mark className="bg-[#eaf24c] text-black">edge of design and technology.</mark>
          </p>

          <div className="absolute" style={{ left: 535, top: 1241, width: 352, height: 440 }}>
            <Image src="/assets/landing/sticky-note-1.webp" alt="" fill sizes="352px" className="object-cover" />
            <p
              className="font-script absolute -translate-x-1/2 text-center text-[18px] leading-[28px] tracking-[0.9px] text-black/75"
              style={{ left: 175.5, top: 147, width: 211 }}
            >
              I turn ambiguity into clear product design direction and ship with cross-functional teams at speed.
            </p>
          </div>

          {PHILOSOPHY_CHIPS.map((chip) => (
            <span key={chip.label} className="chip absolute" style={{ left: chip.left, top: chip.top }}>
              [ {chip.label} ]
            </span>
          ))}

          <div className="absolute inset-x-0" style={{ top: 1747 }}>
            <TornDivider flip />
          </div>

          {/* Work */}
          <div className="absolute" style={{ left: 409, top: 1869, width: 655 }}>
            <SectionHeading
              title="my projects"
              subtitle="project that i designed with love— click on one to unfold the whole story"
            />
          </div>
          <div className="absolute" style={{ left: 58, top: 2034 }}>
            <ProjectGrid />
          </div>

          {/* Paper wash behind the footer (Figma Frame 78) */}
          <div
            aria-hidden
            className="absolute inset-x-0"
            style={{
              top: 3039,
              height: 813,
              background:
                "linear-gradient(180deg, #f5f5f5 22%, rgba(240,239,234,0.55) 100%)",
            }}
          />

          <div className="absolute" style={{ left: 122, top: 3212, width: 1195 }}>
            <PostcardFooter />
          </div>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <Nav />
        <HeroCollage variant="mobile" />
        <TornDivider />
        <section className="px-5 py-16">
          <p className="text-center text-[22px] font-medium leading-[34px] text-black">
            I care about craft, how clearly things communicate, handle edge cases and build trust. I build with AI,
            prototyping ideas and exploring the{" "}
            <mark className="bg-[#eaf24c] text-black">edge of design and technology.</mark>
          </p>
          <ul className="mt-10 flex flex-wrap justify-center gap-3">
            {PHILOSOPHY_CHIPS.map((chip) => (
              <li key={chip.label} className="chip text-[15px]">
                [ {chip.label} ]
              </li>
            ))}
          </ul>
          <div className="relative mx-auto mt-12 h-[440px] w-[352px] max-w-full">
            <Image src="/assets/landing/sticky-note-1.webp" alt="" fill sizes="352px" className="object-contain" />
            <p className="font-script absolute left-1/2 top-[147px] w-[211px] -translate-x-1/2 text-center text-[18px] leading-[28px] tracking-[0.9px] text-black/75">
              I turn ambiguity into clear product design direction and ship with cross-functional teams at speed.
            </p>
          </div>
        </section>
        <TornDivider flip />
        <section className="py-16">
          <SectionHeading
            title="my projects"
            subtitle="project that i designed with love— click on one to unfold the whole story"
            className="px-5 pb-12"
          />
          <ProjectGrid />
        </section>
        <div className="px-5 pb-16">
          <PostcardFooter />
        </div>
      </div>
    </main>
  );
}
