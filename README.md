# Aastha Singh — Portfolio 2026

Next.js 16 · TypeScript · Tailwind v4 · Motion

```bash
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm run assets     # re-optimize design/assets-source -> public/assets
```

## Layout

```
app/          routes, root layout, globals.css
components/
  about/      community cards, favourites carousel
  collage/    hero collage + the generic positioned-object renderer
  layout/     nav, cursor, footer, grids, dividers, scaled stage
  motion/     Reveal, SplitText, useMagnetic
  work/       project grid + card
lib/          all content and geometry data (no JSX)
public/       optimized, web-ready assets — generated, do not edit by hand
scripts/      asset optimization pipeline
design/       source material, not shipped
  assets-source/   raw Figma exports (tracked — source of truth)
  inspirations/    reference captures (gitignored, ~436MB)
  versions/        earlier landing page iterations (gitignored)
  brief.md         original visual & interaction brief
```

### Content lives in `lib/`, never in components

| File | What |
|---|---|
| `lib/collage.ts` | Shared `CollageItem` type |
| `lib/collage-landing.ts` | Hero collage — every object's position, rotation, depth, cursor label |
| `lib/collage-about.ts` | About hero photo wall |
| `lib/projects.ts` | Project cards, including their scatter geometry |
| `lib/about.ts` | Community cards + favourites carousel categories |

**Moving a collage object, adding a project, or changing a cursor label is a one-line edit** in `lib/`. No component changes.

## Assets

Drop new exports into `design/assets-source/Landing page` or `/About page`, then:

```bash
npm run assets
```

PNGs become WebP capped at 1200px; MP4s are re-encoded (audio stripped, capped at 1320px) with a WebP poster frame. Filenames are lowercased and hyphenated — `Kora_thumbnail.png` becomes `kora-thumbnail.webp`, which is the name you reference from `lib/`. Currently 32.4MB of source compresses to 2.6MB shipped.

Never edit `public/assets` by hand; it's regenerated.

## Custom cursor

Any element opts in with markup — no changes to `Cursor.tsx` needed:

```html
<a data-cursor="hover">                                    <!-- circle expands -->
<a data-cursor="label" data-cursor-text="View case study">  <!-- expands + shows text -->
```

Disabled on touch devices and under `prefers-reduced-motion`, where the native cursor returns.

## Fonts

- **Homemade Apple** and **IBM Plex Serif** — free, loaded via `next/font/google`. Nothing to do.
- **Jimmy Script** — used only by the `aastha singh` wordmark and `hi, I am aastha`. Commercial licence required ([tomchalky.com](https://tomchalky.com/jimmy-script-font-duo/)). Drop `JimmyScript.woff2` into `public/fonts/` and it activates automatically. Until then it falls back to Homemade Apple.
- **Neue Montreal** — body/UI font throughout. Needs a webfont licence ([Pangram Pangram](https://pangrampangram.com/products/neue-montreal)). Drop `NeueMontreal-Regular.woff2` and `NeueMontreal-Medium.woff2` into `public/fonts/`. Falls back to Inter/system sans.

## Responsive

Desktop renders the exact 1440px Figma composition, scaled proportionally between 1024–1440px (`ScaledStage`). Below 1024px both pages switch to a purpose-built layout — the hero collage becomes a curated cluster of six objects rather than all eighteen.

## Section grounds

Base colour is `#F5F5F5` throughout. Each section carries its own ruling, defined in
`components/layout/GridBackground.tsx` and driven by CSS gradients (no images):

| Section | Ruling |
|---|---|
| Hero | Full graph grid — vertical + horizontal |
| Philosophy / sticky note | Horizontal rules only |
| Work | Full graph grid |
| Footer | Dot field, fading in toward the bottom |

## Motion

| Where | What |
|---|---|
| Wordmark | Per-character rise on load (`SplitText`) |
| Hero collage | Staggered entrance, pointer parallax by object depth, idle sway on the flowers |
| Tool logos | Magnetic hover (`useMagnetic`, strength 0.35) |
| Nav | Underline wipe, magnetic links |
| Sections | Scroll reveal, fires once (`Reveal`) |
| Project cards | Lift, image push-in, tape strip peel |
| Routes | Cross-fade (`app/template.tsx`) |

Everything above is bypassed under `prefers-reduced-motion`.

## Open items

- **Torn dividers** — SVG stand-in (`components/layout/TornDivider.tsx`), by your call.
- **About footer position** — vertical offset within Frame 88 is estimated, not read from Figma.
- **Planned interactions** — recorded as `planned` fields in `lib/collage-landing.ts`, straight from the Figma annotations: postcard opens, book page flip, coffee ice sound, Spotify now-playing, and the camera → visitor gallery idea.
- **Case study pages** — project cards carry a "View case study" cursor but have nowhere to go yet.
