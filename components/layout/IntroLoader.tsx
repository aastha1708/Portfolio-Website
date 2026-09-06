"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import TextType from "@/components/ui/TextType";
import { Keystrokes } from "@/lib/keystroke";

/**
 * The intro — Figma frame 686:1305 "Loader screen".
 *
 * A sentence typed onto a dark plate, then an iris that opens onto the hero.
 * It runs once per session, on the landing page only (see IntroGate).
 *
 * THE IRIS
 * --------
 * "Reveal the page through a growing circle" is the opposite of clipping the
 * overlay to a circle — that would shrink the dark plate to a dot, closing
 * rather than opening. What is needed is a HOLE in the plate that grows, and
 * the way to get one is a mask: a radial gradient that is transparent inside
 * the circle and opaque outside it. Where the mask is transparent the overlay
 * is not painted, so the page shows through.
 *
 * The radius is written per frame by GSAP rather than tweened in CSS, because
 * a hard-stop radial-gradient is not an interpolatable value — a CSS
 * transition between two of them just snaps. Feathering the stop by a few px
 * keeps the expanding edge from stair-stepping.
 *
 * WHAT HAPPENS TO SOUND
 * ---------------------
 * Browsers refuse audio until the visitor has interacted with the page, and a
 * cold page load is by definition before that. So the intro is built to be
 * silent by default and correct either way: it asks once (tryStart), and if
 * the answer is no, the speaker control in the corner is how a visitor turns
 * it on — that click is itself the gesture that unlocks it. Their choice is
 * remembered, so anyone who wants the sound gets it from the first keystroke
 * on every later visit that has any interaction behind it.
 */

/**
 * The break is explicit, and that is a fix rather than a preference. Left to
 * wrap on its own the line re-breaks as it is typed — "portfolio," starts on
 * line one, then jumps to line two the moment "hope" no longer fits — so the
 * whole sentence lurches sideways mid-animation. A hard break, a fixed width
 * and a reserved two-line height mean the block is the same shape on the first
 * character as on the last. It is also where the Figma frame breaks it.
 */
const LINE = "Welcome to Aastha’s\nportfolio, I hope you enjoy!";
/** Index of the "A" in "Aastha" — the one glyph set in the swash face. */
const SWASH_AT = LINE.indexOf("Aastha");
const SOUND_KEY = "intro-sound";

