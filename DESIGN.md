---
name: Aastha Singh — Portfolio 2026
description: A warm, tactile scrapbook-desk portfolio where analog materials meet precise digital craft.
colors:
  ink: "#000000"
  ink-muted: "#666666"
  footer-body: "#404040"
  paper: "#f5f5f5"
  card-surface: "#f5f4f1"
  community-surface: "#f0efea"
  dusty-rose-tint: "#ffd5e4"
  raspberry-ink: "#9e3950"
  grid-line: "#e4e4e4"
  grid-dot: "#cfcfcf"
  hairline: "#dddddd"
  dashed-rule: "#888888"
typography:
  wordmark:
    fontFamily: "Jimmy Script, var(--font-homemade-apple), cursive"
    fontSize: "102px"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "normal"
  display:
    fontFamily: "Canela Text, var(--font-ibm-plex-serif), Georgia, serif"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-1.5px"
  title:
    fontFamily: "var(--font-ibm-plex-serif), Georgia, serif"
    fontSize: "28px"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.408px"
  card:
    fontFamily: "Cormorant Garamond, var(--font-ibm-plex-serif), Georgia, serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.27
    letterSpacing: "normal"
  body:
    fontFamily: "Neue Montreal, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "normal"
  script:
    fontFamily: "var(--font-homemade-apple), cursive"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Neue Montreal, Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  sm: "4px"
  lg: "12px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "56px"
  gutter: "60px"
components:
  chip:
    backgroundColor: "{colors.dusty-rose-tint}"
    textColor: "{colors.raspberry-ink}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
  card-project:
    backgroundColor: "{colors.card-surface}"
    textColor: "{colors.ink}"
    padding: "24px"
  card-community:
    backgroundColor: "{colors.community-surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  nav-link:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.full}"
    padding: "5px 10px"
  nav-link-active:
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "5px 10px"
---

# Design System: Aastha Singh — Portfolio 2026

## Overview

**Creative North Star: "The Analog Interface"**

This is a portfolio built on a deliberate tension: warm physical materials — paper, ink, film, tape, Polaroids, postcards — meeting the precision of engineered digital interaction. The surface reads like a designer's desk seen from above, scattered by hand across a graph-paper notebook page, but nothing is sloppy: every object sits at an intentional angle, every hover resolves on a tuned spring, and a custom cursor ties the whole thing into one perceivable system. The hand-made texture is real and the engineering underneath it is exact; the friction between those two is the point, and it is the proof of craft.

The system is **playful and alive** rather than quiet. Objects carry personality — an idle sway, a springy lift, a contextual cursor hint — but personality is rationed against a calm, near-monochrome ground so it never tips into clutter. Colour is scarce and warm; type does most of the expressive work through an italic display serif and a handwritten script, held together by a clean neutral sans for everything functional. Depth is physical: surfaces rest flat on the page and lift toward the viewer only when touched, like paper peeling off a desk.

The explicit anti-references (from the binding brief in `design/brief.md`) are the minimal corporate template, the generic cursive-handwriting "cozy portfolio" cliché, the spiral-binder motif, and the screenshot-grid work section. This world rejects all four in favour of specific, interactive, personally-meaningful objects.

**Key Characteristics:**
- Graph-paper notebook ground; objects hand-placed at small rotations (−8° to +8°).
- Scarce, warm accent colour (a single dusty pink pair) over a paper-and-ink neutral base.
- Expressive type: italic display serif + handwritten script, on a clean neutral sans.
- Physical depth — flat at rest, paper-lift on hover, never a hard-edged shadow.
- One authored interaction language; a custom cursor unifies every micro-interaction.

## Colors

A near-monochrome paper-and-ink palette warmed by a single scarce pink accent pair. Colour is never decoration here; it marks interaction (chips, focus) or provides photographic warmth through real imagery.

