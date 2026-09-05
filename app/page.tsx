import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import HowIWork from "@/components/layout/HowIWork";
import ProjectGrid from "@/components/work/ProjectGrid";
import HeroCollage from "@/components/collage/HeroCollage";
import SwashText from "@/components/layout/SwashText";
import GridBackground, { LANDING_BANDS } from "@/components/layout/GridBackground";
import FooterField from "@/components/layout/FooterField";
import Reveal from "@/components/motion/Reveal";
import DotGridMouse from "@/components/motion/DotGridMouse";
import FooterMotion from "@/components/motion/FooterMotion";

/**
 * Landing page — Figma frame 538:4602 ("Final version" / "Landing page"),
 * a 1440 x 3614 composition.
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
        <ScaledStage height={3614}>
          <GridBackground bands={LANDING_BANDS} />
          <Nav />
          <HeroCollage />

          <HowIWork />

          {/* Work — Figma 569:571 at (137, 1764). */}
          <div id="projects" data-section="projects" className="absolute" style={{ top: 1764 }} />
          <Reveal style={{ position: "absolute", left: 137, top: 1764, width: 1165.88 }}>
            <ProjectsHeading />
          </Reveal>
          <div className="absolute" style={{ left: 140, top: 1856 }}>
            <ProjectGrid />
          </div>

          {/* Footer dot field — canvas twin of .bg-grid-dots that leans
              toward the cursor. */}
          <DotGridMouse fullBleed className="absolute" style={{ top: 2970, height: 644 }} />
          <FooterMotion style={{ position: "absolute", left: 122, top: 3143, width: 1189 }}>
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
        <FooterField />
      </div>
    </main>
  );
}

/**
 * "My projects" — Figma 629:96. PP Editorial Old 38/44 with the ornamental
 * Amoresa "M", centred over the grid.
 *
 * This replaces the old lowercase SectionLabel here on purpose: the projects
 * are the reason the page exists, and a display line earns them a beat of
 * attention that a 16px marker doesn't. "how I work" keeps its SectionLabel,
 * so the two sections now read as headline and footnote rather than as two
 * equal markers.
 */
function ProjectsHeading({ mobile = false }: { mobile?: boolean }) {
  return (
    <h2
      className={`font-display text-center text-black ${
        mobile ? "text-[28px] leading-[34px]" : "text-[38px] leading-[44px]"
      }`}
    >
      <SwashText text="My projects" swashTracking={mobile ? "4px" : "5px"} />
    </h2>
  );
}
