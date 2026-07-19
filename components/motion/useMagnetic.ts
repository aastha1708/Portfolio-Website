"use client";

import { useRef } from "react";
import { useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Magnetic hover: the element leans toward the pointer while it's nearby, then
 * springs home. Kept deliberately weak — magnetism that overshoots reads as a
 * gimmick and makes small targets harder to hit.
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.4 });

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduceMotion || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, x: sx, y: sy, onPointerMove, onPointerLeave, enabled: !reduceMotion };
}
