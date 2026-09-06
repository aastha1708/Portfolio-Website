"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "motion/react";
import IntroLoader from "@/components/layout/IntroLoader";
import { SESSION_KEY, markIntroDone } from "@/lib/intro";

/**
 * Decides whether the intro runs, and gets out of the way if not.
 *
 * Three rules, in order:
 *
 *  1. ONCE PER SESSION. The whole point of an intro is the first impression;
 *     the second time it is a toll. Whether it played or was skipped, the
 *     session is marked, so navigating to /about and back never replays it.
 *
 *  2. LANDING PAGE ONLY. The reveal opens onto the hero — that is the payoff.
 *     Opening an iris onto the third paragraph of a case study is not the same
 *     gesture, and someone arriving on a deep link followed a link to read
 *     something specific. They get the page they asked for.
 *
 *  3. NOT UNDER REDUCED MOTION. A full-screen animated takeover is exactly what
 *     that setting is asking not to happen.
 *
 * The decision runs in an effect rather than during render, because all three
 * inputs (sessionStorage, the media query) only exist on the client, and the
 * server and first client render have to agree.
 */
export default function IntroGate() {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [show, setShow] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (decided) return;

    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* private mode — treat as unseen */
    }

    const play = !seen && !reduceMotion && pathname === "/";
    setShow(play);
    setDecided(true);
    // Marked immediately when we are NOT playing; the loader marks it itself
    // on the way out, so the hero stays held until the iris opens.
    if (!play) markIntroDone();
  }, [decided, pathname, reduceMotion]);

  if (!show) return null;
  return (
    <IntroLoader
      onReveal={markIntroDone}
      onFinish={() => setShow(false)}
    />
  );
}
