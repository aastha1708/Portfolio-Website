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
 * Landing page — one band per background frame in Figma FINAL_VERSION
 * (394:1126):
 *   "Line grid/ section 1"        0 → 960    (hero, full graph grid)
 *   "Horizontal line/ section 2"  1025 → 1625 (note + plus boxes, rules only —
 *      note the deliberate plain-paper gaps around it)
 *   "Line grid/ section 3"        1704 → 3024 (projects)
 *
 * The footer dot field (3039 → end) is no longer a CSS band: DotGridMouse
 * draws the identical field on canvas so the dots can follow the cursor.
 */
export const LANDING_BANDS: Band[] = [
  { top: 0, height: 960, variant: "lines" },
  { top: 1025, height: 600, variant: "rules" },
  { top: 1704, height: 1320, variant: "lines" },
];

/**
 * About page (July 2026 revision) — the graph grid now runs the whole page:
 * hero, communities and favourites all sit on it (Frames 51 + 61 in the
 * file); dots start with the footer (Frame 88 at 1965).
 */
export const ABOUT_BANDS: Band[] = [
  { top: 0, height: 1915, variant: "lines" },
  { top: 1965, height: 560, variant: "dots" },
];
