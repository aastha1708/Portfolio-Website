type Band = { top: number; height: number; variant: "lines" | "rules" | "dots" };

const CLASS = {
  lines: "bg-grid-lines",
  rules: "bg-grid-rules",
  dots: "bg-grid-dots",
} as const;

/**
 * Section-by-section page ruling, matching the Figma file: the hero and work
 * sections sit on a full graph grid, the philosophy note on horizontal rules
 * only, and the footer on a dot field that fades in toward the bottom.
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
 * Landing page — Figma "Final version" frame 538:4602. The August 2026 design
 * dropped the horizontal-rules band that used to sit behind the philosophy
 * note, so the graph grid now runs unbroken from the top of the hero to the
 * bottom of the work section:
 *   "Line grid/ section 1"  0 → 1764
 *   "Line grid/ section 3"  1704 → 3024   (the two overlap by 60 in the file)
 *
 * Rendered as one band rather than two, because two overlapping translucent
 * bands would double the ruling's alpha across the seam.
 *
 * The footer dot field (2970 → end) is not a CSS band: DotGridMouse draws the
 * identical field on canvas so the dots can follow the cursor.
 */
export const LANDING_BANDS: Band[] = [{ top: 0, height: 3024, variant: "lines" }];

/**
 * About page (July 2026 revision) — the graph grid runs the whole page:
 * hero, communities and favourites all sit on it (Frames 51 + 61 in the
 * file). The footer's dot field (from 1965) is no longer a CSS band here
 * either: DotGridMouse draws it so the dots follow the cursor, exactly as on
 * the landing page.
 */
export const ABOUT_BANDS: Band[] = [{ top: 0, height: 1915, variant: "lines" }];
