/**
 * Torn-paper section break.
 *
 * NOTE: the Figma design uses raster edges ("image 3" / "image 4", nodes
 * 246:2645 / 246:2644). Those aren't in the Assets folder yet — export them and
 * drop them at /public/assets/landing/torn-edge.webp to swap this out.
 * Until then this is a close SVG stand-in at the same 53px height.
 */
export default function TornDivider({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div aria-hidden className={`pointer-events-none w-full ${className}`} style={{ height: 53 }}>
      <svg
        viewBox="0 0 1440 53"
        preserveAspectRatio="none"
        className="size-full"
        style={flip ? { transform: "scaleY(-1)" } : undefined}
      >
        <path
          d="M0 26 C 60 14, 120 38, 180 27 S 300 12, 360 25 S 480 41, 540 28 S 660 13, 720 26 S 840 40, 900 27 S 1020 12, 1080 25 S 1200 39, 1260 27 S 1380 14, 1440 26 L1440 53 L0 53 Z"
          fill="#efece4"
        />
        <path
          d="M0 26 C 60 14, 120 38, 180 27 S 300 12, 360 25 S 480 41, 540 28 S 660 13, 720 26 S 840 40, 900 27 S 1020 12, 1080 25 S 1200 39, 1260 27 S 1380 14, 1440 26"
          fill="none"
          stroke="#e2ddd1"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
