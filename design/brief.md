# Portfolio Landing Page — Visual & Interaction Brief

Paste this whole brief into your design/generation tool as the prompt. It describes one landing page: a UI/UX designer's portfolio hero + work section, built around a warm, hand-assembled "scrapbook desk" aesthetic with real, purposeful micro-interactions — not generic template motion.

## 1. Context

This is the landing page for Aastha Singh, a UI/UX designer, targeting Product/UX Designer roles at top tech companies in 2026. The design direction is a personal, tactile, collage-style aesthetic — like items scattered across a designer's desk — rather than a minimal corporate template. The differentiator versus other designers' portfolios is that every object in the collage is interactive and specific to her (not decorative clutter), and the interaction language established in the hero repeats functionally in the work section, so the whole page reads as one authored idea rather than a set of disconnected effects. Visual and interaction fidelity matter more than final copy right now — placeholder text and generic project names are fine.

## 2. Overall Aesthetic

Background: soft off-white with a faint graph-paper grid (light gray hairlines), evoking a designer's notebook page. Palette: warm cream/paper base, dusty pink accents (soft blush pink for tag chips and highlight blocks), muted orange/coral for one accent icon, black ink for primary text, with full-color photographic elements (Polaroids, a beach photo, an iced coffee) providing warmth against the otherwise muted palette. Typography: pair a confident sans-serif for UI labels/body text with one expressive display treatment for the name/wordmark — considering a refined custom lettering or a distinctive serif/sans pairing instead of a generic cursive script font, since a plain handwriting font is one of the most common "cozy portfolio" cliché choices right now. Overall mood: tactile, warm, a little playful, but composed with clear intentionality — every object earns its place.

## 3. Page Structure

**Nav bar**: minimal, top-aligned, left-aligned wordmark/initial, right-aligned text links (About, Work, Playground, Resume). Stays consistent site-wide.

**Hero section**: centered name and one-line role/location tags, surrounded by a scattered collage of personal objects (see Section 4) arranged asymmetrically around the negative space, not in a grid — as if placed by hand. Objects overlap slightly and sit at varied small rotation angles (between -8° and +8°) to feel organic rather than aligned.

**Section divider**: a physical-desk transition element between hero and body — recommend replacing a generic spiral notebook binder (overused in this aesthetic category) with an alternative tactile motif: a strip of masking/washi tape across the full width, a torn/deckled paper edge, or a visible stitched thread seam. Pick one and use it consistently at every major section break.

**Intro/positioning statement**: a short, high-contrast statement of design philosophy, presented on a sticky note or torn paper card, similar to a designer's handwritten note pinned to a board.

**Work section**: reimagined as a physical notebook/photo album rather than a screenshot grid or a calendar layout (see Section 6) — this is the key structural change from earlier versions.

**Footer**: real content (not a placeholder block) — contact/social links and a closing line, styled consistently with the desk/paper motif (e.g., a final "note" or "postcard" treatment).

## 4. Hero Object Collage — Specific Items & Rationale

Replace any purely decorative/generic object with one that has a reason to exist. Suggested set (swap in more personally specific items where possible):

A physical book (personally meaningful title) that is hoverable and flips open, page by page, on hover or click — pages should feel like real paper with a subtle curl.

A vintage/point-and-shoot camera that triggers a shutter-close animation and a quick white flash overlay on interaction, with the photo behind it cross-fading to a different personal snapshot each time it's triggered.

A Polaroid/beach photo that plays a soft, short beach ambience sound on hover (waves, ~1 second, not looping).

Wireless earbuds/case that opens its lid slightly on hover, silent (no sound layer — see Section 7 on sound budget).

A postcard/envelope that peels open on hover to reveal a couple of handwritten-style lines underneath the flap.

A flower or plant element with a continuous, very subtle idle sway — the one element that's always gently "alive" even before any interaction.

Small tool/platform icons (Figma, Notion, Spotify, Pinterest) that function as real outbound links — on hover they scale up slightly and lift with a soft shadow; the Spotify icon additionally reveals a small animated "now playing" waveform and can open a real embedded track preview on click.

An iced coffee cup or similar personal-taste object as connective texture — keep low-interaction (visual only) so not every object competes for attention.

## 5. Interaction Specifications (Motion Detail)

