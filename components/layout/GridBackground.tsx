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

/** Landing page: hero grid -> rules -> work grid -> fading dots. */
export const LANDING_BANDS: Band[] = [
  { top: 0, height: 960, variant: "lines" },
  { top: 960, height: 787, variant: "rules" },
  { top: 1747, height: 1292, variant: "lines" },
  { top: 3039, height: 618, variant: "dots" },
];

/** About page: grid through the content, dots behind the footer. */
export const ABOUT_BANDS: Band[] = [
  { top: 0, height: 2137, variant: "lines" },
  { top: 2137, height: 560, variant: "dots" },
];
