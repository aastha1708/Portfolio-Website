"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { PHOTO_AREA, WINDOW_PHOTOS } from "@/lib/about";

/**
 * The macOS window on the About page (Figma 561:340) — a photo viewer with a
 * filmstrip of six thumbnails along the bottom. Clicking one swaps the photo.
 *
 * Built as a real listbox rather than a decorative image: the thumbnails are
 * buttons, arrow keys move between them, and the current one is announced. A
 * window chrome that looks operable but isn't is a worse lie than no chrome.
 *
 * NOTHING IS CROPPED. Five of the six photos are portrait and one is a wide
 * meme, so forcing them into a shared 338x297 frame would slice the top off a
 * face or the tip off the Eiffel Tower. Instead each photo is fitted inside
 * that box at its true aspect ratio and centred — the box is a bound, not a
 * frame — while the box itself keeps a fixed size so the filmstrip and the
 * window never move as you click through.
 *
 * Geometry is the Figma frame at 1:1 (490x441) and scales with the stage; the
 * mobile variant drops to a fluid width with the same proportions.
 */

/* Figma's window renders the zoom button disabled — two live lights and a
   grey one. Kept, because a fully lit set invites a click that does nothing. */
const LIGHTS = ["#ff5f57", "#febc2e", "#dddddd"];

export default function PhotoWindow({ fluid = false }: { fluid?: boolean }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const photo = WINDOW_PHOTOS[active];
  /* Narrow screens get a shorter stage; the width cap goes fluid so the photo
     can use the full column instead of being pinned to the desktop 338. */
  const area = fluid ? { width: "100%", height: 260 } : PHOTO_AREA;

  const onKeyDown = (e: React.KeyboardEvent) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    setActive((i) => (i + delta + WINDOW_PHOTOS.length) % WINDOW_PHOTOS.length);
  };

  return (
    <motion.div
      /* Hover deepens the shadow and lifts a hair — the window reads as an
         object sitting on the page rather than a picture of one. */
      whileHover={reduceMotion ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={`group/window flex flex-col overflow-hidden rounded-[10px] border border-black/[0.07] bg-[#f6f6f6] shadow-[0_1px_2px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.10),0_40px_80px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.07),0_18px_40px_rgba(0,0,0,0.13),0_56px_110px_rgba(0,0,0,0.10)] ${
        fluid ? "w-full" : "h-[441px] w-[490px]"
      }`}
    >
      {/* Titlebar */}
      <div className="flex h-[28px] shrink-0 items-center gap-[8px] border-b border-black/[0.06] bg-white px-[8px]">
        {LIGHTS.map((colour) => (
          <span key={colour} aria-hidden className="size-[12px] rounded-full" style={{ background: colour }} />
        ))}
      </div>

      <div className={`flex flex-1 flex-col items-center ${fluid ? "px-5 pb-5 pt-5" : "px-[76px] pb-[16px] pt-[21px]"}`}>
        {/* Photo stage — fixed box, free-standing photo. The box height is
            reserved so the filmstrip never shifts; the photo inside is capped
            on BOTH axes with auto on the other, which is what lets each one
            keep its own shape instead of being stretched or cut. */}
        <div className="flex w-full items-center justify-center" style={{ height: area.height }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={photo.src}
              className="flex items-center justify-center"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 1024px) 90vw, 338px"
                priority={active === 0}
                className="h-auto w-auto rounded-[8px]"
                style={{ maxHeight: area.height, maxWidth: area.width }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Filmstrip */}
        <div
          role="listbox"
          aria-label="Choose a photo"
          aria-orientation="horizontal"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={`mt-auto flex items-center justify-center rounded-[6px] ${
            fluid ? "gap-[10px] pt-5" : "gap-[15px] pt-[24px]"
          }`}
        >
          {WINDOW_PHOTOS.map((item, i) => {
            const selected = i === active;
            return (
              <button
                key={item.src}
                type="button"
                role="option"
                aria-selected={selected}
                aria-label={item.alt}
                onClick={() => setActive(i)}
                data-cursor="hover"
                className={`relative shrink-0 overflow-hidden rounded-[4px] transition-[transform,box-shadow,opacity] duration-200 ${
                  fluid ? "size-[44px]" : "size-[55px]"
                } ${
                  selected
                    ? "opacity-100 shadow-[0_0_0_2px_#fff,0_0_0_3.5px_rgba(0,0,0,0.55)]"
                    : "opacity-70 hover:-translate-y-[2px] hover:opacity-100"
                }`}
              >
                {/* Thumbnails DO crop — a 55px square contact sheet is a
                    different job from the viewer, and a fitted thumbnail would
                    be a 30px sliver for the tall shots. */}
                <Image src={item.src} alt="" fill sizes="55px" className="object-cover" />
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
