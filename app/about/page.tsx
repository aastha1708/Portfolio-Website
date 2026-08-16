import Nav from "@/components/layout/Nav";
import ScaledStage from "@/components/layout/ScaledStage";
import PostcardFooter from "@/components/layout/PostcardFooter";
import BionicText from "@/components/layout/BionicText";
import Emoji from "@/components/layout/Emoji";
import SwashText from "@/components/layout/SwashText";
import PhotoWindow from "@/components/about/PhotoWindow";
import FavouritesCarousel from "@/components/about/FavouritesCarousel";
import { ABOUT_BIO, ABOUT_PLACES } from "@/lib/about";
import GridBackground, { ABOUT_BANDS } from "@/components/layout/GridBackground";
import FooterField from "@/components/layout/FooterField";
import DotGridMouse from "@/components/motion/DotGridMouse";
import Parallax from "@/components/motion/Parallax";
import Reveal from "@/components/motion/Reveal";
import FooterMotion from "@/components/motion/FooterMotion";

/**
 * About — Figma frame 546:4978 ("Final version"), a 1440x1959 composition.
 *
 * The August 2026 design pared the page back to two blocks: an interactive
 * photo window beside the bio, and the favourites shelf. The communities
 * cards, experience rows and polaroid collage were cut.
 */

export const metadata = {
  title: "About — Aastha Singh",
  description:
    "Raised around the world. Graduated from IIIT-D, now an experience design professional at Them.",
};

/** Home / work / college. Apple emoji artwork so the row looks the same on
 *  every platform (see components/layout/Emoji.tsx). */
function Places({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-col gap-[8px] ${className}`}>
      {ABOUT_PLACES.map((place) => (
        <li key={place.text} className="flex items-center gap-[8px] text-[14px] font-medium text-ink-muted">
          <Emoji char={place.emoji} label={place.label} size={16} />
          {place.text}
        </li>
      ))}
    </ul>
  );
}

function Bio({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <Reveal immediate>
        <h1
          className={`font-display text-black ${
            mobile ? "text-[36px] leading-[52px] tracking-[-0.72px]" : "text-[48px] leading-[72px] tracking-[-0.96px]"
          }`}
        >
          <SwashText text="I am aastha." swashTracking={mobile ? "9px" : "12px"} />
        </h1>
      </Reveal>

      {/* Bionic reading: the weight split is computed per word, not authored —
          see BionicText. */}
      <Reveal immediate delay={0.06}>
        <p
          className={`text-ink-muted ${
            mobile ? "text-[17px] leading-[24px]" : "w-[457px] text-[18px] leading-[24px]"
          }`}
        >
          <BionicText text={ABOUT_BIO} />
        </p>
      </Reveal>

      <Reveal immediate delay={0.12}>
        <Places />
      </Reveal>
    </>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ---------- Desktop: the exact 1440 Figma composition ---------- */}
      <div className="max-lg:hidden">
        <ScaledStage height={1959}>
          <GridBackground bands={ABOUT_BANDS} />
          <Nav />

          {/* Photo window + bio — Figma 561:339 at (200, 200), the window
              490x441 and the bio column 457 wide at +581.

              The bio is centred against the window's height rather than pinned
              to Figma's +19 offset. In the frame those two numbers happen to
              agree, but the offset only holds while the paragraph wraps to
              exactly nine lines — one copy edit and the column drifts off the
              window. Centring is what the design means. */}
          <Reveal immediate style={{ position: "absolute", left: 200, top: 200 }}>
            <Parallax distance={22}>
              <PhotoWindow />
            </Parallax>
          </Reveal>
          {/* Both halves drift, the window further than the text — same
              direction, so they never separate by more than a few px and the
              pair still reads as one block. */}
          <Parallax
            distance={10}
            className="absolute left-[781px] top-[200px] flex h-[441px] w-[457px] flex-col items-start justify-center gap-[23px]"
          >
            <Bio />
          </Parallax>

          {/* Favourite things — Figma 565:389 at (133, 818). */}
          <Reveal style={{ position: "absolute", left: 133, top: 818, width: 1200 }}>
            <Parallax distance={18}>
              <FavouritesCarousel />
            </Parallax>
          </Reveal>

          {/* Footer dot field — canvas twin of .bg-grid-dots that leans
              toward the cursor, same as the landing page. */}
          <DotGridMouse fullBleed className="absolute" style={{ top: 1356, height: 603 }} />
          <FooterMotion style={{ position: "absolute", left: 122, top: 1529, width: 1189 }}>
            <PostcardFooter />
          </FooterMotion>
        </ScaledStage>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div className="bg-grid-lines">
          <Nav />
          <section className="px-5 pb-14 pt-28">
            <PhotoWindow fluid />
            <div className="mt-10 flex flex-col items-start gap-5">
              <Bio mobile />
            </div>
          </section>

          <section className="px-5 py-12">
            <FavouritesCarousel fluid />
          </section>
        </div>

        <FooterField />
      </div>
    </main>
  );
}
