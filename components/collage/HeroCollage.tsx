"use client";

import { MotionConfig, motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import CollageItem from "./CollageItem";
import SwashText from "@/components/layout/SwashText";
import { HERO_ITEMS, HERO_GROUP, HERO_CENTER } from "@/lib/collage-landing";
import { useStageScale } from "@/components/layout/ScaledStage";

/** The deal-out plays once per visit — returning from a case study should
 *  feel instant, not make the visitor sit through the intro again. */
const DEALT_KEY = "hero-dealt";

const META = ["designing", "tinkering", "drinking coffee"];

export default function HeroCollage({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const reduceMotion = useReducedMotion();
  const scale = useStageScale();
  const deskRef = useRef<HTMLDivElement>(null);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const sx = useSpring(nx, { stiffness: 50, damping: 20, mass: 0.6 });
  const sy = useSpring(ny, { stiffness: 50, damping: 20, mass: 0.6 });

  // Read once on the client; the server renders the pre-deal state either way.
  const [dealt] = useState(() => typeof window !== "undefined" && sessionStorage.getItem(DEALT_KEY) === "1");

  useEffect(() => {
    sessionStorage.setItem(DEALT_KEY, "1");
  }, []);

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
      {/* The stage is CSS-scaled to the viewport, so pointer deltas must be
          divided back into canvas px for dragging to track the cursor 1:1. */}
      <MotionConfig transformPagePoint={(p) => ({ x: p.x / scale, y: p.y / scale })}>
        <div
          ref={deskRef}
          className="absolute"
          style={{
            left: HERO_GROUP.left,
            top: HERO_GROUP.top,
            width: HERO_GROUP.width,
            height: HERO_GROUP.height,
          }}
        >
          {HERO_ITEMS.map((item, i) => (
            <CollageItem
              key={item.id}
              item={item}
              index={i}
              pointer={{ nx: sx, ny: sy }}
              dealFrom={HERO_CENTER}
              dealt={dealt}
              drag
              dragConstraints={deskRef}
            />
          ))}
        </div>
      </MotionConfig>

      {/* Heading block — Figma 538:4721 (511 wide at 465,307, 36px side pad).
          pointer-events-none so the stickers behind it stay draggable; the
          type has nothing to click. */}
      <div className="pointer-events-none absolute left-[465px] top-[307px] z-10 w-[511px] px-[36px]">
        <Wordmark />
      </div>
    </section>
  );
}

function Wordmark({ mobile = false }: { mobile?: boolean }) {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.6, ease: [0.23, 1, 0.32, 1] as const },
  });

  return (
    <div className={`flex flex-col items-center justify-center ${mobile ? "gap-[18px]" : "gap-[24px]"}`}>
      <motion.p
        className={`text-center font-medium uppercase text-ink-muted ${
          mobile ? "text-[14px] tracking-[-0.14px]" : "text-[20px] tracking-[-0.2px]"
        }`}
        {...rise(0.1)}
      >
        Ciao! aastha here
      </motion.p>

      <div className="flex flex-col items-center gap-[16px]">
        {/* PP Editorial Old with an Amoresa "P" (Figma 538:4723). One calm
            rise — the elegance is in the letterforms, not the entrance. */}
        <motion.h1
          className={`font-display text-center text-black ${
            mobile
              ? "text-[38px] leading-[48px] tracking-[-0.76px]"
              : "text-[56px] leading-[72px] tracking-[-1.12px]"
          }`}
          {...rise(0.2)}
        >
          <SwashText text={"Product &\nVisual Designer"} swashTracking={mobile ? "1.9px" : "2.8px"} />
        </motion.h1>

        <motion.div className="flex items-center justify-center gap-[12px]" {...rise(0.45)}>
          {META.map((word, i) => (
            <span key={word} className="flex items-center gap-[12px]">
              {i > 0 && <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-ink-muted" />}
              <span
                className={`text-center font-medium uppercase text-ink-muted ${
                  mobile ? "text-[11px]" : "text-[20px]"
                }`}
              >
                {word}
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/** Purpose-built small-screen hero: a curated six from the keepsakes rather
    than all eight, scattered around the type instead of behind it. */
const MOBILE_PICKS = [
  { id: "polaroid-beach", src: "/assets/landing/new-ver/56-2.webp", w: 84, cls: "right-[2%] top-[4%] rotate-3" },
  { id: "heart", src: "/assets/landing/new-ver/56-3.webp", w: 68, cls: "left-[-2%] top-[8%] -rotate-6" },
  { id: "cat", src: "/assets/landing/new-ver/56-1.webp", w: 84, cls: "left-[-4%] bottom-[10%] -rotate-3" },
  { id: "headphones", src: "/assets/landing/new-ver/55-4.webp", w: 96, cls: "right-[-6%] bottom-[8%] rotate-6" },
  { id: "latte", src: "/assets/landing/new-ver/55-5.webp", w: 62, cls: "right-[14%] top-[40%] rotate-6" },
  { id: "flower-pink", src: "/assets/landing/new-ver/55-2.webp", w: 58, cls: "left-[12%] top-[38%] rotate-12" },
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
        <div className="relative z-10">
          <Wordmark mobile />
        </div>
      </div>
    </section>
  );
}