**Page-turn (book)**: purpose = delight, low frequency, pattern = on-screen morph. Use a paper-curl transform with ease-in-out, roughly 400–500ms per page turn, slight drop shadow under the lifting page edge to sell depth. This exact mechanic is reused later in the work section (see Section 6) — keep the timing and curl physics identical in both places so it reads as the same signature gesture.

**Camera shutter**: purpose = delight, low frequency, pattern = enter/exit. Shutter-close motion ~150ms ease-out, flash overlay opacity spike and fade within ~80ms, followed by a photo cross-fade of ~400ms ease-in-out.

**Envelope peel**: purpose = delight/understanding, low frequency, pattern = on-screen morph. Transform-origin at the top edge of the flap, ease-out, ~250ms.

**Idle sway (flower)**: purpose = ambient/delight, continuous, pattern = time-based loop. Rotate ±2–3° over a ~4 second ease-in-out loop, never linear (linear reads mechanical).

**Icon hover-lift (Figma/Notion/Pinterest)**: purpose = responsiveness, high frequency, pattern = hover. Scale to 1.05, add soft shadow, 120–180ms ease-out. No bounce — this is a frequent, functional interaction, not a delight moment.

**Load-in choreography**: on first paint, stagger every collage object into place with a slight overshoot/settle (small spring bounce), 40–60ms delay increment between each object, ordered outside-in or top-to-bottom. One-time cost, so a springier curve is appropriate here even though repeated hovers elsewhere should stay crisp.

**Custom cursor**: replace the default cursor with a small dot/pin marker across the whole page. On hovering any interactive object, morph the cursor into a contextual hint icon (a small "flip" glyph over the book, a speaker glyph over sound-enabled objects, a play glyph over the Spotify icon). This ties every micro-interaction together into one perceivable system rather than a set of unrelated tricks.

## 6. Work Section — Notebook / Page-Turn Concept

Do not use a plain screenshot grid and do not use a calendar/planner layout. Instead, present each project as a two-page spread inside a notebook or photo album. The left page shows the project's cover treatment: a representative image, project title, and a single outcome-driven line (impact framing, e.g. "increased X by Y%," not a generic description). The right page can hold supporting tags/metadata (role, timeline, one key metric) styled like handwritten annotations or sticky notes.

Hovering a spread lifts the page slightly with a soft shadow, like paper lifting off a desk — fast, ~150–200ms ease-out, since this will be triggered frequently as someone browses. Clicking a project does not hard-navigate; it triggers the same page-turn/curl transition used on the hero book prop, carrying the viewer forward into the full case study as though turning to the next page. Moving between the four projects becomes flipping forward/back through the notebook (next/previous page controls) rather than scrolling a grid.

This reuse of the book-flip gesture as the actual navigation mechanic for real work — not just a hero decoration — is the intentional structural idea: the same signature gesture appears twice, once playfully in the collage and once functionally as navigation, which is what makes the whole page feel like one authored system rather than a collection of separate effects.

## 7. Sound Design Rules

Limit sound-enabled objects to 3–4 total (book page-flutter, camera shutter click, beach-photo ambience, optionally one more) — do not wire sound to every object, or overlapping triggers will feel chaotic rather than delightful. All sound is muted by default until the user interacts once; include a small, visible global mute/sound toggle in the UI. Every clip should be short (under ~1 second) and diegetic — a physical sound matching the object, never a looping ambient track that overstays.

## 8. Accessibility & Performance Notes

Respect `prefers-reduced-motion`: fall back to simple opacity fades for page-turns and object entrances, and disable the idle sway loop, when this is set. Every hover-triggered interaction must also be reachable via keyboard focus states, not mouse-hover only. Keep the page-turn transition itself under ~500–600ms so browsing case studies never feels gated behind ceremony. Maintain body text contrast against the paper/grid background at WCAG AA even where decorative elements use lower-contrast pastels.

## 9. What to Generate

Produce a high-fidelity visual mockup (and, where the tool supports it, an interactive prototype) of this landing page — hero collage plus the notebook-style work section — following the aesthetic, layout, object list, and interaction/motion specifications above. Content and copy can remain placeholder/generic for now; the priority is validating the visual composition and the feel of the interaction system described.
