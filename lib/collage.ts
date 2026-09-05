/** Shared shape for every positioned object in the hero collage. */
export type CollageItem = {
  id: string;
  src: string;
  alt: string;
  /** Footprint on the 1440 canvas, un-rotated, INCLUDING the die-cut border. */
  box: { left: number; top: number; width: number; height: number };
  rotate?: number;
  /** Which edge peels, in degrees clockwise from the top. */
  peel?: number;
  href?: string;
  /** Richer interaction recorded in Figma, not yet built. */
  planned?: string;
};
