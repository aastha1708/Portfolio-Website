/**
 * design/assets-source  ->  public/assets
 *
 * Converts raw Figma exports into web-ready files:
 *   PNG -> WebP, capped at 1200px wide
 *   MP4 -> H.264, capped at 1320px wide, audio stripped, + a WebP poster frame
 *
 * Filenames are lowercased and hyphenated so they're safe in URLs.
 * Re-runnable: existing outputs are overwritten.
 *
 *   node scripts/optimize-assets.mjs
 *
 * Requires ffmpeg on PATH for the video step (images work without it).
 */
import sharp from "sharp";
import { execFile } from "node:child_process";
import { readdir, mkdir, stat, rm } from "node:fs/promises";
import { promisify } from "node:util";
import path from "node:path";

const run = promisify(execFile);

const SOURCE = "design/assets-source";
const OUT = "public/assets";
const SECTIONS = { "Landing page": "landing", "About page": "about", "Kora page": "kora" };

const MAX_IMAGE_WIDTH = 1200;
const MAX_VIDEO_WIDTH = 1320;

const webName = (file) =>
  file
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[\s_]+/g, "-");

async function optimizeImage(input, output) {
  const meta = await sharp(input).metadata();
  await sharp(input)
    .resize({ width: Math.min(meta.width ?? MAX_IMAGE_WIDTH, MAX_IMAGE_WIDTH), withoutEnlargement: true })
    .webp({ quality: 84, effort: 6, alphaQuality: 90 })
    .toFile(output);
}

async function optimizeVideo(input, outputBase) {
  await run("ffmpeg", [
    "-y", "-loglevel", "error", "-i", input,
    "-an",
    "-vf", `scale='min(${MAX_VIDEO_WIDTH},iw)':-2`,
    "-c:v", "libx264", "-crf", "30", "-preset", "slow",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    `${outputBase}.mp4`,
  ]);

  // Poster frame, used as the video's poster and as the reduced-motion still.
  const tmp = `${outputBase}-poster.png`;
  await run("ffmpeg", [
    "-y", "-loglevel", "error", "-i", input,
    "-frames:v", "1", "-vf", `scale='min(${MAX_VIDEO_WIDTH},iw)':-2`, tmp,
  ]);
  await sharp(tmp).webp({ quality: 82 }).toFile(`${outputBase}-poster.webp`);
  await rm(tmp, { force: true });
}

let before = 0;
let after = 0;
let hasFfmpeg = true;

try {
  await run("ffmpeg", ["-version"]);
} catch {
  hasFfmpeg = false;
  console.warn("! ffmpeg not found — skipping video conversion\n");
}

async function processDir(from, to) {
  await mkdir(to, { recursive: true });

  let files;
  try {
    files = await readdir(from, { withFileTypes: true });
  } catch {
    console.warn(`! missing ${from} — skipped`);
    return;
  }

  for (const entry of files.sort((a, b) => a.name.localeCompare(b.name))) {
    const file = entry.name;
    const input = path.join(from, file);

    // Recurse into subfolders (e.g. "Landing page/New_ver" -> landing/new-ver).
    // "Old_ver" archives are skipped: their outputs already live at the section root.
    if (entry.isDirectory()) {
      if (/^old[-_ ]?ver/i.test(file)) continue;
      await processDir(input, path.join(to, webName(file)));
      continue;
    }

    const ext = path.extname(file).toLowerCase();
    if (![".png", ".jpg", ".jpeg", ".mp4"].includes(ext)) continue;

    before += (await stat(input)).size;
    const base = path.join(to, webName(file));

    if (ext === ".mp4") {
      if (!hasFfmpeg) continue;
      await optimizeVideo(input, base);
      after += (await stat(`${base}.mp4`)).size + (await stat(`${base}-poster.webp`)).size;
      console.log(`${webName(file)}.mp4 + poster`);
    } else {
      await optimizeImage(input, `${base}.webp`);
      after += (await stat(`${base}.webp`)).size;
      console.log(`${webName(file)}.webp`);
    }
  }
}

for (const [sourceDir, outDir] of Object.entries(SECTIONS)) {
  await processDir(path.join(SOURCE, sourceDir), path.join(OUT, outDir));
}

const mb = (n) => (n / 1048576).toFixed(1);
console.log(`\n${mb(before)}MB -> ${mb(after)}MB`);
