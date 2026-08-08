import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import SectionLabel from "@/components/layout/SectionLabel";
import PostcardFooter from "@/components/layout/PostcardFooter";
import HowIWork from "@/components/layout/HowIWork";
import ProjectGrid from "@/components/work/ProjectGrid";
import HeroCollage from "@/components/collage/HeroCollage";
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
          <Reveal style={{ position: "absolute", left: 392, top: 1764, width: 655 }}>
            <SectionLabel>projects that i designed with love &lt;3</SectionLabel>
          </Reveal>
          <div className="absolute" style={{ left: 140, top: 1817 }}>
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
        <div className="bg-grid-lines">
          <Nav />
          <HeroCollage variant="mobile" />
        </div>
        <section className="bg-grid-lines py-16">
          <HowIWork variant="mobile" />
        </section>
        <section data-section="projects" className="bg-grid-lines pb-16">
          <Reveal className="px-5 pb-10">
            <SectionLabel>projects that i designed with love &lt;3</SectionLabel>
          </Reveal>
          <ProjectGrid />
        </section>
        <FooterField />
      </div>
    </main>
  );
}
