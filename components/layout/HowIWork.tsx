import CylinderCarousel from "@/components/motion/CylinderCarousel";
import SectionLabel from "@/components/layout/SectionLabel";
import SwashText from "@/components/layout/SwashText";
import Reveal from "@/components/motion/Reveal";

/**
 * "How I work" — Figma 569:567. A warm paper panel holding the positioning
 * statement on the left and a slowly turning wheel of photographs on the
 * right, bleeding past the top and bottom of the panel so it reads as a strip
 * passing through rather than a gallery sitting inside.
 *
 * The Figma frame ships this as one flat 403x773 PNG. It is rebuilt live
 * because a baked strip can't turn, can't be grabbed, and can't be swapped
 * without another export — the motion is the whole point of the section.
 */

export const HOW_I_WORK_COPY =
  "I turn ambiguity into clear product design direction and ship with cross-functional teams at speed. I design accessible, user-centered, experiences that balance empathy and creativity to deliver meaningful and impactful solutions.";

export const HOW_I_WORK_PULL = "Feel free to connect for cool projects";

const PHOTOS = [
  { src: "/assets/landing/final/carousal-1.webp", alt: "" },
  { src: "/assets/landing/final/carousal-2.webp", alt: "" },
  { src: "/assets/landing/final/carousal-3.webp", alt: "" },
  { src: "/assets/landing/final/carousal-4.webp", alt: "" },
  { src: "/assets/landing/final/carousal-5.webp", alt: "" },
];

/** Shared panel chrome — the warm plate both breakpoints sit on. */
const PLATE = "overflow-hidden rounded-[16px] border border-hairline bg-plate";

export default function HowIWork({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  if (variant === "mobile") return <HowIWorkMobile />;

  return (
    <Reveal
      style={{ position: "absolute", left: 107, top: 939, width: 1228 }}
      className="flex flex-col items-center gap-[18px]"
    >
      <SectionLabel className="w-[655px]">how I work</SectionLabel>

      <div className={`${PLATE} flex h-[639px] w-full items-center justify-between pl-[100px] pr-[62px]`}>
        <div className="flex flex-col gap-[45px]">
          <p className="w-[499px] text-[22px] leading-[26px] text-ink-muted">{HOW_I_WORK_COPY}</p>
          <p className="font-display w-[387px] text-[38px] leading-[44px] text-black">
            <SwashText text={HOW_I_WORK_PULL} swashTracking="9px" />
          </p>
        </div>

        {/* The wheel is taller than the panel on purpose — the panel's
            overflow clip is what makes the strip look like it continues. */}
        <CylinderCarousel
          images={PHOTOS}
          cardWidth={340}
          cardHeight={232}
          gap={16}
          className="h-[639px] w-[403px] shrink-0"
        />
      </div>
    </Reveal>
  );
}

function HowIWorkMobile() {
  return (
    <Reveal className="flex flex-col items-center gap-[14px] px-5">
      <SectionLabel>how I work</SectionLabel>
      <div className={`${PLATE} w-full max-w-[560px] px-6 pb-0 pt-8`}>
        <div className="flex flex-col gap-[28px]">
          <p className="text-[17px] leading-[24px] text-ink-muted">{HOW_I_WORK_COPY}</p>
          <p className="font-display text-[28px] leading-[34px] text-black">
            <SwashText text={HOW_I_WORK_PULL} swashTracking="6px" />
          </p>
        </div>
        <CylinderCarousel
          images={PHOTOS}
          cardWidth={252}
          cardHeight={172}
          gap={12}
          className="mt-6 h-[300px] w-full"
        />
      </div>
    </Reveal>
  );
}
