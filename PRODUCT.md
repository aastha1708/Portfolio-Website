# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Existing codebase: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, and
Motion (framer-motion successor). Content and geometry live in `lib/` as data,
never in components; assets are optimized from `design/assets-source/` into
`public/assets/` via `npm run assets`. This was established before init and is
not an open decision.

## Users

The primary audience is **hiring managers, recruiters, and design leads at top
tech companies**, evaluating Aastha Singh for Product / UX Designer roles in
2026. They arrive to judge craft and taste quickly, often skimming many
portfolios in a sitting. A secondary audience is fellow designers and peers who
may explore the interactive details more deeply.

## Product Purpose

A personal portfolio for **Aastha Singh**, a UI/UX designer, built to win
Product/UX Designer roles at top tech companies. Success is a visitor coming
away convinced of her craft, taste, and point of view — and reaching out or
advancing her in a hiring process. It must demonstrate design ability through
the site itself, not only through the work it showcases.

## Positioning

The differentiator is a **personal, tactile "scrapbook desk" collage identity**
where every object is interactive and specific to Aastha — not decorative
clutter — and the interaction language established in the hero repeats
*functionally* in the work section (the book/page-turn gesture becomes real
case-study navigation). The whole site reads as one authored system rather than
a set of disconnected effects. This is the deliberate counter to the minimal
corporate template and the generic "cozy portfolio" cliché.

## Operating Context

- Recruiters typically skim on desktop and mobile, fast; the first viewport
  must land the identity and value before any interaction is discovered.
- The interaction/motion system is core to the product, not garnish; it is the
  proof of craft.
- The original visual & interaction brief lives at `design/brief.md` and is a
  binding reference for the collage aesthetic, interaction specs, sound budget,
  and accessibility rules.

## Capabilities and Constraints

**Built today:** the landing page (`/`) and About (`/about`). A Kora case-study
page exists (`/work/kora`) and a generic case-study route scaffold
(`/work/[slug]`).

**Planned deliverables (confirmed in scope, not yet built out):**
- **Work index + case studies** — a `/work` listing plus full per-project case
  studies. Nav currently marks Work as not-ready.
- **Playground** (`/playground`) — experiments, side explorations, motion/UI demos.
- **Visitor Gallery** (`/gallery`) — a **guestbook / leave-a-mark** surface:
  visitors leave a note, doodle, or stamp that becomes part of a living,
  additive collage wall. (Interactive/persistent; the storage/backend approach
  is an open decision.)

**Real projects to showcase:**
- **Kora** — career-exploration app focused on self-discovery ("a career guide
  that understands you"); won 3rd place in India's first AI-focused designathon.
- **Digital Gold** — revamped first-time buy, SIP, and sell journeys; strong
  product-team feedback.
- **Credit Card Onboarding** — internship work, shipped; smoother application
  flow, fewer drop-offs at the KYC step.
- **Sahayak** (2025, side project) — accessible smartphone UI for elderly and
  low-literacy users via voice modality, AI support, and intuitive UI.

**Constraints:** content is data-driven in `lib/`; `public/assets` is generated
and must never be hand-edited; custom fonts (Jimmy Script wordmark, Neue
Montreal body) are not yet licensed/self-hosted and currently fall back.

## Brand Commitments

- **Name:** Aastha Singh. Bio truth: grew up across India, Oman, and Italy;
  Computer Science BTech at IIIT-Delhi (2022–2026); currently an Experience
  Design Professional at Them Consulting (Gurugram, India); started designing in
  her first semester.
- **Visual identity:** the scrapbook-desk collage world defined in
  `design/brief.md` — warm off-white graph-paper base, dusty-pink accents,
  black ink text, full-color photographic objects; an expressive display
  wordmark paired with a clean sans for UI/body.
- **Community roles (real):** Coordinator at GirlUp, Design Lead at the college
  Sports Council, and college volleyball/football (midfield).

## Evidence on Hand

- Real project write-ups and metrics in `lib/projects.ts`; Kora case-study
  content in `app/work/kora`.
- Real bio, experience, and community content in `lib/about.ts`.
- Real personal "favourites" content (books, movies, shows, anime, albums) and
  imagery under `public/assets/about`.
- **Contact — real:** `aasthapcharag@gmail.com`.
- **Contact — PLACEHOLDERS, do not present as real:** the footer LinkedIn link
  points to a generic `https://www.linkedin.com/` URL, and the Resume link
  points to `/resume.pdf`, which is not a confirmed/final file. Both need real
  values supplied by Aastha before shipping; future work must not fabricate them.

## Product Principles

1. **The site is the portfolio piece.** Craft in the interface itself must
   match the craft it claims — every detail is evidence.
2. **One authored system, not a bag of tricks.** Interactions form a coherent
   language; the same signature gesture recurs with purpose.
3. **Every object earns its place.** Personal and specific over decorative;
   nothing on the desk is filler.
4. **Fast to grasp, rewarding to explore.** The value lands in the first
   viewport for a skimming recruiter; depth is there for those who look closer.
5. **Delight never taxes usability.** Motion and sound stay within budget,
   respect reduced-motion and keyboard access, and hold body-text contrast at
   WCAG AA.

## Accessibility & Inclusion

Per `design/brief.md`: respect `prefers-reduced-motion` (opacity fades instead
of page-turns, idle sway disabled); every hover interaction must also be
reachable via keyboard focus; keep page-turn transitions short so browsing is
never gated behind ceremony; maintain WCAG AA body-text contrast against the
paper/grid background even where decorative elements use lower-contrast pastels.
