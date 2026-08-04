"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useStageScale } from "@/components/layout/ScaledStage";

/**
 * The footer dot field, made alive: each dot leans toward the cursor with a
 * distance falloff and eases back when it leaves (the kokonutui
 * mouse-effect-card idea, drawn on one canvas instead of hundreds of DOM
 * nodes — a 1440x618 field is ~1000 dots, which would jank as elements).
 *
 * Matches .bg-grid-dots exactly when at rest: 30px grid, 1.6px #cfcfcf dots,
 * fading in toward the bottom. Under prefers-reduced-motion (or no pointer)
 * it simply renders that static field.
 */
const SPACING = 30;
const RADIUS = 1.6;
const COLOR = { r: 0xcf, g: 0xcf, b: 0xcf };
const PULL = 16; // max displacement toward the cursor, px
const SIGMA = 110; // falloff radius of the cursor's influence
const EASE = 0.14; // per-frame lerp toward the target displacement

export default function DotGridMouse({
  className = "",
  style,
  fullBleed = false,
}: {
  className?: string;
  style?: React.CSSProperties;
  /** Stretch past the 1440 stage to cover the whole viewport width. Inside a
   *  scaled stage, local px render at `scale`, so the canvas needs
   *  100vw / scale of local width to span the screen edge-to-edge. */
  fullBleed?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const scale = useStageScale();

  const bleedStyle: React.CSSProperties = fullBleed
    ? { left: "50%", transform: "translateX(-50%)", width: `calc(100vw / ${scale})` }
    : {};

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dots: { x: number; y: number; dx: number; dy: number; a: number }[] = [];
    let raf = 0;
    let running = false;
    let visible = true;
    const mouse = { x: -1e4, y: -1e4 };

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.round(canvas.offsetWidth);
      height = Math.round(canvas.offsetHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * (rect.width ? rect.width / width : 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = SPACING / 2; y < height; y += SPACING) {
        // Same vertical fade as the CSS band: invisible on top, full at bottom.
        const t = y / height;
        const a = t < 0.45 ? (t / 0.45) * 0.3 : 0.3 + ((t - 0.45) / 0.55) * 0.7;
        for (let x = SPACING / 2; x < width; x += SPACING) {
          dots.push({ x, y, dx: 0, dy: 0, a });
        }
      }
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const d of dots) {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${COLOR.r},${COLOR.g},${COLOR.b},${d.a})`;
        ctx.arc(d.x + d.dx, d.y + d.dy, RADIUS, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = () => {
      let settled = true;
      for (const d of dots) {
        const mx = mouse.x - d.x;
        const my = mouse.y - d.y;
        const dist2 = mx * mx + my * my;
        const falloff = Math.exp(-dist2 / (2 * SIGMA * SIGMA));
        const dist = Math.sqrt(dist2) || 1;
        const tx = (mx / dist) * PULL * falloff;
        const ty = (my / dist) * PULL * falloff;
        d.dx += (tx - d.dx) * EASE;
        d.dy += (ty - d.dy) * EASE;
        if (settled && Math.abs(d.dx - tx) + Math.abs(d.dy - ty) > 0.05) settled = false;
      }
      draw();
      if (visible && !settled) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const wake = () => {
      if (!running && visible && !reduceMotion) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      // The stage may be CSS-scaled: map screen px back into canvas px.
      const s = rect.width / width || 1;
      mouse.x = (e.clientX - rect.left) / s;
      mouse.y = (e.clientY - rect.top) / s;
      wake();
    };
    const onLeave = () => {
      mouse.x = -1e4;
      mouse.y = -1e4;
      wake();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(build);
    ro.observe(canvas);
    build();

    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion]);

  return (
    <canvas ref={canvasRef} aria-hidden className={`block ${className}`} style={{ ...style, ...bleedStyle }} />
  );
}