export default function IntroLoader({
  onReveal,
  onFinish,
}: {
  /** Fired part-way through the iris: the hero is clear to start arriving. */
  onReveal: () => void;
  /** Fired when the plate is fully gone and the overlay can unmount. */
  onFinish: () => void;
}) {
  const overlay = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const soundBtn = useRef<HTMLButtonElement>(null);
  const keys = useRef<Keystrokes | null>(null);
  const leaving = useRef(false);
  const [soundOn, setSoundOn] = useState(false);

  /* ---- audio ---------------------------------------------------------- */
  useEffect(() => {
    const k = new Keystrokes();
    keys.current = k;
    // Remembered preference: try to start straight away. This succeeds when
    // the visitor has already interacted with the page in this load (a link
    // click back to /, say) and is refused silently otherwise.
    let wanted = false;
    try {
      wanted = localStorage.getItem(SOUND_KEY) === "1";
    } catch {
      /* private mode */
    }
    if (wanted) {
      k.tryStart();
      // state reflects reality, not intent: only claim sound is on if it is
      const check = setTimeout(() => setSoundOn(k.running), 60);
      return () => {
        clearTimeout(check);
        k.close();
      };
    }
    return () => k.close();
  }, []);

  const toggleSound = useCallback(async () => {
    const k = keys.current;
    if (!k) return;
    if (k.running && soundOn) {
      setSoundOn(false);
      try {
        localStorage.setItem(SOUND_KEY, "0");
      } catch {
        /* ignore */
      }
      return;
    }
    const ok = await k.unlock();
    setSoundOn(ok);
    try {
      localStorage.setItem(SOUND_KEY, ok ? "1" : "0");
    } catch {
      /* ignore */
    }
  }, [soundOn]);

  const onCharacter = useCallback(
    (char: string) => {
      if (!soundOn) return;
      keys.current?.play(char === " " ? "space" : "key");
    },
    [soundOn]
  );

  /* ---- the exit ------------------------------------------------------- */
  const leave = useCallback(() => {
    if (leaving.current) return;
    leaving.current = true;

    const el = overlay.current;
    if (!el) {
      onReveal();
      return onFinish();
    }

    // Radius needed to clear the furthest corner from the centre.
    const r = Math.hypot(window.innerWidth, window.innerHeight) / 2;
    const state = { r: 0 };
    const tl = gsap.timeline({ onComplete: onFinish });

    // The sentence and the sound control go first, so the iris opens onto a
    // bare plate rather than tearing a hole through live type.
    tl.to([panel.current, soundBtn.current], {
      opacity: 0,
      y: -12,
      duration: 0.34,
      ease: "power2.in",
    });
    tl.to(
      state,
      {
        r: r + 40,
        duration: 1.0,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = state.r;
          const mask = `radial-gradient(circle at 50% 50%, transparent 0 ${v}px, #000 ${v + 6}px)`;
          el.style.webkitMaskImage = mask;
          el.style.maskImage = mask;
        },
      },
      "-=0.08"
    );

    /* Release the hero a third of the way into the iris, not at the end of it.
       Held to the end, the circle opens onto blank paper and the collage only
       starts dealing once the plate is gone — two animations queued back to
       back, with a dead beat between them. Overlapping them means the
       keepsakes are already arriving as the opening reaches them, which is the
       difference between a reveal and a wait. */
    tl.call(onReveal, undefined, "-=0.72");

    return undefined;
  }, [onReveal, onFinish]);

  /* ---- skip ----------------------------------------------------------- */
  useEffect(() => {
    // Anyone who has seen it once, or simply does not want to wait, should be
    // able to get past it. A portfolio that makes a hiring manager sit through
    // an animation twice is a portfolio that gets closed.
    const skip = () => leave();
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, [leave]);

  /* ---- hold the page still while it plays ------------------------------ */
  useEffect(() => {
    const { style } = document.body;
    const prev = style.overflow;
    style.overflow = "hidden";
    return () => {
      style.overflow = prev;
    };
  }, []);

  return (
    <div
      ref={overlay}
      /* pb pushes the optical centre up: the Figma frame sets the sentence's
         middle at 43% of the height, not 50%. A block of type centred by the
         numbers always reads slightly low. */
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#262626] px-6 pb-[13vh]"
      /* The typing is decorative — the sentence is announced once, whole, by
         the label below rather than letter by letter as it lands. */
      role="status"
      aria-label={LINE}
    >
      <div ref={panel} className="flex flex-col items-center gap-10">
        <TextType
          as="p"
          text={LINE}
          loop={false}
          /* ~110 WPM, which is the middle of the two speeds this went through:
             38ms a character (≈315 wpm) read as a terminal printing rather
             than a person, and 300ms (40 wpm, a comfortable human pace) put the
             sentence at 14 seconds — too long to hold anyone on a plate with no
             progress indicator. The geometric mean of the two is ~112 wpm; it
             is still recognisably someone typing, and it brings the whole intro
             in around seven seconds.

             The conversion is the standard one: a "word" is five characters, so
             110 wpm is 550 characters a minute, or 109ms between keystrokes.
             That gap also matters to the sound — the thock's tail runs 75-105ms,
             so at this pace each stroke still resolves before the next lands
             instead of smearing into a rattle.

             Scheduled at 95, not 109, because a setTimeout is a floor rather
             than a promise: React's render and commit add about 14ms per
             character on top of whatever is asked for. */
          typingSpeed={95}
          /* Human typing is uneven, and the unevenness is most of what sells
             it — a fixed interval reads as a metronome. Same ±30% spread as
             before, centred on the new value. */
          variableSpeed={{ min: 66, max: 124 }}
          initialDelay={320}
          showCursor
          cursorCharacter="|"
          cursorClassName="font-sans font-light text-white/50"
          cursorBlinkDuration={0.55}
          onCharacter={onCharacter}
          onComplete={() => window.setTimeout(leave, 520)}
          renderText={renderWithSwash}
          aria-hidden="true"
          /* Fixed width and a reserved height, so the plate never re-lays out
             while the sentence arrives. 540 is the Figma text box. */
          className="w-[540px] min-h-[112px] max-w-full text-center font-display text-[40px] leading-[56px] text-paper max-md:w-[320px] max-md:min-h-[68px] max-md:text-[24px] max-md:leading-[34px]"
        />
      </div>

      {/* Sound. Bottom-left so it is nowhere near where the eye is reading,
          and quiet enough to be ignored — this is an offer, not a demand. */}
      <button
        ref={soundBtn}
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          void toggleSound();
        }}
        aria-pressed={soundOn}
        className="absolute bottom-8 right-8 flex items-center gap-[7px] rounded-full border border-white/15 px-[13px] py-[7px] text-[12px] tracking-[0.02em] text-white/45 transition-colors duration-200 hover:border-white/30 hover:text-white/80 max-md:bottom-6 max-md:right-6"
      >
        <SpeakerIcon on={soundOn} />
        {soundOn ? "sound on" : "sound off"}
      </button>
    </div>
  );
}

/** The sentence, with the one ornamental capital the design asks for. */
function renderWithSwash(shown: string) {
  if (SWASH_AT < 0 || shown.length <= SWASH_AT) return shown;
  return (
    <>
      {shown.slice(0, SWASH_AT)}
      <span className="font-swash" style={{ letterSpacing: "2px" }}>
        {shown[SWASH_AT]}
      </span>
      {shown.slice(SWASH_AT + 1)}
    </>
  );
}

function SpeakerIcon({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-[13px]" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 3 4.5 5.5H2.5v5h2l3 2.5z" />
      {on ? (
        <>
          <path d="M10.2 6.1a2.6 2.6 0 0 1 0 3.8" />
          <path d="M12.1 4.4a5.1 5.1 0 0 1 0 7.2" />
        </>
      ) : (
        <path d="M10.5 6.5 13.5 9.5M13.5 6.5 10.5 9.5" />
      )}
    </svg>
  );
}
