"use client";

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import CollageItem from "./CollageItem";
import { HERO_ITEMS, HERO_GROUP } from "@/lib/collage-landing";

/**
 * Desktop hero: the wordmark plus the object collage, positioned exactly as in
 * Figma. Objects stagger in on load and drift very slightly with the pointer,
 * which gives the scrapbook depth without pulling focus from the name.
 */
export default function HeroCollage({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const reduceMotion = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20 });
  const sy = useSpring(py, { stiffness: 60, damping: 20 });
  const driftX = useTransform(sx, [-1, 1], [10, -10]);
  const driftY = useTransform(sy, [-1, 1], [6, -6]);

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth) * 2 - 1);
      py.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduceMotion]);

  if (variant === "mobile") return <HeroMobile />;

  return (
    <section aria-label="Introduction">
        <motion.div
          className="absolute"
          style={{
            left: HERO_GROUP.left,
            top: HERO_GROUP.top,
            width: HERO_GROUP.width,
            height: HERO_GROUP.height,
            x: reduceMotion ? 0 : driftX,
            y: reduceMotion ? 0 : driftY,
          }}
        >
        {HERO_ITEMS.map((item, i) => (
          <CollageItem key={item.id} item={item} index={i} />
        ))}
      </motion.div>

      <div className="absolute left-[438px] top-[300px] flex w-[564px] flex-col items-center justify-center gap-[16px]">
        <Wordmark />
      </div>

      <span className="chip absolute left-[437px] top-[430px] -rotate-[4deg]">[ UI/UX Designer ]</span>
      <span className="chip absolute left-[870px] top-[470px] rotate-[3deg]">[ Delhi, India ]</span>

    </section>
  );
}

function Wordmark({ mobile = false }: { mobile?: boolean }) {
  return (
    <>
      <h1
        className={`font-wordmark w-full text-center text-black ${
          mobile ? "text-[52px] leading-[54px]" : "text-[102px] leading-[96px]"
        }`}
      >
        aastha singh
      </h1>
      <div className="flex items-center justify-center gap-[12px]">
        {["designing", "tinkering", "drinking coffee"].map((word, i) => (
          <span key={word} className="flex items-center gap-[12px]">
            {i > 0 && <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-ink-muted" />}
            <span className={`text-center uppercase text-ink-muted ${mobile ? "text-[11px]" : "text-[20px]"}`}>
              {word}
            </span>
          </span>
        ))}
      </div>
    </>
  );
}

/** A hand-picked six from the desktop collage, scaled and re-scattered. */
const MOBILE_PICKS = [
  { id: "polaroid-beach", src: "/assets/landing/polaroid-beach.webp", w: 118, style: "left-[2%] top-[6%] -rotate-6" },
  { id: "book", src: "/assets/landing/kite-runner-book.webp", w: 132, style: "left-[-4%] bottom-[10%] -rotate-12" },
  { id: "coffee", src: "/assets/landing/coffee.webp", w: 62, style: "right-[6%] top-[10%] rotate-3" },
  { id: "camera", src: "/assets/landing/camera.webp", w: 140, style: "right-[-6%] bottom-[14%] rotate-6" },
  { id: "orchid", src: "/assets/landing/orchid.webp", w: 92, style: "left-[16%] top-[38%] rotate-12" },
  { id: "daisy", src: "/assets/landing/daisy.webp", w: 70, style: "right-[18%] top-[44%] -rotate-6" },
];

function MobileCluster() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {MOBILE_PICKS.map((o) => (
        <motion.img
          key={o.id}
          src={o.src}
          alt=""
          width={o.w}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.9, scale: 1 }}
          transition={{ duration: 0.5 }}
          className={`absolute ${o.style}`}
          style={{ width: o.w }}
        />
      ))}
    </div>
  );
}

/** Purpose-built small-screen hero. The 1440 collage can't survive 390px, so a
 *  curated six sit behind the wordmark instead of all eighteen. */
function HeroMobile() {
  return (
    <section aria-label="Introduction" className="relative">
      <div className="relative mx-auto flex min-h-[76vh] max-w-[560px] flex-col items-center justify-center px-5 pb-12 pt-28">
        <MobileCluster />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <Wordmark mobile />
        </div>
        <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
          <span className="chip text-[15px]">[ UI/UX Designer ]</span>
          <span className="chip text-[15px]">[ Delhi, India ]</span>
        </div>
      </div>
    </section>
  );
}
