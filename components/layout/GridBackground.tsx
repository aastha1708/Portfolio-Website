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
 * Landing page — one band per background frame in the Figma file:
 *   "Line grid/ section 1"        0 → 960   (hero, full graph grid)
 *   "Horizontal line/ section 2"  1105 → 1705 (philosophy, rules only —
 *      note the deliberate plain-paper gaps around it)
 *   "Line grid/ section 3"        1760 → 3080 (projects)
 *   "Dotted bg/ section 4"        3039 → end  (footer dot field)
 */
export const LANDING_BANDS: Band[] = [
  { top: 0, height: 960, variant: "lines" },
  { top: 1105, height: 600, variant: "rules" },
  { top: 1760, height: 1320, variant: "lines" },
  { top: 3039, height: 618, variant: "dots" },
];

/**
 * About page — per the file, the graph grid stops at the hero (Frame 51,
 * 0 → 960); communities and favourites sit on plain paper; dots start with
 * the footer (Frame 88 at 2137).
 */
export const ABOUT_BANDS: Band[] = [
  { top: 0, height: 960, variant: "lines" },
  { top: 2137, height: 560, variant: "dots" },
];
