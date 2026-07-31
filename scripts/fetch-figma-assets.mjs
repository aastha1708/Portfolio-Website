/**
 * Downloads the new Figma assets (July 2026 design update) straight into
 * public/assets as optimized WebP.
 *
 *   node scripts/fetch-figma-assets.mjs
 *
 * The URLs come from the Figma MCP asset server and EXPIRE ~7 DAYS after
 * they were generated (2026-07-31). If a download 403s, re-open the file in
 * Figma and re-export the node listed next to it (design/assets-source works
 * with optimize-assets.mjs as usual).
 *
 * Requires network access + sharp (already a devDependency).
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

/** output path (webp, under public/assets) -> { url, node, max } */
const ASSETS = {
  // ---- About: favourites carousel covers -------------------------------
  "about/movie-the-medium.webp":      { url: "https://www.figma.com/api/mcp/asset/f0154127-347b-4d85-95b4-4c82d7d70577", node: "329:282", max: 520 },
  "about/movie-pursuit.webp":         { url: "https://www.figma.com/api/mcp/asset/29ac9012-ff11-430e-9bd4-b690a69e3d77", node: "329:287", max: 520 },
  "about/movie-jab-we-met.webp":      { url: "https://www.figma.com/api/mcp/asset/78905b7a-787b-476f-b14c-ca35d2447fe4", node: "329:293", max: 520 },
  "about/movie-htlagi10d.webp":       { url: "https://www.figma.com/api/mcp/asset/a356d21a-6a3a-45ff-af12-9bae5fd117d4", node: "329:299", max: 520 },
  "about/show-modern-family.webp":    { url: "https://www.figma.com/api/mcp/asset/30b2c01d-52bf-45c2-aa1c-3a6e501e68ca", node: "327:186", max: 520 },
  "about/show-iwtv.webp":             { url: "https://www.figma.com/api/mcp/asset/47e3408e-8ada-4ec6-a42a-f9527e15b6bc", node: "327:191", max: 520 },
  "about/show-first-frost.webp":      { url: "https://www.figma.com/api/mcp/asset/d3ddf75b-6e91-4ce8-aaf4-d416e1c0bac4", node: "327:197", max: 520 },
  "about/show-b99.webp":              { url: "https://www.figma.com/api/mcp/asset/a6d8b685-c631-43b7-8833-54820ba63e77", node: "327:203", max: 520 },
  "about/anime-naruto.webp":          { url: "https://www.figma.com/api/mcp/asset/5bafca4d-a80c-4a2d-a030-ed73cd91fafd", node: "330:316", max: 520 },
  "about/anime-fruits-basket.webp":   { url: "https://www.figma.com/api/mcp/asset/28b6b6f8-6d62-4941-9ede-2e9bdd9411b4", node: "330:321", max: 520 },
  "about/anime-haikyuu.webp":         { url: "https://www.figma.com/api/mcp/asset/721397f4-bc70-4fc7-9aee-faa0db125793", node: "330:327", max: 520 },
  "about/anime-spy-x-family.webp":    { url: "https://www.figma.com/api/mcp/asset/e7a5af52-5fd5-4bc5-8eea-d5bbafc58deb", node: "330:333", max: 520 },
  "about/album-sept-5th.webp":        { url: "https://www.figma.com/api/mcp/asset/452e2d0b-67dd-4789-abce-34f1e344245c", node: "327:223", max: 720 },
  "about/album-fatal-love.webp":      { url: "https://www.figma.com/api/mcp/asset/4c048e4d-0b61-49ac-8d28-4019b7511824", node: "328:264", max: 720 },
  "about/album-mind-of-mine.webp":    { url: "https://www.figma.com/api/mcp/asset/47f853a3-5f6d-4ce5-ba0b-6ea2f2f7a5b2", node: "328:270", max: 720 },

  // ---- About: experience row logos ------------------------------------
  "about/them-logo.webp":             { url: "https://www.figma.com/api/mcp/asset/acc06ee2-2c39-4b5c-a11f-fa9c69a1f129", node: "330:397", max: 168 },
  "about/iiitd-logo.webp":            { url: "https://www.figma.com/api/mcp/asset/97dedc98-a4e9-41f7-ab50-017237a5ae5c", node: "330:426", max: 168 },

  // ---- Kora case study --------------------------------------------------
  "kora/kora-hero.webp":              { url: "https://www.figma.com/api/mcp/asset/e0f998c1-8322-4927-85d8-725c30913d39", node: "345:756", max: 2152 },
  "kora/kora-logo.webp":              { url: "https://www.figma.com/api/mcp/asset/32eaa9f3-7f21-4ac9-9ded-a70bca6461fe", node: "356:821", max: 148 },
  "kora/kora-features-phone.webp":    { url: "https://www.figma.com/api/mcp/asset/8b2a5e97-4a39-4c89-9601-85cb7a93d06d", node: "364:1029", max: 620 },
  "kora/kora-screen-1.webp":          { url: "https://www.figma.com/api/mcp/asset/2b8dcf0c-9fe1-4826-bc25-48daa4c78b69", node: "364:1081", max: 560 },
  "kora/kora-screen-2.webp":          { url: "https://www.figma.com/api/mcp/asset/54ff97c9-00c1-49d6-8547-9a2dab0f0b9b", node: "364:1087", max: 560 },
  "kora/kora-screen-3.webp":          { url: "https://www.figma.com/api/mcp/asset/e7f0d6a6-38ca-4af4-8448-1b1a61fe5c79", node: "364:1090", max: 560 },
  "kora/kora-screen-4.webp":          { url: "https://www.figma.com/api/mcp/asset/7bf33f4e-fd5e-421a-b0e7-f7daf52d8806", node: "364:1100", max: 560 },
  "kora/kora-screen-5.webp":          { url: "https://www.figma.com/api/mcp/asset/e1e0a77e-1094-4e8e-b7b7-06932ec233e5", node: "364:1103", max: 560 },
  "kora/kora-screen-6.webp":          { url: "https://www.figma.com/api/mcp/asset/3246e5a0-9ec0-4fb1-8bc9-a7ef2b21d5d6", node: "364:1106", max: 560 },
};

const OUT = "public/assets";
let ok = 0;
let failed = 0;

for (const [rel, { url, node, max }] of Object.entries(ASSETS)) {
  const out = path.join(OUT, rel);
  await mkdir(path.dirname(out), { recursive: true });
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize({ width: max, withoutEnlargement: true })
      .webp({ quality: 84, effort: 6, alphaQuality: 90 })
      .toFile(out);
    ok++;
    console.log(`✓ ${rel}`);
  } catch (err) {
    failed++;
    console.error(`✗ ${rel} — ${err.message} (re-export Figma node ${node})`);
  }
}

console.log(`\n${ok} downloaded${failed ? `, ${failed} FAILED (URLs expire ~7 days after generation)` : ""}`);
