/**
 * public/assets/landing/new-ver/*.webp  ->  .../die-cut/*.webp
 *
 * Wraps each hero keepsake in a white die-cut border so the peel reads as
 * vinyl lifting off the page rather than a photograph curling. Without it the
 * hard cut-outs (camera, cloud, latte, cat, heart) have no edge for the curl
 * to catch the light on, and the effect looks like a glitch instead of a
 * sticker.
 *
 *   node scripts/die-cut-stickers.mjs
 *
 * Method: threshold the alpha channel, blur it, then re-ramp it. The blur is
 * what makes it a *die* cut — it rounds off the tight concavities a plotter
 * blade could never follow (between the cat's ears, inside the latte handle),
 * which is exactly what a real sticker die does. A plain morphological dilate
 * traces every jag of the alpha mask and looks machine-made.
 *
 * The border is a constant width IN RENDERED PIXELS, not a constant fraction
 * of each file, so all eight read as one set even though the sources range
 * from 424px to 895px wide. Each asset is padded by the same amount so the
 * artwork inside keeps its Figma footprint and the border grows outward —
 * the renderer expands every plane by BORDER_PX on all four sides to match.
 *
 * Re-runnable: outputs are overwritten.
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const DIR = "public/assets/landing/new-ver";
const OUT = path.join(DIR, "die-cut");

/** Border half-width in CANVAS px (the 1440-wide hero stage). Must match
 *  DIE_CUT_BLEED in lib/collage-landing.ts. */
const BORDER_PX = 5;

/** Output resolution, as a multiple of the sticker's canvas footprint.
 *
 *  These are WebGL textures now, and the peel renderer runs them WITHOUT
 *  mipmaps on purpose (see StickerPeelCanvas). Without mipmaps a texture much
 *  larger than its footprint aliases, so the export is sized for the job
 *  instead: 2.6x covers a 2x display with headroom and still has something
 *  left over for a 3x one. It also takes the eight files from ~500kB to
 *  ~150kB, which the hero notices more than any of this. */
const OUT_SCALE = 2.6;

/** Rendered footprint of each keepsake, mirrored from HERO_ITEMS in
 *  lib/collage-landing.ts. Kept here so the script stays dependency-free;
 *  if a box changes in Figma, change it here too and re-run. */
const ITEMS = [
  { file: "55-1.webp", box: [116, 102] },     // camera
  { file: "55-2.webp", box: [91.8, 80.8] },   // pressed flower
  { file: "55-3.webp", box: [81, 65] },       // cloud
  { file: "55-4.webp", box: [131.3, 126.4] }, // headphones
  { file: "55-5.webp", box: [111, 108] },     // latte
  { file: "56-1.webp", box: [115, 120] },     // milo
  { file: "56-2.webp", box: [87.4, 91.5] },   // polaroid
  { file: "56-3.webp", box: [76.3, 79.9] },   // origami heart
];

await mkdir(OUT, { recursive: true });

for (const { file, box } of ITEMS) {
  const src = path.join(DIR, file);
  const input = await readFile(src);
  const meta = await sharp(input).metadata();

  // Source px per canvas px, averaged over both axes — the two agree to
  // within a couple of percent because both derive from the same export.
  const scale = (meta.width / box[0] + meta.height / box[1]) / 2;
  const borderPx = BORDER_PX * scale;        // border width in source px
  const pad = Math.ceil(borderPx * 1.3);     // canvas room, with headroom

  const padded = await sharp(input)
    .ensureAlpha()
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const W = meta.width + pad * 2;
  const H = meta.height + pad * 2;

  /* Three passes, because smoothing and expanding want different radii:
       1. threshold(170) drops the soft anti-aliased fringe so the outline
          traces solid artwork, not its halo.
       2. blur(smooth) -> threshold(128) rounds the outline WITHOUT moving it
          (a Gaussian's 50% point stays put). This is the die: it rounds the
          concavities a blade could not follow, erases thin slivers like the
          ghost wisp under the cloud, and irons out the polygonal lasso edge
          on the pressed flower's cream halo.
       3. blur(border) -> re-ramp at 15% grey pushes the edge out by ~1.04x
          sigma, so sigma IS the border width. The linear() ramp leaves ~1.5px
          of anti-aliasing; a bare threshold() gives a stair-stepped outline.
     Doing 2 and 3 in one pass would tie how smooth the die is to how thick
     the border is, and a 5px border is nowhere near enough blur to round a
     20px facet. */
  const border = Math.max(0.4, borderPx);
  const smooth = border * 1.6;
  const ramp = Math.max(1, 1.68 * border);
  const mask = await sharp(padded)
    .extractChannel("alpha")
    .threshold(170)
    .blur(smooth)
    .threshold(128)
    .blur(border)
    .linear(ramp, -38 * ramp)
    .raw()
    .toBuffer();

  const backing = await sharp({
    create: { width: W, height: H, channels: 3, background: { r: 255, g: 255, b: 255 } },
  })
    .joinChannel(mask, { raw: { width: W, height: H, channels: 1 } })
    .png()
    .toBuffer();

  // Footprint on the 1440 canvas, border included — the same number
  // lib/collage-landing.ts arrives at by adding DIE_CUT_BLEED to the box.
  const targetW = Math.round((box[0] + BORDER_PX * 2) * OUT_SCALE);

  // Two calls, not one chain: sharp resizes before it composites, which would
  // shrink the backing out from under the full-size artwork.
  const full = await sharp(backing)
    .composite([{ input: padded, blend: "over" }])
    .png()
    .toBuffer();

  const out = await sharp(full)
    .resize({ width: targetW, kernel: "lanczos3" })
    .webp({ quality: 92, alphaQuality: 100, effort: 6 })
    .toBuffer();

  const dest = path.join(OUT, file);
  await writeFile(dest, out);
  const outMeta = await sharp(out).metadata();
  console.log(
    `${file.padEnd(12)} ${meta.width}x${meta.height} -> ${outMeta.width}x${outMeta.height}` +
      `  (${(box[0] + BORDER_PX * 2).toFixed(0)}px canvas @${OUT_SCALE}x)` +
      `  ${(input.length / 1024).toFixed(0)}kB -> ${(out.length / 1024).toFixed(0)}kB`,
  );
}

console.log(`\nWrote ${ITEMS.length} die-cut stickers to ${OUT}`);
