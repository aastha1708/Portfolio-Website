"use client";

import { motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Bottom-sheet presentation for case studies (the Marvin Schwaibold /
 * alvinn.design pattern). Rendered by the intercepting route, so the landing
 * page stays mounted — and scrolled to the projects section — underneath.
 *
 * Enter: the sheet slides up from the bottom over a dimming backdrop.
 * Leave: at the very top of the case study, continuing to scroll up
 * rubber-bands the sheet downward; pulling past the threshold commits the
 * dismiss and the sheet slides back down, revealing the projects section
 * exactly where the visitor left it (direction-aware: in from below, out to
 * below). Backdrop click, the close button, and Esc also dismiss — gestures
 * are never the only way out.
 *
 * Under prefers-reduced-motion the sheet crossfades and the gesture is off.
 */

const CLOSE_AT = 520; // raw upward overscroll (px) that commits the dismiss —
// high on purpose: trackpad inertia piles up deltas fast, and closing should
// take a deliberate pull, not a grazing flick.
const GIVE = 320; // rubber-band asymptote: pull approaches but never exceeds this

/** iOS-style rubber banding — every extra px of pull moves the sheet less. */
const rubber = (p: number) => GIVE * (1 - 1 / (p / GIVE + 1));

export default function ProjectSheet({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const raw = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closingRef = useRef(false);

  /** Sheet offset as % of panel height ("0%" = settled). */
  const [pull, setPull] = useState(0);
  const [tracking, setTracking] = useState(false);
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
  }, []);

  /* The landing page must not scroll behind the sheet. */
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  /* Overscroll-at-top dismiss — wheel/trackpad and touch. */
  useEffect(() => {
    if (reduceMotion) return;
    const panel = panelRef.current;
    const scroller = scrollRef.current;
    if (!panel || !scroller) return;

    const toPct = (px: number) => (px / (panel.offsetHeight || 800)) * 100;

    const release = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      raw.current = 0;
      setTracking(false);
      setPull(0);
    };

    const apply = () => {
      setTracking(true);
      setPull(toPct(rubber(raw.current)));
      if (settleTimer.current) clearTimeout(settleTimer.current);
      /* Wheel streams have no "release" event — a beat of silence is one. */
      settleTimer.current = setTimeout(release, 150);
      if (raw.current > CLOSE_AT) close();
    };

    const onWheel = (e: WheelEvent) => {
      if (closingRef.current) return;
      if (scroller.scrollTop <= 0 && e.deltaY < 0) {
        e.preventDefault();
        raw.current += -e.deltaY;
        apply();
      } else if (raw.current > 0) {
        /* Scrolling back down unwinds the pull before the content moves. */
        e.preventDefault();
        raw.current = Math.max(0, raw.current - Math.abs(e.deltaY));
        if (raw.current === 0) release();
        else apply();
      }
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (closingRef.current || touchY === null) return;
      const dy = e.touches[0].clientY - touchY;
      if (scroller.scrollTop <= 0 && dy > 0) {
        e.preventDefault();
        raw.current = dy;
        setTracking(true);
        setPull(toPct(rubber(dy)));
      }
    };
    const onTouchEnd = () => {
      if (closingRef.current) return;
      if (raw.current > CLOSE_AT) close();
      else release();
      touchY = null;
    };

    panel.addEventListener("wheel", onWheel, { passive: false });
    panel.addEventListener("touchstart", onTouchStart, { passive: true });
    panel.addEventListener("touchmove", onTouchMove, { passive: false });
    panel.addEventListener("touchend", onTouchEnd);
    return () => {
      panel.removeEventListener("wheel", onWheel);
      panel.removeEventListener("touchstart", onTouchStart);
      panel.removeEventListener("touchmove", onTouchMove);
      panel.removeEventListener("touchend", onTouchEnd);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [close, reduceMotion]);

  return (
    <div className="fixed inset-0 z-[100]" role="dialog" aria-modal="true" aria-label="Case study">
      {/* Backdrop — the landing page dims but stays visible at the top edge. */}
      <motion.div
        className="absolute inset-0 bg-black/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: closing ? 0 : 1 }}
        transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={close}
        data-cursor="label"
        data-cursor-text="close"
      />

      <motion.div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-x-0 bottom-0 top-[26px] overflow-hidden rounded-t-[24px] bg-paper shadow-[0_-18px_60px_rgba(0,0,0,0.28)] outline-none"
        initial={reduceMotion ? { opacity: 0 } : { y: "100%" }}
        animate={
          reduceMotion
            ? { opacity: closing ? 0 : 1 }
            : { y: closing ? "108%" : `${pull}%` }
        }
        transition={
          reduceMotion
            ? { duration: 0.15 }
            : closing
              ? { type: "spring", stiffness: 320, damping: 36 }
              : tracking
                ? { type: "tween", duration: 0.06, ease: "linear" } /* 1:1 gesture tracking */
                : { type: "spring", stiffness: 300, damping: 32 } /* entrance + settle-back */
        }
        onAnimationComplete={() => {
          if (closingRef.current) router.back();
        }}
      >
        {/* Grab notch — signals "this is a sheet, it moves". */}
        <div
          aria-hidden
          className="absolute left-1/2 top-[10px] z-20 h-[4px] w-[44px] -translate-x-1/2 rounded-full bg-black/15"
        />

        <button
          type="button"
          onClick={close}
          aria-label="Close case study"
          data-cursor="hover"
          className="absolute right-5 top-4 z-20 flex size-[36px] items-center justify-center rounded-full bg-black/[0.06] text-black/70 transition-colors hover:bg-black/10 hover:text-black"
        >
          <svg viewBox="0 0 20 20" className="size-[16px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M5 5l10 10M15 5L5 15" />
          </svg>
        </button>

        {/* [&_header]:hidden — the case-study pages ship their own site nav,
            which has no business inside a modal sheet. */}
        <div ref={scrollRef} className="h-full overflow-y-auto overscroll-contain [&_header]:hidden">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