### Primary
- **Dusty Rose Tint** (#ffd5e4): The soft pink that backs tag/skill chips and highlight blocks. It is the one recurring accent surface — a warm, desaturated, faintly vintage pink that lifts the otherwise neutral page without shouting.
- **Raspberry Ink** (#9e3950): The deep berry rose used as text *on* the Dusty Rose Tint chips and as the keyboard focus-visible outline. It is the accent's backbone — the pigment that makes the pink legible and intentional.

### Neutral
- **Ink** (#000000): Primary text and the wordmark. True black for maximum authority against paper.
- **Ink Muted** (#666666): Secondary text — project descriptions, years, kickers, inactive nav links, meta lines.
- **Footer Body** (#404040): A slightly warmer dark gray for the footer's supporting paragraph and signature.
- **Paper** (#f5f5f5): The page ground — soft off-white, the notebook page itself.
- **Card Surface** (#f5f4f1): A warmer paper for project cards and the postcard footer, a half-step off the page so cards read as separate sheets.
- **Community Surface** (#f0efea): A cooler, slightly deeper paper for the About community cards.
- **Grid Line** (#e4e4e4): The graph-paper ruling and dot field's hairlines.
- **Grid Dot** (#cfcfcf): The fading dot field behind the footer.
- **Hairline** (#dddddd): The footer's solid outer border.
- **Dashed Rule** (#888888): Dashed internal dividers on the postcard footer.

### Named Rules
**The Scarce Accent Rule.** Only one accent colour exists — the Dusty Rose Tint / Raspberry Ink pair — and it appears only where interaction lives (chips and focus). Warmth beyond that comes from real photographs, never from more UI colour. If a screen needs "more colour," add a photographic object, not another swatch.

## Typography

**Display Font:** Canela Text, always Italic (with IBM Plex Serif italic fallback)
**Wordmark Font:** Jimmy Script (with Homemade Apple fallback)
**Title Font:** IBM Plex Serif
**Card Font:** Cormorant Garamond Bold (with IBM Plex Serif fallback)
**Body/Label Font:** Neue Montreal (with Inter, then system sans)
**Script Font:** Homemade Apple

**Character:** Type carries the personality this system withholds from colour. An italic display serif (Canela) gives the hero names and section headings an editorial, hand-set elegance; a genuine script (Jimmy Script) signs the wordmark; a clean geometric-humanist sans (Neue Montreal) keeps everything functional crisp and legible. The pairing is warm and expressive up top, precise and quiet in the body.

### Hierarchy
- **Wordmark** (Jimmy Script, 102px desktop / 52px mobile, line-height ~0.94): The signature "aastha singh" / "hi, I am aastha" lettering. One per view, revealed on load.
- **Display** (Canela Text Italic, 42px section headings up to 72px page heroes, tracking −1.5px): Section headings ("my projects") and About hero. The July 2026 redesign moved these from script to this italic serif.
- **Title** (IBM Plex Serif, 28px / medium, up to 56px on case studies): Project card titles and case-study H1s.
- **Card** (Cormorant Garamond Bold, ~18–22px): Community card titles, favourites category labels, Kora case-study headings.
- **Body** (Neue Montreal, 16px, line-height 1.25): Descriptions, paragraphs, nav (13px), UI text.
- **Script** (Homemade Apple, 16–32px): Project years, experience dates, and the postcard footer's handwritten quote and signature.
- **Label** (Neue Montreal Medium, 12–16px, uppercase, letter-spacing 0.04em): Section kickers/subtitles and the footer credit line.

### Named Rules
**The Italic-Only Rule.** Canela Text is only ever used in its italic cut (enforced in `.font-display`). Its italic is the display voice; an upright Canela would read as a different, wrong typeface here.
**The Fallback-Honest Rule.** Jimmy Script, Canela Text, Neue Montreal, and Cormorant Garamond are licensed and self-hosted only via `local()` + a `/public/fonts` woff2. Until those woff2 files are added, each degrades to a defined fallback (Homemade Apple, IBM Plex Serif, Inter). Never assume the branded cut is present; the fallback proportions are chosen to hold layout.

## Layout

A full-bleed page built on a **60px graph-paper module** (`--grid-size` / `--spacing-gutter`), so the ruling, the page gutters, and the spacing rhythm all share one unit. The nav sits 60px from each page edge (20px on mobile); primary content is composed as absolutely-positioned collage geometry on desktop — every object's `left/top/width/height/rotate` comes straight from the Figma frame and lives as data in `lib/`, not in components.

Each section carries a different paper ruling to signal its role: the full graph grid (`bg-grid-lines`) behind hero and work, horizontal rules (`bg-grid-rules`) behind the philosophy note, and a bottom-fading dot field (`bg-grid-dots`) behind the footer — all pure CSS, crisp at any DPI, zero image weight.

The desktop collage does not reflow directly; instead the same card/component markup is reused in a linear mobile stack (`absolute={false}`), and collage geometry is a desktop-only layer. Spacing within components steps through 8 / 12 / 18 / 24 / 32 / 56px.

## Elevation & Depth

**Paper lifting off a desk.** Surfaces rest flat on the page and gain depth only as a physical response to interaction — a card lifts toward the viewer on hover. Shadows are diffuse, warm-gray, and multi-layered; there are no hard, tight, or pure-black drop shadows anywhere.

### Shadow Vocabulary
- **Paper Lift** (`box-shadow: 0 11px 24px rgb(181 181 181 / 0.12), 0 43px 43px rgb(181 181 181 / 0.10), 0 98px 59px rgb(181 181 181 / 0.06), 0 174px 69px rgb(181 181 181 / 0.02)`): The `.shadow-paper` signature (Figma "Shadow new"). A four-layer soft lift in warm gray (rgb 181 181 181), applied to project cards and the postcard footer so they read as separate sheets of paper on the desk.

### Named Rules
**The Paper-Lift Rule.** Depth is motion, not decoration. Cards translate up (project cards `y:-8`, community cards `y:-6`) on a spring (stiffness 300, damping 28) on hover; the static `shadow-paper` gives them their resting weight, and the lift confirms they are live. Never simulate depth with a hard border or a dark shadow.

## Shapes

A restrained, near-square form language that lets the paper materials and photographic objects carry the character. Corners are minimal: **4px** (`--radius-card`) on chips and the tightest surfaces, **12px** on the softer About community cards, and **fully rounded** only on interactive nav pills. Project cards and the postcard footer are effectively sharp-edged sheets — their identity comes from the paper surface and lift, not a radius.

Recurring physical motifs replace conventional UI chrome: **masking-tape strips** pin project cards (rotated, offset per Figma), a **postcard/stamp** treatment frames the footer, and the **graph-paper grid** is the universal ground. The footer uses a **solid hairline border** (#ddd) with a **dashed internal divider** (#888) — stationery, not card chrome.

## Components

### Chips (tags / skills)
- **Style:** Dusty Rose Tint (#ffd5e4) background, Raspberry Ink (#9e3950) text, 4px radius, capitalized, medium weight. Canonical padding 8px 12px (inline card variants tighten to ~4px 8px at 14px text).
- **Character:** The only consistently-coloured element on the page — a small, warm, deliberate mark of a skill or category.

### Cards — Project
- **Corner Style:** Sharp (no radius); identity is the paper sheet, not the corner.
- **Background:** Card Surface (#f5f4f1), 24px internal padding.
- **Shadow Strategy:** `shadow-paper` at rest (see Elevation).
- **Distinctive behavior:** A rotated masking-tape strip pins the top; on hover the card springs up (`y:-8`, stiffness 300 / damping 28), the tape nudges up 3px, and the media (image or autoplaying muted video) zooms to 1.04 over 600ms on `cubic-bezier(0.22, 1, 0.36, 1)`. Title in IBM Plex Serif, year in Homemade Apple script, description in muted body. Reduced-motion swaps video for its poster and drops the transforms.

### Cards — Community (About)
- **Corner Style:** 12px radius — softer than project cards.
- **Background:** Community Surface (#f0efea), 24px padding.
- **Hover:** Springs up `y:-6` (stiffness 300 / damping 28). No resting shadow.

### Navigation
- **Style:** Full-bleed row, left wordmark ("Aastha") + right link cluster, 13px medium. Links are rounded-full pills whose padding is cancelled with negative margins, so a hover background (`black/5`) appears without shifting text.
- **States:** Inactive links are Ink Muted → Ink on hover; active link is Ink with `aria-current="page"`. Links are subtly **magnetic** (translate toward the pointer at 0.25 strength). Not-ready pages render as `cursor-default` spans that surface a "Coming soon" cursor label instead of navigating.
- **Entrance:** Header fades/slides down (`y:-8` → 0) over 500ms on `cubic-bezier(0.22, 1, 0.36, 1)`.

### Postcard Footer (signature component)
- Shared across landing and About. A `card-surface` sheet with a solid #ddd border, a dashed #888 vertical divider, a handwritten script quote (Homemade Apple, 32px), a rotated stamp image, and underlined contact links with a 46°-rotated arrow glyph. Links open in a new tab when external.

### Custom Cursor (signature component)
- Replaces the native cursor site-wide (only where `hover: hover` + `pointer: fine`) with a small dot/pin that morphs into contextual hints. Any element opts in declaratively via markup: `data-cursor="hover"` (interactive), `data-cursor="label"` + `data-cursor-text="…"` (a black pill label like "View case study" / "Coming soon"). Keyboard focus stays visible independently via a Raspberry Ink `:focus-visible` outline.

## Do's and Don'ts

### Do:
- **Do** ration accent colour to interaction only — Dusty Rose Tint / Raspberry Ink on chips and focus; get warmth elsewhere from real photographs (The Scarce Accent Rule).
- **Do** convey depth through the paper-lift: `shadow-paper` at rest, a spring translate (stiffness 300 / damping 28) on hover.
- **Do** keep collage geometry as data in `lib/` (`left/top/width/height/rotate` from Figma); never hard-code positions inside components.
- **Do** use `cubic-bezier(0.22, 1, 0.36, 1)` as the default ease-out for entrances and media, and reserve springs for hover lifts.
- **Do** drive interactive affordances through `data-cursor` attributes so every micro-interaction joins one cursor system.
- **Do** honor `prefers-reduced-motion`: swap page-turns/zooms for opacity, disable idle sway, keep keyboard focus reachable, and hold body text at WCAG AA over the grid.
- **Do** use Canela Text only in its italic cut.

### Don't:
- **Don't** use hard-edged, tight, or pure-black drop shadows — depth is always the diffuse warm-gray paper lift.
- **Don't** add a second accent hue or colour a surface "to liven it up"; add a photographic object instead.
- **Don't** fall back to the anti-references: minimal corporate template, generic cursive "cozy portfolio" font as the primary voice, spiral-binder motif, or a plain screenshot grid for work.
- **Don't** hand-edit `public/assets` (generated) or assume branded fonts are present without their `/public/fonts` woff2.
- **Don't** let decorative objects become filler — every collage object must be specific to Aastha and earn its place.
