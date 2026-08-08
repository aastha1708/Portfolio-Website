"use client";

import { useAnimationFrame, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

/**
 * A vertical photo wheel: the tiles are wrapped around the inside of a
 * cylinder, so the strip curves toward the viewer at the top and bottom
 * instead of just sliding. It drifts on its own and can be grabbed and flicked.
 *
 * WHY A REAL CYLINDER, NOT A SKEW
 * -------------------------------
 * The cheap version of this effect tilts each tile by an amount interpolated
 * from its distance to the centre. It falls apart the moment you look at the
 * spacing: a foreshortened tile occupies less height than its slot, so the
 * gaps visibly stretch toward the edges. Solving the geometry properly —
 * every tile at arc position `a` sits at angle `a / RADIUS` on the wheel —
 * makes position, foreshortening and gap fall out of one number, and they stay
 * consistent at any speed or radius.
 *
 * Each tile's transform is therefore:
 *
 *   translate(-50%, -50%) translateZ(R) rotateX(θ) translateZ(-R)
 *
 * which pivots the tile about a point R behind the plane of the strip. At
 * θ = 0 it lands dead centre, flat and unscaled.
 *
 * PERFORMANCE
 * -----------
 * The transforms are written straight to the DOM inside one rAF callback —
 * no React state, so a 60fps wheel costs zero re-renders. Tiles that have
 * rotated past the horizon are `visibility: hidden`, which keeps them out of
 * paint (and stops the far side of the wheel showing through the near side).
 */

/**
 * Curvature is defined as degrees of arc per tile rather than as a fixed
 * radius, so the wheel looks identical whatever size the tiles are — the
 * mobile carousel is the same object, smaller, not a flatter one.
 *
 * 41.8° puts five tiles in view: the flat one, two neighbours at ~92% height
 * with a ~12% trapezoid flare toward the viewer, and two heavily foreshortened
 * slivers running off the top and bottom of the panel. Those slivers are what
 * make the strip read as passing through the panel rather than sitting in it,
 * so the value must stay under 45° (at 45° the second ring rotates past the
 * horizon and the strip visibly ends).
 */
const ARC_PER_TILE = 41.8;
/** perspective ÷ radius. Governs how much the near edge of a tilted tile
 *  flares; measured off the Figma mock at roughly 4.1. */
const PERSPECTIVE_RATIO = 4.1;
/** Tiles past this angle are behind the viewer — hide, don't paint. */
const HORIZON = 88;
/** Angle at which a tile starts fading out toward the horizon. */
const FADE_FROM = 55;
/** Arc px per second of idle drift — roughly one photo every five seconds. */
const DRIFT = 48;
/** Flick decay per second. */
const FRICTION = 2.6;

export type CylinderCarouselProps = {
  images: { src: string; alt?: string }[];
  /** Tile size in px — the flat, centred tile's dimensions. */
  cardWidth: number;
  cardHeight: number;
  /** Vertical gap between tiles, measured along the arc. */
  gap?: number;
  className?: string;
  /**
   * Accessible name. Omit for a decorative strip — the wheel is then hidden
   * from assistive tech entirely, which is the honest answer when the tiles
   * have no alt text and there are no controls to operate. A labelled group
   * containing nothing but empty images is worse than silence.
   */
  label?: string;
};

export default function CylinderCarousel({
  images,
  cardWidth,
  cardHeight,
  gap = 16,
  className,
  label,
}: CylinderCarouselProps) {
  const reduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Repeat the photo set until the wheel is at least six tiles around. Fewer
     than that and half a revolution is under the horizon angle, which would
     let the same tile show at the top and the bottom of the strip at once. */
  const tiles = Array.from(
    { length: Math.max(6, images.length * 2) },
    (_, i) => images[i % images.length]
  );
  const step = cardHeight + gap;
  const span = tiles.length * step;
  const radius = step / ((ARC_PER_TILE * Math.PI) / 180);
  const perspective = radius * PERSPECTIVE_RATIO;

  const offset = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  /* Off-screen the wheel stops turning. A rAF loop writing ten transforms per
     frame for a section nobody is looking at is pure battery cost, and this
     panel sits two thirds of the way down a long page. */
  const onScreen = useRef(true);

  const paint = useCallback(() => {
    const half = span / 2;
    for (let i = 0; i < tiles.length; i++) {
      const el = tileRefs.current[i];
      if (!el) continue;

      // Arc distance from the centre of the wheel, wrapped into (-half, half].
      let arc = ((i * step - offset.current) % span + span) % span;
      if (arc > half) arc -= span;

      const deg = (arc / radius) * (180 / Math.PI);
      if (Math.abs(deg) > HORIZON) {
        el.style.visibility = "hidden";
        continue;
      }
      el.style.visibility = "visible";
      el.style.transform = `translate(-50%, -50%) translateZ(${radius.toFixed(1)}px) rotateX(${deg.toFixed(2)}deg) translateZ(${(-radius).toFixed(1)}px)`;
      /* Full strength until a tile is well past three-quarter turn, then a
         quick fade into the horizon. Fading the near neighbours too would
         wash out the photographs, which are the point of the section. */
      const fade = (HORIZON - Math.abs(deg)) / (HORIZON - FADE_FROM);
      el.style.opacity = String(Math.min(1, Math.max(0, fade)));
    }
  }, [span, step, radius, tiles.length]);

  // Paint once on mount so the first frame is already arranged (and so the
  // reduced-motion build, which never animates, is laid out correctly).
  useEffect(paint, [paint]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      onScreen.current = entry.isIntersecting;
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useAnimationFrame((_, delta) => {
    if (reduceMotion || !onScreen.current) return;
    const dt = Math.min(delta, 50) / 1000; // clamp: tab-switch shouldn't lurch

    if (!dragging.current) {
      if (Math.abs(velocity.current) > 1) {
        offset.current += velocity.current * dt;
        velocity.current *= Math.exp(-FRICTION * dt);
      } else {
        velocity.current = 0;
        offset.current += DRIFT * dt;
      }
    }
    paint();
  });

  /* --- grab & flick ------------------------------------------------------
     Pointer capture rather than window listeners: the gesture keeps working
     if the pointer leaves the panel mid-drag, and cleans itself up. */
  const last = useRef({ y: 0, t: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    if (reduceMotion || e.pointerType === "touch") return; // let touch scroll the page
    e.currentTarget.setPointerCapture?.(e.pointerId);
    dragging.current = true;
    velocity.current = 0;
    last.current = { y: e.clientY, t: performance.now() };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const now = performance.now();
    const dy = e.clientY - last.current.y;
    const dt = Math.max(now - last.current.t, 1) / 1000;
    // Drag down = wheel rolls down = earlier photos come back.
    offset.current -= dy;
    velocity.current = -dy / dt;
    last.current = { y: e.clientY, t: now };
    paint();
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragging.current = false;
  };

  return (
    <div
      ref={viewportRef}
      className={`relative select-none ${reduceMotion ? "" : "cursor-grab active:cursor-grabbing"} ${className ?? ""}`}
      style={{ perspective: `${perspective.toFixed(0)}px`, perspectiveOrigin: "50% 50%" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      {...(label ? { role: "group", "aria-label": label } : { "aria-hidden": true })}
    >
      {tiles.map((img, i) => (
        <div
          key={`${img.src}-${i}`}
          ref={(el) => {
            tileRefs.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 overflow-hidden rounded-[8px] bg-black/5"
          style={{ width: cardWidth, height: cardHeight, willChange: "transform, opacity" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.src}
            alt={img.alt ?? ""}
            draggable={false}
            loading={i < images.length ? "eager" : "lazy"}
            decoding="async"
            className="pointer-events-none size-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
