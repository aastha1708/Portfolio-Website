# Aastha Singh — Portfolio 2026

Next.js 16 · TypeScript · Tailwind v4 · Motion

```bash
npm run dev      # http://localhost:3000
npm run build    # production build
npm run typecheck
```

## Where things live

| Path | What |
|---|---|
| `lib/collage-landing.ts` | Hero collage — every object's position, rotation and crop |
| `lib/collage-about.ts` | About hero photo wall |
| `lib/projects.ts` | Project cards, including their scatter geometry |
| `lib/about.ts` | Community cards + the favourites carousel categories |
| `app/globals.css` | Design tokens (`@theme`), paper grid, paper shadow, chip |
| `components/layout/Cursor.tsx` | Custom cursor |

**Moving a collage object is a one-line edit** in the relevant `lib/` file. No component changes.

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

## Open items

- **Torn dividers** — currently an SVG stand-in (`components/layout/TornDivider.tsx`), pending better assets.
- **Paper wash behind the footer** — the Figma texture isn't exported, so this is a plain gradient for now.
- **About footer position** — vertical offset within Frame 88 is estimated, not read from Figma.
- **Planned interactions** — recorded as `planned` fields in `lib/collage-landing.ts`, straight from the Figma annotations: postcard opens, book page flip, coffee ice sound, Spotify now-playing, and the camera → visitor gallery idea.
- **Case study pages** — project cards carry a "View case study" cursor but have nowhere to go yet.
