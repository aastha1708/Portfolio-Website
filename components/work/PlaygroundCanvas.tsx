"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { PLAYGROUND_ITEMS, CANVAS_VIEWPORT, CANVAS_TILE } from "@/lib/playground";

/**
 * The playground canvas — Figma 700:6551, behaving like the Framer University
 * "Infinite Canvas" component it was designed against.
 *
 * HOW THE REFERENCE ACTUALLY WORKS
 * I pulled its live preview apart rather than guessing. There is no scrolling
 * wrapper and no big transformed container: every card is its own absolutely
 * positioned element carrying its own `matrix(1,0,0,1,x,y)`, and each one
 * exists FOUR times — a 2x2 lattice whose period is the tile size. Panning
 * changes a single offset; each copy is placed at
 *
 *     base + wrap(offset) + (i * tileW, j * tileH)   for i,j in {-1, 0}
 *
 * where wrap() is the offset modulo the tile. Because the tile is at least as
 * large as the window, those four copies always cover it, so as one copy
 * leaves the right edge another has already entered from the left. Nothing is
 * created or destroyed and there is no seam — the canvas is genuinely endless
 * in both axes rather than a long strip that eventually stops.
 *
 * The motion is a lerp toward a target rather than a direct set: I measured the
 * reference easing about 63% of the way to a new target in ~470ms, which is a
 * per-frame factor near 0.05. That slow settle is most of why it feels
 * expensive rather than twitchy, so SMOOTHING matches it.
 *
 * PARALLAX, IN TWO PARTS. The reference ships parallax as a property and has it
 * turned off in that preview — I checked, and its cards neither lean toward the
 * cursor nor drift apart on a gesture. So this is built rather than copied, from
 * what the property is for:
 *
 *   TRAVEL — each card has a depth, and near cards cover more ground than far
 *   ones for the same drag. This is what turns a flat sheet of images sliding
 *   around into a space with things at different distances in it.
 *
 *   LEAN — the field tilts toward the cursor, near cards moving further than
 *   far ones, before you have touched anything. Bounded rather than
 *   accumulated, so it always settles back and never shears the composition.
 *
 * Depth is assigned by card size, not at random: the big cards read as close
 * and the small ones as distant, so the parallax agrees with what the eye
 * already assumes from scale rather than fighting it.
 *
 * DRAG ONLY. Nothing here responds to scrolling, by request. The reference
 * pans on the wheel and can afford to — its demo page is exactly one screen
 * tall (I checked: scrollHeight equals innerHeight), so there is no page scroll
 * for it to steal. This canvas sits two thirds of the way down a 4500px page,
 * where anything that reads the wheel competes with the visitor's way out.
 *
 * The label still reads "scroll/drag to move" because that is the copy in the
 * frame. Worth knowing that the first half of it now describes nothing: a
 * visitor who tries scrolling will scroll the page, which is the safe outcome
 * but not the promised one. Dropping the two words is a one-line change if that
 * ever grates.
 */

/** Per-frame approach to the target. Measured off the reference. */
const SMOOTHING = 0.055;
/** Peak lean, in px, for a card one whole unit of depth from the canvas plane. */
const POINTER_PARALLAX = 150;
/** The lean tracks the cursor more eagerly than the canvas tracks a drag. */
const POINTER_SMOOTHING = 0.09;
/** Throw decay per frame after a drag is released. */
const FRICTION = 0.945;
/** Below this (px/frame) the glide has visually stopped. */
const REST = 0.03;

const wrap = (v: number, size: number) => ((v % size) + size) % size;

