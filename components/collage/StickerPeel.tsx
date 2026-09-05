"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";
import styles from "./StickerPeel.module.css";

/**
 * A sticker that peels off the page under the cursor.
 *
 * Adapted from React Bits' StickerPeel (https://reactbits.dev). What changed,
 * and why each change was needed here rather than in their demo:
 *
 *  - GSAP and Draggable are gone. Dragging was cut by request, and the only
 *    other thing GSAP did was write two attributes on an SVG light — which is
 *    a setAttribute call. That is ~60kB of dependency removed for no loss:
 *    the peel itself was always pure CSS clip-path.
 *  - The SVG filter ids are namespaced per instance. The original hardcodes
 *    #pointLight / #dropShadow / #expandAndFill, which is correct for the one
 *    sticker their demo shows and wrong for eight — duplicate ids in a
 *    document all resolve to the first, so every sticker on this page would
 *    have shared the first one's light position.
 *  - --sp-start / --sp-end are declared on the instance, not :root. See the
 *    note in the stylesheet.
 *  - Both shadows moved from SVG filters to CSS drop-shadow, aimed by a
 *    counter-rotated light vector. Their version bakes dx/dy into the filter,
 *    which (a) cannot animate, so the shadow stays put no matter how far the
 *    flap lifts, and (b) sits inside the rotated container, so it swings round
 *    with the peel direction — fine for one sticker, eight different suns for
 *    eight. See the stylesheet header.
 *  - The liner is shaded rather than flat. On a dark demo background a flat
 *    pale flap is contrast enough; on a warm-white page it vanishes, and the
 *    peel with it.
 *  - The light follows the pointer through one rAF-batched write per frame
 *    rather than one per pointermove event.
 *  - The images carry real alt text, and the mirrored copy is hidden from
 *    assistive tech rather than being a second unlabelled image.
 */

/** Where the light sits, in PAGE space: up and a little to the left. Fixed for
 *  the whole collage; each instance rotates it into its own frame. */
const LIGHT_X = -0.3;
const LIGHT_Y = -0.954;

export default function StickerPeel({
  src,
  alt = "",
  /** How far the sticker lifts on hover / while pressed, as a % of its height. */
  peelHover = 32,
  peelActive = 42,
  /** Which edge lifts: 0 = top, 90 = right, 180 = bottom, 270 = left. */
  peelDirection = 0,
  /** The artwork's own tilt, applied inside the peel so the two compose. */
  rotate = 0,
  /** Slack around the clip box so neither the die-cut edge nor the contact
   *  shadow crops itself — clip-path is applied after filter. */
  padding = 14,
  /** Scales every shadow and the crease at once. */
  shadowIntensity = 1,
  lighting = 0.12,
  /** The adhesive liner. It is the UNDERSIDE of a lifted flap, so it belongs
   *  in shade — and on a warm-white page it has to be, or there is nothing to
   *  see. Held at a warm grey rather than pushed further: darker starts
   *  reading as grey card stock instead of sticker backing. */
  backing = "rgb(212, 206, 195)",
  className = "",
  style,
}: {
  src: string;
  alt?: string;
  peelHover?: number;
  peelActive?: number;
  peelDirection?: number;
  rotate?: number;
  padding?: number;
  shadowIntensity?: number;
  lighting?: number;
  backing?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<SVGFEPointLightElement>(null);
  const flippedRef = useRef<SVGFEPointLightElement>(null);

  /* useId can contain characters that are legal in an id attribute but awkward
     inside url(#…), so strip it back to alphanumerics. */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const lightId = `sp-light-${uid}`;
  const flippedId = `sp-flip-${uid}`;
  const backingId = `sp-backing-${uid}`;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frame = 0;
    let pending: { x: number; y: number; h: number } | null = null;

    const flush = () => {
      frame = 0;
      if (!pending) return;
      const { x, y, h } = pending;
      lightRef.current?.setAttribute("x", String(x));
      lightRef.current?.setAttribute("y", String(y));
      /* The flap is mirrored, so its light has to be mirrored with it. At 180
         degrees the flap folds toward the viewer and the highlight would read
         as coming from the wrong side, so it is parked off-canvas instead. */
      if (Math.abs(peelDirection % 360) !== 180) {
        flippedRef.current?.setAttribute("x", String(x));
        flippedRef.current?.setAttribute("y", String(h - y));
      } else {
        flippedRef.current?.setAttribute("x", "-1000");
        flippedRef.current?.setAttribute("y", "-1000");
      }
      pending = null;
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pending = { x: e.clientX - r.left, y: e.clientY - r.top, h: r.height };
      if (!frame) frame = requestAnimationFrame(flush);
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [peelDirection]);

  /* Counter-rotate the page-fixed light into this sticker's frame, so every
     shadow in the collage still falls the same way on screen. */
  const rad = (peelDirection * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const ux = -(LIGHT_X * cos + LIGHT_Y * sin);
  const uy = -(-LIGHT_X * sin + LIGHT_Y * cos);

  const vars = {
    "--sp-pad": `${padding}px`,
    "--sp-peel-hover": `${peelHover}%`,
    "--sp-peel-active": `${peelActive}%`,
    "--sp-direction": `${peelDirection}deg`,
    "--sp-rotate": `${rotate}deg`,
    "--sp-shadow": shadowIntensity,
    "--sp-ux": ux.toFixed(4),
    "--sp-uy": uy.toFixed(4),
    /* The crease gradient sits two rotations deep (mirror, then the container
       counter-rotation, then the artwork tilt); this lands it back along the
       fold. Derived, then confirmed against a render. */
    "--sp-shade": `${peelDirection - rotate}deg`,
  } as CSSProperties;

  const maskStyle = {
    maskImage: `url("${src}")`,
    WebkitMaskImage: `url("${src}")`,
  } as CSSProperties;

  return (
    <div className={`${styles.root} ${className}`} style={{ ...vars, ...style }}>
      <svg width="0" height="0" aria-hidden focusable="false" className="absolute">
        <defs>
          {/* Specular highlight that tracks the pointer — the thing that makes
              the lifted paper look like it is catching a light. */}
          <filter id={lightId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lighting}
              lightingColor="white"
            >
              <fePointLight ref={lightRef} x="-1000" y="-1000" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          <filter id={flippedId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" result="blur" />
            <feSpecularLighting
              result="spec"
              in="blur"
              specularExponent="100"
              specularConstant={lighting * 7}
              lightingColor="white"
            >
              <fePointLight ref={flippedRef} x="-1000" y="-1000" z="300" />
            </feSpecularLighting>
            <feComposite in="spec" in2="SourceGraphic" result="lit" />
            <feComposite in="lit" in2="SourceAlpha" operator="in" />
          </filter>

          {/* Repaints the mirrored copy as blank liner: keep its silhouette,
              throw away its picture. */}
          <filter id={backingId} x="-50%" y="-50%" width="200%" height="200%">
            <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
            <feFlood floodColor={backing} result="flood" />
            <feComposite operator="in" in="flood" in2="shape" />
          </filter>
        </defs>
      </svg>

      <div className={styles.container} ref={containerRef}>
        <div className={styles.main}>
          <div style={{ filter: `url(#${lightId})` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className={styles.image}
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
            />
          </div>
        </div>

        <div className={styles.flapShadow} aria-hidden>
          <div className={styles.flap}>
            <div className={styles.flapInner} style={{ filter: `url(#${flippedId})` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                className={styles.flapImage}
                style={{ filter: `url(#${backingId})` }}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
              <span className={styles.flapShade} style={maskStyle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
