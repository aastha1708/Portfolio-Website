"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import CollageItem from "./CollageItem";
import SplitText from "@/components/motion/SplitText";
import { HERO_ITEMS, HERO_GROUP } from "@/lib/collage-landing";

export default function HeroCollage({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const reduceMotion = useReducedMotion();
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 50, damping: 20, mass: 0.6 });

  useEffect(() => {
    if (reduceMotion) return;
    const onMove = (e: PointerEvent) => {
      nx.set((e.clientX / window.innerWidth) * 2 - 1);
      ny.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [nx, ny, reduceMotion]);

  if (variant === "mobile") return <HeroMobile />;

  return (
    <section aria-label="Introduction">
      <div
        className="absolute"
        style={{
          left: HERO_GROUP.left,
          top: HERO_GROUP.top,
          width: HERO_GROUP.width,
          height: HERO_GROUP.height,
        }}
      >
        {HERO_ITEMS.map((item, i) => (
          <CollageItem key={item.id} item={item} index={i} pointer={{ nx: sx, ny: sy }} />
        ))}
      </div>

      <div className="pointer-events-none absolute left-[438px] top-[300px] flex w-[564px] flex-col items-center justify-center gap-[16px]">
        <Wordmark />
      </div>

      <motion.span
        className="chip absolute left-[437px] top-[430px] -rotate-[4deg]"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75, duration: 0.5 }}
      >
        [ UI/UX Designer ]
      </motion.span>
      <motion.span
        className="chip absolute left-[870px] top-[470px] rotate-[3deg]"
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.5 }}
      >
        [ Delhi, India ]
      </motion.span>
    </section>
  );
}

function Wordmark({ mobile = false }: { mobile?: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <>
      <h1
        className={`font-wordmark w-full text-center text-black ${
          mobile ? "text-[52px] leading-[54px]" : "text-[102px] leading-[96px]"
        }`}
      >
        <SplitText text="aastha singh" delay={0.2} />
      </h1>
      <motion.div
        className="flex items-center justify-center gap-[12px]"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.6 }}
      >
        {["designing", "tinkering", "drinking coffee"].map((word, i) => (
          <span key={word} className="flex items-center gap-[12px]">
            {i > 0 && <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-ink-muted" />}
            <span className={`text-center uppercase text-ink-muted ${mobile ? "text-[11px]" : "text-[20px]"}`}>
              {word}
            </span>
          </span>
        ))}
      </motion.div>
    </>
  );
}

/** Purpose-built small-screen hero: a curated six rather than all eighteen. */
const MOBILE_PICKS = [
  { id: "polaroid-beach", src: "/assets/landing/polaroid-beach.webp", w: 118, cls: "left-[1%] top-[4%] -rotate-6" },
  { id: "book", src: "/assets/landing/kite-runner-book.webp", w: 134, cls: "left-[-5%] bottom-[8%] -rotate-12" },
  { id: "coffee", src: "/assets/landing/coffee.webp", w: 60, cls: "right-[7%] top-[9%] rotate-3" },
  { id: "camera", src: "/assets/landing/camera.webp", w: 142, cls: "right-[-7%] bottom-[12%] rotate-6" },
  { id: "orchid", src: "/assets/landing/orchid.webp", w: 92, cls: "left-[14%] top-[36%] rotate-12" },
  { id: "daisy", src: "/assets/landing/daisy.webp", w: 68, cls: "right-[16%] top-[42%] -rotate-6" },
];

function HeroMobile() {
  return (
    <section aria-label="Introduction" className="relative">
      <div className="relative mx-auto flex min-h-[74vh] max-w-[560px] flex-col items-center justify-center px-5 pb-12 pt-28">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          {MOBILE_PICKS.map((o, i) => (
            <motion.img
              key={o.id}
              src={o.src}
              alt=""
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 0.92, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
              className={`absolute object-contain ${o.cls}`}
              style={{ width: o.w }}
            />
          ))}
        </div>
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
