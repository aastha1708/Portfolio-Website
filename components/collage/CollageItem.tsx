"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useMotionValue } from "motion/react";
import { useEffect, useRef, useState, type RefObject } from "react";
import { useMagnetic } from "@/components/motion/useMagnetic";
import type { CollageItem as Item } from "@/lib/collage";

function padStyle(pad: Item["pad"]) {
  if (!pad) return undefined;
  if ("x" in pad) return { padding: `${pad.y}px ${pad.x}px` };
  return { padding: `${pad.top}px ${pad.right}px ${pad.bottom}px ${pad.left}px` };
}

/**
 * One collage object: absolutely placed at its Figma footprint, with the asset
 * fitted inside via object-contain. Optional rotation, idle sway, magnetism and
 * a per-item parallax depth.
 *
 * Two entrance modes:
 *  - default: drops in with a slight over-rotation (the About page desk).
 *  - `dealFrom`: opens up from a shared origin — the whole collage starts
 *    stacked at the hero's centre and each object springs out to its spot.
 *    Pass `dealt` to skip the entrance (e.g. revisits within a session).
 *
 * `drag` turns the object into a loose sticker the visitor can pick up.
 * Positions intentionally reset on reload — the composed collage is the
 * canonical layout; rearranging it is play, not persistence.
 */
export default function CollageItem({
  item,
  index,
  pointer,
  dealFrom,
  dealt = false,
  drag = false,
  dragConstraints,
}: {
  item: Item;
  index: number;
  /** Normalised pointer position, -1..1 on each axis. */
  pointer?: { nx: MotionValue<number>; ny: MotionValue<number> };
  /** Shared deal-out origin on the same canvas as `item.box`. */
  dealFrom?: { x: number; y: number };
  /** Entrance already played this session — render settled. */
  dealt?: boolean;
  drag?: boolean;
  dragConstraints?: RefObject<HTMLDivElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const magnetic = useMagnetic(item.magnetic ?? 0);
  const depth = item.depth ?? 1;
  const dragging = useRef(false);

  /* Drag attaches only after hydration: framer serialises drag styles
     (touch-action etc.) differently on the server, which trips React's
     hydration diff. First client render must match the SSR HTML. */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* Deeper objects travel further, which separates the collage into planes.
     Aug 2026: the travel was halved (9/6 -> 5/3.4). At the old amplitude the
     whole desk swam with the pointer, which pulled attention off the heading
     and made the stickers feel weightless; the parallax should be something
     you notice on the second look, not the first. */
  const fallback = useMotionValueFallback();
  const px = useTransform(pointer?.nx ?? fallback, [-1, 1], [depth * 5, -depth * 5]);
  const py = useTransform(pointer?.ny ?? fallback, [-1, 1], [depth * 3.4, -depth * 3.4]);

  const interactive = Boolean(item.cursor || item.href);

  // Offset from this object's centre back to the deal-out origin.
  const deal = dealFrom
    ? {
        x: dealFrom.x - (item.box.left + item.box.width / 2),
        y: dealFrom.y - (item.box.top + item.box.height / 2),
      }
    : null;

  const canDrag = drag && mounted && !reduceMotion;

  const image = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={item.alt}
      draggable={false}
      loading={index < 8 ? "eager" : "lazy"}
      className="pointer-events-none size-full select-none object-contain"
      style={padStyle(item.pad)}
    />
  );

  const Wrapper = item.href ? motion.a : motion.div;

  /* NOTE: `dealt`/`reduceMotion` must NOT change `initial` — the server and
     the first client render have to produce identical inline styles or React
     flags a hydration mismatch. They only zero out the transition instead,
     so the entrance snaps rather than plays. */
  const entrance = deal
    ? { opacity: 0, x: deal.x, y: deal.y, scale: 0.5, rotate: index % 2 ? 7 : -7 }
    : { opacity: 0, y: 26, scale: 0.92, rotate: item.idle ? 0 : -2.5 };
  const skip = dealt || reduceMotion;

  /* Deal-out springs are softer than the drop-in so the fan-out reads as one
     orchestrated motion; the stagger is what sells the "opening up". */
  const spring = skip
    ? { duration: 0 }
    : deal
      ? { type: "spring" as const, stiffness: 170, damping: 22 }
      : { type: "spring" as const, stiffness: 220, damping: 20 };
  const delay = skip ? 0 : deal ? 0.25 + index * 0.06 : 0.15 + index * 0.05;

  return (
    <motion.div
      className="absolute"
      style={{
        left: item.box.left,
        top: item.box.top,
        width: item.box.width,
        height: item.box.height,
        x: pointer && !reduceMotion ? px : 0,
        y: pointer && !reduceMotion ? py : 0,
      }}
    >
      <motion.div
        className={`size-full ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
        initial={entrance}
        animate={
          item.idle && !reduceMotion
            ? { opacity: 1, x: 0, y: 0, scale: 1, rotate: [0, 2, 0, -2, 0] }
            : { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }
        }
        transition={
          item.idle && !reduceMotion
            ? {
                opacity: { delay, duration: skip ? 0 : 0.5 },
                x: { delay, ...spring },
                y: { delay, ...spring },
                scale: { delay, ...spring },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
              }
            : { delay, ...spring, opacity: { delay, duration: skip ? 0 : 0.5 } }
        }
        drag={canDrag}
        dragConstraints={dragConstraints}
        dragElastic={0.18}
        dragTransition={{ power: 0.25, timeConstant: 180 }}
        whileDrag={{ scale: 1.07, rotate: 0, zIndex: 30 }}
        onDragStart={() => (dragging.current = true)}
        onDragEnd={() => setTimeout(() => (dragging.current = false), 0)}
      >
        <Wrapper
          {...(item.href
            ? { href: item.href, target: "_blank", rel: "noreferrer noopener", "aria-label": item.alt }
            : {})}
          ref={magnetic.ref as never}
          onPointerMove={item.magnetic ? magnetic.onPointerMove : undefined}
          onPointerLeave={item.magnetic ? magnetic.onPointerLeave : undefined}
          onClickCapture={
            item.href
              ? (e: React.MouseEvent) => {
                  // A flick is not a click — don't follow the link after a drag.
                  if (dragging.current) e.preventDefault();
                }
              : undefined
          }
          className="block size-full"
          style={{
            rotate: item.rotate ?? 0,
            x: item.magnetic ? magnetic.x : 0,
            y: item.magnetic ? magnetic.y : 0,
          }}
          whileHover={
            interactive && !reduceMotion
              ? { scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 20 } }
              : undefined
          }
          {...(item.cursor ? { "data-cursor": "label", "data-cursor-text": item.cursor } : {})}
        >
          {image}
        </Wrapper>
      </motion.div>
    </motion.div>
  );
}

/** A constant motion value, so the hooks below always run in the same order. */
function useMotionValueFallback() {
  return useMotionValue(0);
}
