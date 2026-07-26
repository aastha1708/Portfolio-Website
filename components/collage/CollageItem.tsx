"use client";

import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { useMotionValue } from "motion/react";
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
 */
export default function CollageItem({
  item,
  index,
  pointer,
}: {
  item: Item;
  index: number;
  /** Normalised pointer position, -1..1 on each axis. */
  pointer?: { nx: MotionValue<number>; ny: MotionValue<number> };
}) {
  const reduceMotion = useReducedMotion();
  const magnetic = useMagnetic(item.magnetic ?? 0);
  const depth = item.depth ?? 1;

  // Deeper objects travel further, which separates the collage into planes.
  const fallback = useMotionValueFallback();
  const px = useTransform(pointer?.nx ?? fallback, [-1, 1], [depth * 9, -depth * 9]);
  const py = useTransform(pointer?.ny ?? fallback, [-1, 1], [depth * 6, -depth * 6]);

  const interactive = Boolean(item.cursor || item.href);

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
        className="size-full"
        /* Opening: each object drops in with a slight over-rotation and
           spring-settles into place — like being laid down on the desk. */
        initial={
          reduceMotion
            ? false
            : { opacity: 0, y: 26, scale: 0.92, rotate: item.idle ? 0 : -2.5 }
        }
        animate={
          item.idle && !reduceMotion
            ? { opacity: 1, y: 0, scale: 1, rotate: [0, 2, 0, -2, 0] }
            : { opacity: 1, y: 0, scale: 1, rotate: 0 }
        }
        transition={
          item.idle && !reduceMotion
            ? {
                opacity: { delay: 0.15 + index * 0.05, duration: 0.5 },
                y: { delay: 0.15 + index * 0.05, type: "spring", stiffness: 220, damping: 20 },
                scale: { delay: 0.15 + index * 0.05, type: "spring", stiffness: 220, damping: 20 },
                rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 },
              }
            : { delay: 0.15 + index * 0.05, type: "spring", stiffness: 220, damping: 20 }
        }
      >
        <Wrapper
          {...(item.href
            ? { href: item.href, target: "_blank", rel: "noreferrer noopener", "aria-label": item.alt }
            : {})}
          ref={magnetic.ref as never}
          onPointerMove={item.magnetic ? magnetic.onPointerMove : undefined}
          onPointerLeave={item.magnetic ? magnetic.onPointerLeave : undefined}
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
