import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import HowIWork from "@/components/layout/HowIWork";
import ProjectGrid from "@/components/work/ProjectGrid";
import PlaygroundCanvas, { PlaygroundStrip } from "@/components/work/PlaygroundCanvas";
import SectionLabel from "@/components/layout/SectionLabel";
import HeroCollage from "@/components/collage/HeroCollage";
import SwashText from "@/components/layout/SwashText";
import GridBackground, { LANDING_BANDS } from "@/components/layout/GridBackground";
import FooterField from "@/components/layout/FooterField";
import Reveal from "@/components/motion/Reveal";
import DotGridMouse from "@/components/motion/DotGridMouse";
import FooterMotion from "@/components/motion/FooterMotion";

/**
 * Landing page — Figma frame 538:4602 ("Final version" / "Landing page"),
 * a 1440 x 4529 composition. The Figma frame ("Landing page 6/9/26", 700:6206)
 * is 4569, and every top below the hero is its Figma value less 40, because the
 * hero is lifted by that much to sit in the middle of a real first screen
 * rather than the middle of the artboard (see HERO_GROUP in
 * lib/collage-landing.ts). The gaps between sections are unchanged; only the
 * dead air above the hero is spent.
 *
 * Desktop renders the canvas at true size inside ScaledStage and scales it to
 * the viewport, so every hand-placed object keeps its exact relationship to
 * the others. Below 1024 a purpose-built flow layout takes over — the same
 * components, arranged for a column.
 */
export default function LandingPage() {
  return (
    <main>
      {/* ---------- Desktop: the exact 1440 Figma composition ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={4529}>
          <GridBackground bands={LANDING_BANDS} />
          <Nav />
          <HeroCollage />

          <HowIWork />

          {/* Work — Figma 569:571 at (137, 1764). */}
          <div id="projects" data-section="projects" className="absolute" style={{ top: 1724 }} />
          <Reveal style={{ position: "absolute", left: 137, top: 1724, width: 1165.88 }}>
            <ProjectsHeading />
          </Reveal>
          <div className="absolute" style={{ left: 140, top: 1816 }}>
            <ProjectGrid />
          </div>

          {/* Playground — Figma 700:6549 at (107, 3072). */}
          <div id="playground" data-section="playground" className="absolute" style={{ top: 3032 }} />
          <Reveal
            style={{ position: "absolute", left: 107, top: 3032, width: 1228 }}
            className="flex flex-col items-center gap-[36px]"
          >
            <PlaygroundHeading />
            <PlaygroundCanvas />
          </Reveal>

          {/* Footer dot field — canvas twin of .bg-grid-dots that leans
              toward the cursor. */}
          <DotGridMouse fullBleed className="absolute" style={{ top: 3885, height: 644 }} />
          <FooterMotion style={{ position: "absolute", left: 122, top: 4058, width: 1189 }}>
            <PostcardFooter />
          </FooterMotion>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        {/* Same rule as the stage: the ruling belongs to the hero and nowhere
            else, and it dissolves rather than ending on an edge.

            The ruling has to be its own layer, not a class on the wrapper. A
            CSS mask applies to an element AND everything inside it, so putting
            .bg-grid-fade on the container faded the nav and the keepsakes along
            with the grid — the objects nearest the edges all but vanished. The
            desktop stage never hit this because GridBackground already paints
            its bands into empty absolutely-positioned divs; this is that same
            arrangement, done by hand for the column. */}
        <div className="relative">
          <div aria-hidden className="bg-grid-fade pointer-events-none absolute inset-0" />
          <Nav />
          <HeroCollage variant="mobile" />
        </div>
        <section className="py-16">
          <HowIWork variant="mobile" />
        </section>
        <section data-section="projects" className="pb-16">
          <Reveal className="px-5 pb-10">
            <ProjectsHeading mobile />
          </Reveal>
          <ProjectGrid />
        </section>
        <section data-section="playground" className="pb-16">
          <Reveal className="px-5 pb-8">
            <PlaygroundHeading mobile />
          </Reveal>
          <PlaygroundStrip />
        </section>
        <FooterField />
      </div>
    </main>
  );
}

/**
 * "Tiny fraction of my work" — Figma 700:11006.
 *
 * This was a display line ("My projects", PP Editorial Old 38/44) and is now a
 * marker again, which inverts what the two sections were doing. The reason is
 * the section that follows: the playground takes the display heading, so the
 * page reads as work first and curiosity second rather than as two headlines
 * competing. It also lets the copy do something a heading could not — "tiny
 * fraction" says there is more, which is a better thing for a grid of four
 * projects to say than "My projects".
 */
function ProjectsHeading({ mobile = false }: { mobile?: boolean }) {
  return <SectionLabel className={mobile ? "" : "w-full"}>tiny fraction of my work</SectionLabel>;
}

/**
 * "Record of my curiosity" — Figma 700:6550. PP Editorial Old 38/44 with the
 * ornamental Amoresa "R", centred over the canvas.
 */
function PlaygroundHeading({ mobile = false }: { mobile?: boolean }) {
  return (
    <h2
      className={`font-display text-center text-black ${
        mobile ? "text-[28px] leading-[34px]" : "text-[38px] leading-[44px]"
      }`}
    >
      <SwashText text="Record of my curiosity" swashTracking={mobile ? "4px" : "5px"} />
    </h2>
  );
}
