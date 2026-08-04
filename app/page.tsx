import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import SectionHeading from "@/components/layout/SectionHeading";
import PostcardFooter from "@/components/layout/PostcardFooter";
import ProjectGrid from "@/components/work/ProjectGrid";
import HeroCollage from "@/components/collage/HeroCollage";
import GridBackground, { LANDING_BANDS } from "@/components/layout/GridBackground";
import FooterField from "@/components/layout/FooterField";
import Reveal from "@/components/motion/Reveal";
import PopIn from "@/components/motion/PopIn";
import PlusReveal from "@/components/motion/PlusReveal";
import DotGridMouse from "@/components/motion/DotGridMouse";
import FooterMotion from "@/components/motion/FooterMotion";

const NOTE = "I turn ambiguity into clear product design direction and ship with cross-functional teams at speed.";

/* Dashed plus boxes + their spirograph reveals. Card offsets measured from
   the "Finalest version" canvas (boxes 445:.. → cards Frame 200/205/206/207).
   Spin durations are deliberately co-prime-ish so open boxes never sync. */
const PLUS_BOXES = [
  { left: 102, top: 1026, shape: "/assets/landing/new-ver/how-to-become-a-content-creator-(36)-1.webp", spin: 26, offset: { dx: 106, dy: -53 } },
  { left: 1250, top: 1071, shape: "/assets/landing/new-ver/new.webp", spin: 34, offset: { dx: -170, dy: -99 } },
  { left: 1199, top: 1469, shape: "/assets/landing/new-ver/new2.webp", spin: 22, offset: { dx: -168, dy: 8 } },
  { left: 192, top: 1469, shape: "/assets/landing/new-ver/new3.webp", spin: 30, offset: { dx: 107, dy: -39 } },
];

export default function LandingPage() {
  return (
    <main>
      {/* ---------- Desktop: the exact 1440 Figma composition ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={3657}>
          <GridBackground bands={LANDING_BANDS} />
          <Nav />
          <HeroCollage />

          {/* Note (Figma 414:2271) — the one-liner sits alone on ruled paper,
              flanked by the plus-box doodles. It settles in like a card being
              laid down; the boxes pop in staggered after it. */}
          <PopIn y={26} scale={0.97} rotate={-1.2} style={{ position: "absolute", left: 341, top: 1145, width: 787 }}>
            <div className="flex h-[240px] items-center justify-center border border-dashed border-black/20 bg-[#efede5] px-[92px]">
              <p className="font-script text-center text-[22px] leading-[48px] tracking-[0.5px] text-black/80">
                {NOTE}
              </p>
            </div>
          </PopIn>

          {PLUS_BOXES.map((box, i) => (
            <PopIn
              key={`${box.left}-${box.top}`}
              delay={0.15 + i * 0.08}
              y={12}
              scale={0.55}
              style={{ position: "absolute", left: box.left, top: box.top }}
            >
              <PlusReveal shape={box.shape} spinDuration={box.spin} offset={box.offset} />
            </PopIn>
          ))}

          {/* Work */}
          <div id="projects" data-section="projects" className="absolute" style={{ top: 1704 }} />
          <Reveal style={{ position: "absolute", left: 409, top: 1814, width: 655 }}>
            <SectionHeading
              title="my projects"
              subtitle="projects that i designed with love"
            />
          </Reveal>
          <div className="absolute" style={{ left: 58, top: 1944 }}>
            <ProjectGrid />
          </div>

          {/* Footer dot field — canvas twin of .bg-grid-dots that leans
              toward the cursor. */}
          <DotGridMouse fullBleed className="absolute" style={{ top: 3039, height: 618 }} />
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
        <section className="bg-grid-rules px-5 py-16">
          <PopIn y={22} scale={0.97} rotate={-1}>
            <div className="mx-auto flex max-w-[560px] items-center justify-center border border-dashed border-black/20 bg-[#efede5] px-8 py-10">
              <p className="font-script text-center text-[18px] leading-[36px] text-black/80">{NOTE}</p>
            </div>
          </PopIn>
          <div className="mt-10 flex flex-wrap items-start justify-center gap-6">
            {PLUS_BOXES.map((box, i) => (
              <PopIn key={box.shape} delay={0.1 + i * 0.08} y={10} scale={0.55}>
                {/* Compact offset: the card floats above the box on small screens. */}
                <PlusReveal shape={box.shape} spinDuration={box.spin} offset={{ dx: -36, dy: -145 }} />
              </PopIn>
            ))}
          </div>
        </section>
        <section data-section="projects" className="bg-grid-lines py-16">
          <Reveal>
            <SectionHeading
              title="my projects"
              subtitle="projects that i designed with love"
              className="px-5 pb-12"
            />
          </Reveal>
          <ProjectGrid />
        </section>
        <FooterField />
      </div>
    </main>
  );
}
