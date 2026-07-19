"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CollageItem as Item } from "@/lib/collage-landing";

/**
 * One collage object. Reproduces Figma's structure exactly:
 * an absolutely-placed bounding box, a rotation wrapper, then the unrotated
 * element carrying the cropped image fill.
 */
export default function CollageItem({ item, index }: { item: Item; index: number }) {
  const reduceMotion = useReducedMotion();
  const inner = item.inner ?? { width: item.box.width, height: item.box.height };

  const interactive = Boolean(item.cursor);

  const picture = (
    <div className="relative overflow-hidden" style={{ width: inner.width, height: inner.height }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        draggable={false}
        loading={index < 6 ? "eager" : "lazy"}
        className="pointer-events-none absolute max-w-none select-none"
        style={
          item.cover
            ? { inset: 0, width: "100%", height: "100%", objectFit: "cover" }
            : {
                left: `${item.crop?.left ?? 0}%`,
                top: `${item.crop?.top ?? 0}%`,
                width: `${item.crop?.width ?? 100}%`,
                height: `${item.crop?.height ?? 100}%`,
              }
        }
      />
    </div>
  );

  const rotated = (
    <div style={item.rotate ? { transform: `rotate(${item.rotate}deg)` } : undefined}>{picture}</div>
  );

  const content = (
    <motion.div
      className="flex size-full items-center justify-center"
      initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
      animate={
        item.idle && !reduceMotion
          ? { opacity: 1, y: 0, scale: 1, rotate: [0, 2.5, 0, -2.5, 0] }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={
        item.idle && !reduceMotion
          ? {
              opacity: { delay: index * 0.045, duration: 0.5 },
              y: { delay: index * 0.045, type: "spring", stiffness: 260, damping: 18 },
              scale: { delay: index * 0.045, type: "spring", stiffness: 260, damping: 18 },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }
          : { delay: index * 0.045, type: "spring", stiffness: 260, damping: 18 }
      }
      whileHover={interactive && !reduceMotion ? { scale: 1.05, y: -4 } : undefined}
    >
      {rotated}
    </motion.div>
  );

  const style = {
    left: item.box.left,
    top: item.box.top,
    width: item.box.width,
    height: item.box.height,
  } as const;

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        aria-label={item.alt}
        data-cursor="label"
        data-cursor-text={item.cursor}
        className="absolute"
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      className="absolute"
      style={style}
      {...(item.cursor ? { "data-cursor": "label", "data-cursor-text": item.cursor } : {})}
    >
      {content}
    </div>
  );
}
