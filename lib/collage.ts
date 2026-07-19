/** Shared shape for every positioned object in a collage — hero and about alike. */
export type CollageItem = {
  id: string;
  src: string;
  alt: string;
  /** Visual footprint on the canvas. */
  box: { left: number; top: number; width: number; height: number };
  rotate?: number;
  /** Inset in px, for logo marks that sit inside a larger padded frame. */
  pad?: { x: number; y: number } | { top: number; right: number; bottom: number; left: number };
  cursor?: string;
  href?: string;
  /** Continuous idle sway (Figma note: "little movement"). */
  idle?: boolean;
  /** Pointer-following magnetism strength, 0–1. */
  magnetic?: number;
  /** Depth for the parallax layer — higher moves more. */
  depth?: number;
  /** Richer interaction recorded in Figma, not yet built. */
  planned?: string;
};
