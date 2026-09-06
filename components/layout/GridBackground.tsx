type Band = { top: number; height: number; variant: "fade" | "dots" };

const CLASS = {
  fade: "bg-grid-fade",
  dots: "bg-grid-dots",
} as const;

/**
 * Section-by-section page ruling. The graph grid is no longer a page-long
 * ground — it appears once, behind the hero, and fades out into plain paper
 * (see .bg-grid-fade in globals.css for why).
 */
export default function GridBackground({ bands }: { bands: Band[] }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bands.map((band) => (
        <div
          key={`${band.variant}-${band.top}`}
          className={`absolute inset-x-0 ${CLASS[band.variant]}`}
          style={{ top: band.top, height: band.height }}
        />
      ))}
    </div>
  );
}

/**
 * Landing page — Figma "Final version" frame 538:4602.
 *
 * Sept 2026: one masked band over the hero only. The hero group is -40 → 899
 * (HERO_GROUP in lib/collage-landing.ts); the band runs to 1000 so the mask's
 * lower falloff finishes inside the empty space above the How-I-Work panel
 * rather than behind its first line of type — 40 shorter than before, tracking
 * the hero's lift so the fade stays centred on the type.
 *
 * The footer dot field (2970 → end) is not a CSS band: DotGridMouse draws the
 * identical field on canvas so the dots can follow the cursor.
 */
export const LANDING_BANDS: Band[] = [{ top: 0, height: 1000, variant: "fade" }];
