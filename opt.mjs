import sharp from "sharp";
import { readdir, mkdir, stat } from "fs/promises";
import path from "path";

const jobs = [
  ["Assets/Landing page", "public/assets/landing"],
  ["Assets/About page", "public/assets/about"],
];
const MAX = 1200;
let before = 0, after = 0;

for (const [src, dest] of jobs) {
  await mkdir(dest, { recursive: true });
  for (const f of await readdir(src)) {
    if (!f.toLowerCase().endsWith(".png")) continue;
    const inPath = path.join(src, f);
    before += (await stat(inPath)).size;
    const out = path.join(dest, f.replace(/\.png$/i, ".webp").toLowerCase().replace(/[\s_]+/g, "-"));
    const img = sharp(inPath);
    const meta = await img.metadata();
    await img
      .resize({ width: Math.min(meta.width ?? MAX, MAX), withoutEnlargement: true })
      .webp({ quality: 84, effort: 6, alphaQuality: 90 })
      .toFile(out);
    after += (await stat(out)).size;
    console.log(path.basename(out).padEnd(28), ((await stat(out)).size / 1024).toFixed(0) + "kb");
  }
}
console.log(`\nTOTAL ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB`);
