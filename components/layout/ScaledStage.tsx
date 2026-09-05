"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";

/** Current stage scale, for children that translate pointer deltas into
 *  canvas px (e.g. draggable collage stickers). 1 outside a ScaledStage. */
const StageScaleContext = createContext(1);
export const useStageScale = () => useContext(StageScaleContext);

/**
 * The Figma canvas is a fixed 1440 x H composition with hand-placed objects.
 * Rather than approximate that with fluid layout (which would break the
 * collage), we render it at exactly 1440 and scale it to fit narrower desktop
 * viewports. Below the `lg` breakpoint the caller renders a purpose-built
 * mobile layout instead (`max-lg:hidden` / `lg:hidden` on the two branches).
 *
 * THE SCALE IS NEVER CLAMPED. It used to be — `Math.max(available / width,
 * 1024 / width)` — so the stage would never render narrower than the mobile
 * cutover. That clamp assumed the container and the viewport are the same
 * width, and they are not: a media query measures the viewport, this measures
 * the content box, and a classic scrollbar puts ~15px between them. In that gap
 * the desktop branch is live (viewport 1024) while the container is only 1009,
 * so the clamp produced a 1024-wide stage inside a 1009-wide box. `mx-auto` has
 * no room to centre an element wider than its parent, so it pinned left and
 * `transform-origin: top center` then threw the whole composition ~200px to the
 * right — the nav's right-hand end, now the CTA, was clipped clean off the
 * page.
 *
 * Fitting the container instead costs at most those 15px of extra shrink at one
 * exact width, and the clamp was never what kept the mobile layout away — the
 * breakpoint is.
 */
export default function ScaledStage({
  width = 1440,
  height,
  children,
}: {
  width?: number;
  height: number;
  children: ReactNode;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const measure = () => {
      const available = el.clientWidth;
      // 0 before first layout — scaling to 0 would flash an empty page.
      if (!available) return;
      setScale(Math.min(available / width, 1));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={wrapper} className="w-full overflow-hidden">
      <div style={{ height: height * scale }} className="relative mx-auto" >
        {/* transform-origin is top LEFT, and that is the whole ballgame.
            A transform does not change an element's layout box: this div is
            1440 wide whatever the scale, so on any viewport under 1440 it
            overflows its parent and `margin: auto` — which has no room to
            centre an over-wide box — collapses to zero. It used to scale about
            `top center`, i.e. about x=720 of that 1440 layout box, which is not
            the centre of the screen once the box overflows. The composition
            stayed pinned to 720 and drifted right by (1440 - viewport) / 2 at
            every width below 1440: ~80px at 1280, ~208px at 1024, where it took
            the right-hand end of the nav off the page with it.

            Scaling from the left corner instead makes the painted content span
            0 → 1440 * scale, which is exactly the container. And when the
            viewport is 1440 or wider the scale is 1, the box no longer
            overflows, and `margin: auto` centres it the normal way. */}
        <div
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="relative"
        >
          <StageScaleContext.Provider value={scale}>{children}</StageScaleContext.Provider>
        </div>
      </div>
    </div>
  );
}
