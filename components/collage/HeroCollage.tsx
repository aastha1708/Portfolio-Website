"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import StickerPeel from "./StickerPeel";
import SwashText from "@/components/layout/SwashText";
import { HERO_ITEMS, HERO_GROUP, HERO_CENTER } from "@/lib/collage-landing";
import { useIntroDone } from "@/lib/intro";

/** The deal-out plays once per visit — returning from a case study should
 *  feel instant, not make the visitor sit through the intro again. */
const DEALT_KEY = "hero-dealt";

const META = ["designing", "tinkering", "drinking coffee"];

/**
 * The hero: eight keepsakes stuck to the page, and the heading they frame.
 *
 * Sept 2026 — the stickers used to be draggable, drift with the pointer on a
 * per-object parallax, and sway on an idle loop. All of it is gone. Three
 * competing motions meant nothing on the page held still long enough to be
 * looked at, and none of them said anything about the objects themselves.
 * What replaced them is one gesture: bring the cursor onto a keepsake and it
 * peels off the page, showing the blank liner underneath. One thing to notice,
 * and it rewards the noticing. See StickerPeel for how.
 *
 * The deal-out entrance still lives here rather than in the sticker, because
 * it is a property of the collage — eight objects opening out from behind the
 * heading — not of any one object.
 */
export default function HeroCollage({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const reduceMotion = useReducedMotion();
  /* The intro covers this section while it plays. Without waiting for it the
     deal-out happens under an opaque plate and the iris opens onto a collage
     that has already finished arriving — the entrance is spent on nobody. */
  const introDone = useIntroDone();

  // Read once on the client; the server renders the pre-deal state either way.
  const [dealt] = useState(() => typeof window !== "undefined" && sessionStorage.getItem(DEALT_KEY) === "1");

  useEffect(() => {
    sessionStorage.setItem(DEALT_KEY, "1");
  }, []);

  if (variant === "mobile") return <HeroMobile />;

  /* NOTE: `dealt` and `reduceMotion` must NOT reach `initial` — the server and
     the first client render have to emit identical inline styles or React
     flags a hydration mismatch. They only collapse the transition instead, so
     the entrance snaps rather than plays. */
  const skip = dealt || reduceMotion;

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
        {HERO_ITEMS.map((item, i) => {
          const cx = item.box.left + item.box.width / 2;
          const cy = item.box.top + item.box.height / 2;
          const delay = skip ? 0 : 0.25 + i * 0.06;
          /* Held at the initial pose until the intro is out of the way. Note
             this is on `animate` only — `initial` still has to be identical on
             the server and the first client render (see the NOTE above). */
          const held = {
            opacity: 0,
            x: HERO_CENTER.x - cx,
            y: HERO_CENTER.y - cy,
            scale: 0.5,
            rotate: i % 2 ? 7 : -7,
          };
          return (
            <motion.div
              key={item.id}
              className="absolute"
              style={{ left: item.box.left, top: item.box.top, width: item.box.width }}
              initial={held}
              animate={introDone ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 } : held}
              transition={
                skip
                  ? { duration: 0 }
                  : {
                      type: "spring",
                      stiffness: 170,
                      damping: 22,
                      delay,
                      opacity: { delay, duration: 0.5 },
                    }
              }
            >
              <StickerPeel
                src={item.src}
                alt={item.alt}
                rotate={item.rotate ?? 0}
                peelDirection={item.peel ?? 0}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Heading block — Figma 538:4721 (511 wide at 465,307, 36px side pad),
          at 267 rather than 307 because the whole hero is lifted 40; see
          HERO_GROUP in lib/collage-landing.ts for why, and note that the ring
          and the type have to move by the same amount or the type stops
          sitting inside the keepsakes.
          pointer-events-none so the keepsakes behind it stay hoverable; the
          type has nothing to click.

          Centred by translate rather than left-[465px]. 465 + 511 = 976 leaves
          464 on the right, so the Figma value is half a pixel off the canvas
          centre — invisible on its own, but it is the kind of thing that stops
          you being able to trust the geometry when something else looks wrong.
          This is exact by construction and stays exact if the width changes. */}
      <div className="pointer-events-none absolute left-1/2 top-[267px] z-10 w-[511px] -translate-x-1/2 px-[36px]">
        <Wordmark />
      </div>
    </section>
  );
}

function Wordmark({ mobile = false }: { mobile?: boolean }) {
  const reduceMotion = useReducedMotion();
  /* Same reason as the keepsakes: the type should arrive when the iris opens,
     not while it is still behind an opaque plate. */
  const introDone = useIntroDone();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 12 },
    animate: introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
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
            <span key={word} className="flex shrink-0 items-center gap-[12px]">
              {i > 0 && <span aria-hidden className="size-[6px] shrink-0 rounded-full bg-ink-muted" />}
              {/* nowrap + shrink-0, and the reason is the whole point of this
                  row. At 20px the three phrases plus their dots need ~469px;
                  the heading block's content box is 439 (511 less its 36px
                  side padding). Flex's default shrink then squeezed the last
                  item until "drinking coffee" broke onto a second line, which
                  read as the hero being off-centre — it was not, every block
                  sits on the same axis, but a row that is one line on the left
                  and two on the right cannot look centred. Refusing to shrink
                  lets the row keep its natural width and spill ~15px into the
                  block's own padding, still dead centre because the column
                  centres it. */}
              <span
                className={`shrink-0 whitespace-nowrap text-center font-medium uppercase text-ink-muted ${
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
    than all eight, scattered around the type instead of behind it. No peel —
    it is a hover gesture, and there is no hover on a phone. */
const MOBILE_PICKS = [
  { id: "polaroid-beach", src: "/assets/landing/new-ver/die-cut/56-2.webp", w: 90, cls: "right-[2%] top-[4%] rotate-3" },
  { id: "heart", src: "/assets/landing/new-ver/die-cut/56-3.webp", w: 74, cls: "left-[-2%] top-[8%] -rotate-6" },
  { id: "cat", src: "/assets/landing/new-ver/die-cut/56-1.webp", w: 90, cls: "left-[-4%] bottom-[10%] -rotate-3" },
  { id: "headphones", src: "/assets/landing/new-ver/die-cut/55-4.webp", w: 102, cls: "right-[-6%] bottom-[8%] rotate-6" },
  { id: "latte", src: "/assets/landing/new-ver/die-cut/55-5.webp", w: 68, cls: "right-[14%] top-[40%] rotate-6" },
  { id: "flower-pink", src: "/assets/landing/new-ver/die-cut/55-2.webp", w: 64, cls: "left-[12%] top-[38%] rotate-12" },
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