export default function PlaygroundCanvas() {
  const reduceMotion = useReducedMotion();
  const viewport = useRef<HTMLDivElement>(null);
  /** One node per rendered copy, indexed [itemIndex][copyIndex]. */
  const nodes = useRef<(HTMLElement | null)[][]>([]);

  const depths = useMemo(() => PLAYGROUND_ITEMS.map((i) => i.depth), []);

  const st = useRef({
    /** Where the canvas is asked to be. */
    tx: 0, ty: 0,
    /** Where it currently is. */
    x: 0, y: 0,
    vx: 0, vy: 0,
    dragging: false,
    pointer: { x: 0, y: 0 },
    raf: 0,
    scale: 1,
    /** Pointer position over the window, -1 … 1 from the centre. */
    pxT: 0, pyT: 0,
    px: 0, py: 0,
  });

  const paint = useCallback(() => {
    const { width: TW, height: TH } = CANVAS_TILE;
    const { x, y, px, py } = st.current;
    for (let i = 0; i < PLAYGROUND_ITEMS.length; i++) {
      const item = PLAYGROUND_ITEMS[i];
      const d = depths[i];

      /* TRAVEL PARALLAX — the near cards cover more ground than the far ones
         for the same gesture, which is the whole reason a flat plane of images
         starts to read as a space with depth in it. Each card wraps against its
         OWN multiplied offset, so every card keeps its own seamless lattice
         even though they are all travelling at different rates. */
      const ox = wrap(x * d, TW);
      const oy = wrap(y * d, TH);

      /* POINTER PARALLAX — the field leans as the cursor crosses it, near
         cards further than far ones. This one is bounded rather than
         accumulated: it is an offset from the pointer's position, not a sum of
         its movement, so however long someone plays with it the arrangement
         always settles back to what it was. That is what keeps the composition
         intact while still giving the canvas an obvious sense of depth. */
      const lean = (d - 1) * POINTER_PARALLAX;
      const lx = px * lean;
      const ly = py * lean;

      const row = nodes.current[i];
      if (!row) continue;
      for (let c = 0; c < 4; c++) {
        const el = row[c];
        if (!el) continue;
        const dx = (c % 2) - 1; // -1 or 0
        const dy = Math.floor(c / 2) - 1; // -1 or 0
        el.style.transform = `translate3d(${item.box.left + ox + lx + dx * TW}px, ${
          item.box.top + oy + ly + dy * TH
        }px, 0)`;
      }
    }
  }, [depths]);

  const tick = useCallback(() => {
    const s = st.current;

    if (!s.dragging) {
      s.tx += s.vx;
      s.ty += s.vy;
      s.vx *= FRICTION;
      s.vy *= FRICTION;
      if (Math.abs(s.vx) < REST) s.vx = 0;
      if (Math.abs(s.vy) < REST) s.vy = 0;
    }

    // Ease toward the target. Under reduced motion, arrive immediately —
    // a canvas that keeps gliding after you let go is the thing that setting
    // is asking not to happen.
    const k = reduceMotion ? 1 : SMOOTHING;
    s.x += (s.tx - s.x) * k;
    s.y += (s.ty - s.y) * k;
    // The lean follows the cursor faster than the canvas follows a drag —
    // a lag you can see between your hand and the response reads as lag, not
    // as weight, and this one has no inertia to justify it.
    const pk = reduceMotion ? 1 : POINTER_SMOOTHING;
    s.px += (s.pxT - s.px) * pk;
    s.py += (s.pyT - s.py) * pk;

    paint();

    const settled =
      !s.dragging && !s.vx && !s.vy &&
      Math.abs(s.tx - s.x) < 0.05 && Math.abs(s.ty - s.y) < 0.05 &&
      Math.abs(s.pxT - s.px) < 0.001 && Math.abs(s.pyT - s.py) < 0.001;
    if (settled) {
      s.x = s.tx;
      s.y = s.ty;
      s.px = s.pxT;
      s.py = s.pyT;
      paint();
      s.raf = 0;
      return;
    }
    s.raf = requestAnimationFrame(tick);
  }, [paint, reduceMotion]);

  const wake = useCallback(() => {
    if (!st.current.raf) st.current.raf = requestAnimationFrame(tick);
  }, [tick]);


  /* ---- drag ------------------------------------------------------------- */
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const s = st.current;
    const el = viewport.current;
    // The stage scales the whole 1440 canvas to fit the window, so a pointer
    // delta has to be divided by that scale to stay 1:1 with the surface.
    if (el) {
      const r = el.getBoundingClientRect();
      s.scale = el.offsetWidth ? r.width / el.offsetWidth : 1;
    }
    s.dragging = true;
    s.pointer = { x: e.clientX, y: e.clientY };
    s.vx = s.vy = 0;
    // Snap the target to where the canvas actually is, so a drag begun during
    // a glide picks up from what you can see rather than from where it was headed.
    s.tx = s.x;
    s.ty = s.y;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    (e.currentTarget as HTMLElement).style.cursor = "grabbing";
    wake();
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const s = st.current;

    // Feed the lean on every move, dragging or not — this is the part that
    // makes the field respond to you before you have even touched it.
    if (!reduceMotion) {
      const r = viewport.current?.getBoundingClientRect();
      if (r && r.width) {
        s.pxT = ((e.clientX - r.left) / r.width) * 2 - 1;
        s.pyT = ((e.clientY - r.top) / r.height) * 2 - 1;
        wake();
      }
    }

    if (!s.dragging) return;
    const dx = (e.clientX - s.pointer.x) / (s.scale || 1);
    const dy = (e.clientY - s.pointer.y) / (s.scale || 1);
    s.pointer = { x: e.clientX, y: e.clientY };
    s.tx += dx;
    s.ty += dy;
    s.vx = s.vx * 0.7 + dx * 0.3;
    s.vy = s.vy * 0.7 + dy * 0.3;
    wake();
  };

  const endDrag = (e: React.PointerEvent) => {
    const s = st.current;
    if (!s.dragging) return;
    s.dragging = false;
    if (reduceMotion) s.vx = s.vy = 0;
    (e.currentTarget as HTMLElement).style.cursor = "grab";
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* already released */
    }
    wake();
  };


  useEffect(() => {
    paint();
    return () => {
      if (st.current.raf) cancelAnimationFrame(st.current.raf);
    };
  }, [paint]);

  /* ---- keyboard ---------------------------------------------------------- */
  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 320 : 120;
    const map: Record<string, [number, number]> = {
      ArrowLeft: [step, 0], ArrowRight: [-step, 0],
      ArrowUp: [0, step], ArrowDown: [0, -step],
    };
    const d = map[e.key];
    if (!d) return;
    e.preventDefault();
    st.current.tx += d[0];
    st.current.ty += d[1];
    wake();
  };

  return (
    /* The chrome from the frame: a light bezel with a broad soft lift under it,
       holding the canvas like a window rather than a panel printed on the page.
       The bezel is a real border of its own colour rather than padding on the
       canvas, so the inner surface can clip its contents cleanly at a smaller
       radius — which is what gives the frame its thickness. */
    <div className="rounded-[26px] bg-[#eceae7] p-[19px] shadow-paper">
      <div
        ref={viewport}
        role="application"
        aria-roledescription="infinite canvas"
        aria-label="Playground — drag to move around the projects"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(e) => {
          endDrag(e);
          st.current.pxT = 0;
          st.current.pyT = 0;
          wake();
        }}
        onKeyDown={onKeyDown}
        className="relative cursor-grab touch-none select-none overflow-hidden rounded-[10px] bg-plate outline-none focus-visible:ring-2 focus-visible:ring-chip-text/60"
        style={{ width: CANVAS_VIEWPORT.width, height: CANVAS_VIEWPORT.height }}
        data-cursor="quiet"
      >
        {/* The ruled ground. Fixed to the window rather than the surface: the
            grid is the paper the canvas is drawn on, and a grid that slides
            would announce exactly how far you have travelled, which is the one
            thing an endless canvas should not do. */}
        <div aria-hidden className="bg-canvas-grid pointer-events-none absolute inset-0" />

        {PLAYGROUND_ITEMS.map((item, i) => (
          <div key={item.id}>
            {[0, 1, 2, 3].map((c) => (
              <figure
                key={c}
                ref={(el) => {
                  (nodes.current[i] ||= [])[c] = el;
                }}
                /* aria-hidden on the three duplicates: they are the same card,
                   and a screen reader should hear each project once. */
                aria-hidden={c !== 3 ? true : undefined}
                className="absolute left-0 top-0 m-0 will-change-transform"
                style={{ width: item.box.width }}
              >
                {/* The hover lives on this inner wrapper, never on the
                    <figure>: the figure's transform is rewritten every frame by
                    the pan loop, so anything CSS put there would be wiped on the
                    next tick. Splitting them lets the two motions coexist —
                    which is exactly why the reference nests its cards the same
                    way.

                    The move is a lift and a push-in: the card rises and its
                    shadow deepens as if it came off the paper, while the image
                    scales up behind a frame that does not, so you are looking
                    further into a window rather than at a picture getting
                    bigger. group-hover on the wrapper drives both, so the whole
                    card is the target and not just the image. */}
                <div className="pg-card" style={{ width: item.box.width, height: item.box.height }}>
                  <Image
                    src={item.src}
                    alt={c === 3 ? item.alt : ""}
                    fill
                    sizes={`${item.box.width}px`}
                    className="pg-card__img"
                    draggable={false}
                  />
                </div>
                <figcaption className="absolute left-0 w-full" style={{ top: item.captionTop }}>
                  <h3 className="text-[13px] font-medium uppercase leading-[18px] tracking-[0.01em] text-black">
                    {item.title}
                  </h3>
                  <p className="mt-[4px] text-[11px] leading-[13px] text-ink-muted">{item.description}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        ))}

        {/* The instruction. It is a sibling of the cards, not one of them, so
            it never moves — an instruction that slides away with the thing it
            is explaining has stopped being an instruction.

            It is drawn in white under mix-blend-difference, which is the same
            trick the site's cursor uses: difference blending inverts whatever
            is behind it, so the label is black over the pale canvas and white
            the moment a dark card slides underneath. It stays readable over
            every one of the seven without needing a plate or a shadow to sit
            on, and it never has to be hidden to stay legible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[22px] left-1/2 z-10 flex -translate-x-1/2 items-center gap-[6px] text-[12px] uppercase tracking-[0.04em] text-white mix-blend-difference"
        >
          <MoveIcon />
          scroll/drag to move
        </div>
      </div>
    </div>
  );
}

/** fluent:arrow-move-20-regular, the mark the Figma frame uses. */
function MoveIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[15px]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 2.6v14.8M2.6 10h14.8" />
      <path d="M10 2.6 7.9 4.7M10 2.6l2.1 2.1M10 17.4l-2.1-2.1M10 17.4l2.1-2.1M2.6 10l2.1-2.1M2.6 10l2.1 2.1M17.4 10l-2.1-2.1M17.4 10l-2.1 2.1" />
    </svg>
  );
}

/**
 * The same seven on a phone.
 *
 * NOT the canvas. A 1228-wide surface dragged inside a 340-wide window is a
 * keyhole — you would spend the whole time hunting rather than looking — and a
 * custom drag on touch has to fight the browser for the gesture, which is how
 * you end up unable to scroll past a section. This is a native horizontal
 * scroller instead: the platform's own gesture, its own momentum, its own
 * scrollbar behaviour, and vertical swipes still scroll the page because the
 * browser resolves the axis, not us.
 */
export function PlaygroundStrip() {
  return (
    <div
      className="flex snap-x snap-mandatory gap-[18px] overflow-x-auto scroll-smooth px-5 pb-3
                 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {PLAYGROUND_ITEMS.map((item) => (
        <figure key={item.id} className="m-0 w-[228px] shrink-0 snap-start">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[12px] border border-hairline bg-white">
            <Image src={item.src} alt={item.alt} fill sizes="228px" className="object-cover" draggable={false} />
          </div>
          <figcaption className="pt-[10px]">
            <h3 className="text-[12px] font-medium uppercase leading-[16px] tracking-[0.01em] text-black">
              {item.title}
            </h3>
            <p className="mt-[3px] text-[11px] leading-[15px] text-ink-muted">{item.description}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
