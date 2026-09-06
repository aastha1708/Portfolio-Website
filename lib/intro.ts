"use client";

import { useSyncExternalStore } from "react";

/**
 * One bit of state — "has the intro finished?" — shared between the loader in
 * the root layout and the hero, which are on opposite ends of the tree.
 *
 * A module store rather than a React context, for two reasons. The value is
 * read once by one component and never re-read, so a provider would wrap the
 * whole app to serve a single consumer. And it needs to be readable during the
 * hero's FIRST render, before any effect has run — otherwise the deal-out
 * starts under the overlay and the reveal opens onto a hero that has already
 * finished arriving.
 *
 * SESSION_KEY is what stops the intro on a second page view. It is set the
 * moment the gate decides — played or skipped — so navigating to /about and
 * back never triggers it mid-session.
 */

export const SESSION_KEY = "intro-played";

let done = false;
const listeners = new Set<() => void>();

/** Called by the gate, whether the intro ran or was skipped. */
export function markIntroDone() {
  if (done) return;
  done = true;
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* private mode — the intro simply plays again next load */
  }
  for (const l of listeners) l();
}

/**
 * FAILSAFE. The hero holds its entrance until this store says the intro is out
 * of the way, which means a bug in the loader — a GSAP error, an exception in
 * the gate's effect — would leave the collage at opacity 0 and the landing page
 * looking blank. Nothing about an intro is worth that, so the release happens
 * on a timer no matter what. It is deliberately far longer than the intro
 * (~4s), so it only ever fires when something has genuinely gone wrong; on a
 * normal load markIntroDone has already run and this is a no-op.
 */
if (typeof window !== "undefined") {
  setTimeout(markIntroDone, 8000);
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/**
 * Whether the hero is clear to animate.
 *
 * The server snapshot is `false` on purpose: the server cannot know whether
 * this visitor has seen the intro, and the two renders have to agree or React
 * flags a hydration mismatch. It flips on the client in an effect a beat later,
 * which is exactly when the hero should start moving anyway.
 */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => false);
}
