"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Renderer, Program, Mesh, Triangle, Color } from "ogl";
import { useReducedMotion } from "motion/react";

/**
 * SpecularButton (react-bits), adapted for this site.
 *
 * A WebGL rim light: a signed-distance field of the button's rounded rect is
 * evaluated per pixel, and a gaussian streak is drawn along the edge wherever
 * the surface normal points at the light. The light angle steers toward the
 * pointer, so the highlight travels around the border as you approach — the
 * button behaves like a physical object catching a lamp rather than like a
 * div that changes colour on :hover.
 *
 * WHAT WAS CHANGED FROM THE ORIGINAL, AND WHY
 * -------------------------------------------
 * 1. It can render as a link. The original is always a <button>; ours goes to
 *    LinkedIn, and a control that navigates has to be an <a> — otherwise it is
 *    invisible to "open in new tab", to middle-click, and to a screen reader
 *    reading out the page's links.
 *
 * 2. The loop is gated. The original runs requestAnimationFrame forever and
 *    listens on window pointermove for the life of the page. This nav sits on
 *    top of a hero that already runs a sticker-peel and a canvas dot field, and
 *    on case studies it scrolls out of view and keeps rendering. Now an
 *    IntersectionObserver stops the loop when the button leaves the viewport,
 *    a visibilitychange handler stops it in a background tab, and the loop
 *    parks itself when the light has settled and nothing is moving — it costs
 *    nothing until you approach it.
 *
 * 3. It is off under prefers-reduced-motion. The whole component is a moving
 *    light; there is no reduced version of it that is still it. The CSS
 *    fallback is the same pill, statically lit, which is what that visitor
 *    should get.
 *
 * 4. Light-mode palette (see the call site). The original is built for a dark
 *    UI — white text, white rim, grey base. On this paper ground the button
 *    itself is the dark object, which is what makes a white specular legible.
 */

type Props = {
  children?: ReactNode;
  /** Renders an <a> instead of a <button>. */
  href?: string;
  target?: string;
  rel?: string;
  radius?: number;
  /** Solid fill behind the label. */
  tint?: string;
  textColor?: string;
  /** The travelling highlight. */
  lineColor?: string;
  /** The static edge stroke that gives the pill its thickness. */
  baseColor?: string;
  intensity?: number;
  shineSize?: number;
  shineFade?: number;
  thickness?: number;
  speed?: number;
  /** Distance in px at which the light starts to respond to the pointer. */
  proximity?: number;
  className?: string;
  onClick?: () => void;
  /** Forwarded to the host element for components/layout/Cursor. */
  "data-cursor"?: string;
};

/** The canvas overhangs the button so the rim glow can bleed past the edge. */
const PAD = 20;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform vec3 uLineColor;
uniform vec3 uBaseColor;
uniform float uIntensity;
uniform float uShineSize;
uniform float uShineFade;
uniform float uThickness;
uniform float uBaseWidth;
out vec4 fragColor;

float sdRoundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

