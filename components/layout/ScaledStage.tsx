"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The Figma canvas is a fixed 1440 x H composition with hand-placed objects.
 * Rather than approximate that with fluid layout (which would break the collage),
 * we render it at exactly 1440 and scale it to fit narrower desktop viewports.
 * Below `minWidth` the caller renders a purpose-built mobile layout instead.
 */
export default function ScaledStage({
  width = 1440,
  height,
  minWidth = 1024,
  children,
}: {
  width?: number;
  height: number;
  minWidth?: number;
  children: ReactNode;
}) {
  const wrapper = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;
    const measure = () => {
      const available = el.clientWidth;
      setScale(available >= width ? 1 : Math.max(available / width, minWidth / width));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, minWidth]);

  return (
    <div ref={wrapper} className="w-full overflow-hidden">
      <div style={{ height: height * scale }} className="relative mx-auto" >
        <div
          style={{
            width,
            height,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          className="relative"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
