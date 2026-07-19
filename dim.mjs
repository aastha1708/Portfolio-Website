import sharp from "sharp";
import { readdir } from "fs/promises";
for (const d of ["Assets/Landing page", "Assets/About page"]) {
  console.log("== " + d);
  for (const f of (await readdir(d)).filter(f => f.endsWith(".png")).sort()) {
    const m = await sharp(`${d}/${f}`).metadata();
    console.log(`${f.padEnd(30)} ${String(m.width).padStart(5)}x${String(m.height).padEnd(5)} ar=${(m.width/m.height).toFixed(4)}`);
  }
}