float gaussianLine(float d, float sigma) {
  float x = d / (sigma + 1e-6);
  float k = mix(1.0, 1.6, smoothstep(0.0, 1.5, x));
  return exp(-k * x * x);
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = sdRoundedRect(p, uHalfSize, uRadius);
  vec2 L = vec2(cos(uAngle), sin(uAngle));

  // Static stroke hugging the edge, so the pill has a thickness at rest.
  float base = (1.0 - smoothstep(0.0, uBaseWidth, abs(d))) * 0.45;

  // Symmetric specular: both the edge facing the light and the one facing away
  // catch a streak. The angular window is measured against an elliptical normal
  // so it varies continuously along the straight edges instead of popping at
  // the corners.
  vec2 nEll = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(nEll, L)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(uShineSize - uShineFade, uShineSize + uShineFade + 1e-4, phi);
  float line = gaussianLine(d, uThickness);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float hi = line * rim * edgeClamp * uIntensity;

  vec3 col = uBaseColor * base + uLineColor * hi;
  float a = clamp(base + hi, 0.0, 1.0);
  fragColor = vec4(col, a);
}
`;

export default function SpecularButton({
  children = "Get started",
  href,
  target,
  rel,
  radius = 999,
  tint = "#0d0d0d",
  textColor = "#fdfeff",
  lineColor = "#ffffff",
  baseColor = "#111111",
  intensity = 1,
  shineSize = 10,
  shineFade = 40,
  thickness = 1,
  speed = 0.35,
  proximity = 260,
  className = "",
  onClick,
  "data-cursor": dataCursor,
}: Props) {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLElement>(null);
  const fxRef = useRef<HTMLSpanElement>(null);

  // Live prop mirror, so re-renders never tear down the GL context.
  const propsRef = useRef({ radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, proximity });
  propsRef.current = { radius, lineColor, baseColor, intensity, shineSize, shineFade, thickness, speed, proximity };

  useEffect(() => {
    if (reduceMotion) return;
    const host = hostRef.current;
    const fx = fxRef.current;
    if (!host || !fx) return;

    // Cap DPR at 2: this is a 40px-tall strip of rim light, and a 3x buffer
    // triples the fill cost for a difference nobody can see.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const renderer = new Renderer({ alpha: true, premultipliedAlpha: true, antialias: true, dpr });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) delete geometry.attributes.uv;

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 0 },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uLineColor: { value: [1, 1, 1] },
        uBaseColor: { value: [0.29, 0.29, 0.29] },
        uIntensity: { value: 0 },
        uShineSize: { value: 0.17 },
        uShineFade: { value: 0.7 },
        uThickness: { value: 1 },
        uBaseWidth: { value: dpr },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    fx.appendChild(gl.canvas);

    const box = { w: 1, h: 1 };
    const resize = () => {
      // Fractional size and an explicit centre keep the SDF pinned to the exact
      // CSS border; offsetWidth rounding drifts it by up to a pixel.
      const r = host.getBoundingClientRect();
      box.w = r.width;
      box.h = r.height;
      renderer.setSize(r.width + PAD * 2, r.height + PAD * 2);
      program.uniforms.uCenter.value = [(PAD + r.width / 2) * dpr, (PAD + r.height / 2) * dpr];
      program.uniforms.uHalfSize.value = [(r.width / 2) * dpr, (r.height / 2) * dpr];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    let pointerAngle: number | null = null;
    let proximityT = 0;
    const onPointerMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      const dist = Math.hypot(dx, dy);
      if (dist === 0) {
        // On the button the light settles on the diagonal, framing the corners,
        // and sways a little with where inside it the pointer is.
        const nx = (e.clientX - cx) / (r.width / 2);
        const ny = (cy - e.clientY) / (r.height / 2);
        pointerAngle = Math.atan2(2 / r.height, -2 / r.width) + nx * 0.3 + ny * 0.15;
      } else {
        pointerAngle = Math.atan2(cy - e.clientY, e.clientX - cx);
      }
      const t = Math.max(0, 1 - dist / Math.max(propsRef.current.proximity, 1));
      proximityT = t * t * (3 - 2 * t);
      wake();
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    /* ---- the loop, and the three things that stop it ------------------- */
    let angle = 2.4;
    let idleAngle = 2.4;
    let bright = 0;
    let last = performance.now();
    let raf = 0;
    let onScreen = true;
    const lineC = new Color();
    const baseC = new Color();

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const p = propsRef.current;

      idleAngle += p.speed * dt;
      const target = pointerAngle != null ? pointerAngle : idleAngle;
      const diff = ((target - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      angle += diff * (1 - Math.exp(-dt * 7));
      bright += (proximityT - bright) * (1 - Math.exp(-dt * 8));

      lineC.set(p.lineColor);
      baseC.set(p.baseColor);
      program.uniforms.uAngle.value = angle;
      program.uniforms.uRadius.value = Math.min(p.radius, Math.min(box.w, box.h) / 2) * dpr;
      program.uniforms.uLineColor.value = [lineC.r, lineC.g, lineC.b];
      program.uniforms.uBaseColor.value = [baseC.r, baseC.g, baseC.b];
      program.uniforms.uIntensity.value = p.intensity * bright;
      program.uniforms.uShineSize.value = (p.shineSize * Math.PI) / 180;
      program.uniforms.uShineFade.value = (p.shineFade * Math.PI) / 180;
      program.uniforms.uThickness.value = p.thickness * dpr;
      renderer.render({ scene: mesh });

      // Park once the light has arrived and there is nothing left to show. The
      // next pointer move wakes it; until then the button costs one idle
      // listener and no frames at all.
      const settled = Math.abs(diff) < 0.002 && bright < 0.002 && proximityT < 0.002;
      raf = settled ? 0 : requestAnimationFrame(draw);
    };

    const wake = () => {
      if (raf || !onScreen || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(draw);
    };
    const sleep = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    // One frame up front so the resting edge stroke is painted immediately.
    raf = requestAnimationFrame(draw);

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      onScreen ? wake() : sleep();
    });
    io.observe(host);

    const onVisibility = () => (document.hidden ? sleep() : wake());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      sleep();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      if (gl.canvas.parentNode === fx) fx.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [reduceMotion]);

  const style = {
    "--sb-radius": `${radius}px`,
    "--sb-tint": tint,
    "--sb-text-color": textColor,
  } as React.CSSProperties;

  const inner = (
    <>
      <span ref={fxRef} className="specular-button__fx" aria-hidden="true" />
      <span className="specular-button__label">{children}</span>
    </>
  );

  const shared = { className: `specular-button ${className}`.trim(), style, "data-cursor": dataCursor };

  return href ? (
    <a ref={hostRef as React.Ref<HTMLAnchorElement>} href={href} target={target} rel={rel} onClick={onClick} {...shared}>
      {inner}
    </a>
  ) : (
    <button ref={hostRef as React.Ref<HTMLButtonElement>} type="button" onClick={onClick} {...shared}>
      {inner}
    </button>
  );
}
