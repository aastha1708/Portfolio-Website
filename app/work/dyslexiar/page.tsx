import Image from "next/image";
import CaseStudyShell from "@/components/work/CaseStudyShell";
import SectionHeader from "@/components/work/SectionHeader";
import InsightCards, { type Insight } from "@/components/work/InsightCards";
import FeatureScroller, { type Feature } from "@/components/work/FeatureScroller";
import { Chip } from "@/components/work/Chip";
import SwashText from "@/components/layout/SwashText";
import Reveal from "@/components/motion/Reveal";
import HighlightMark from "@/components/motion/HighlightMark";
import CountUp from "@/components/motion/CountUp";
import type { TocItem } from "@/components/work/CaseStudyToc";

/**
 * DyslexiAR — Figma frame 636:365 ("Final version" / "DyslexiAR page").
 *
 * Same document shape as Kora: normal responsive flow inside CaseStudyShell,
 * because a case study is read rather than composed, and this file renders
 * both at /work/dyslexiar and inside the landing page's bottom sheet.
 *
 * The one deviation from the frame is the title. The hero in Figma reads
 * "Dyslexi-AR", but the product is called DyslexiAR everywhere else on the
 * same screen — in the banner art, the card on the landing page and the body
 * copy. A product that spells its own name two ways in one viewport reads as
 * an oversight, not as a flourish, so the h1 follows the product.
 */

export const metadata = {
  title: "DyslexiAR — Aastha Singh",
  description:
    "An AR learning tool that turns dyslexia research into short, game-like phonics practice for children.",
};

/* ---------------------------------------------------------------- content */

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "persona", label: "Meet Anya" },
  { id: "games", label: "The games" },
  { id: "testing", label: "Testing" },
  { id: "conclusion", label: "Conclusion" },
];

/** Figma 636:435. */
const META = [
  { label: "My role", items: ["UX Researcher", "Interface Designer", "Unity Developer"] },
  { label: "Deliverables", items: ["Prototype", "Usability Testing"] },
  { label: "Team", items: ["Sahil Deshpande", "Rahul Ajith", "Yaksh Patel"] },
  { label: "Skills", items: ["Unity", "UX"] },
] as const;

/** Figma 636:421 — outlined pills, same as every other case study. */
const TAGS = ["Assistive technology", "Child-centered design", "AR and applied ML"] as const;

/** The six DALI skill areas the games were built against (Figma 636:466). */
const SKILL_AREAS: readonly Insight[] = [
  {
    title: "Phonemic awareness",
    body: "Identify and manipulate individual sounds in words.",
  },
  {
    title: "Orthographic mapping",
    body: "Link letters to sounds and stabilize them in memory.",
  },
  {
    title: "RAN (naming speed)",
    body: "Name familiar symbols quickly to build reading fluency.",
  },
  {
    title: "Word-object recognition",
    body: "Match written labels to meaningful objects and concepts.",
  },
  {
    title: "Selective attention",
    body: "Focus on the right option while ignoring distractors.",
  },
  {
    title: "Letter formation",
    body: "Trace and form letters to reinforce sound–symbol mapping.",
  },
];

/** What Anya's needs translated into, as design principles (Figma 641:811). */
const PRINCIPLES: readonly Insight[] = [
  {
    title: "Play, not pressure",
    body: "Practice needs to run on intrinsic motivation, not the pressure that made the exam feel like a threat.",
  },
  {
    title: "Immediate feedback",
    body: "She needs feedback the instant she acts. Stealth assessment reads how she’s doing without it ever feeling like a test.",
  },
  {
    title: "Familiar, not clinical",
    body: "Child-centered design means it should feel like something she’d choose to play with, not clinical software dressed up for a kid.",
  },
  {
    title: "Guided first, then independent",
    body: "A new game needs scaffolding first: guided practice inside her zone of proximal development, not independence on day one.",
  },
];

/** Figma 641:837 — one game per skill area, each with its AR capture. */
const GAMES: Feature[] = [
  {
    title: "Spell Check",
    body: "Correct word formation triggers an auditory cue on the spot. That’s phonemic awareness and orthographic mapping built into play, not a worksheet.",
    image: "/assets/dyslexiar/final/game-1.webp",
    alt: "Three printed cards on a desk, each raising a solid orange 3D letter to spell F-U-N, with a Next Game button in the corner",
  },
  {
    title: "Rapid Automatised Naming (RAN)",
    body: "A gentle countdown, not a stopwatch aimed at her, keeps RAN practice moving. RAN is one of the strongest predictors of reading ability.",
    image: "/assets/dyslexiar/final/game-2.webp",
    alt: "A 3D kitten standing on a printed card, with a timer counting down in the corner of the AR view",
  },
  {
    title: "Object Identification",
    body: "Four word choices and audio narration turn word-object recognition into a filtering game. It’s the same selective attention dyslexia makes harder to sustain.",
    image: "/assets/dyslexiar/final/game-3.webp",
    alt: "A 3D hat on a card, ringed by four floating word options — CAT, BAT, MAT and HAT — for the child to pick from",
  },
  {
    title: "Letter Tracing",
    body: "A Convolutional Neural Network trained on the EMNIST dataset reads every traced letter and responds immediately. That’s stealth assessment: accuracy checked without it ever feeling like a grade.",
    image: "/assets/dyslexiar/final/game-4.webp",
    alt: "A traced letter M rendered in 3D beside the model’s reading of it, labelled “Predicted: M — Level Cleared!”",
  },
];

/** Figma 641:877. */
const FINDINGS: readonly Insight[] = [
  {
    title: "Animals drove engagement",
    body: "Relatable, visually appealing animals drove higher engagement. One child’s reason for a favorite was simple: the cat game, because cats are cute.",
  },
  {
    title: "Some tasks needed guidance",
    body: "Tasks involving image targets were intuitive on their own. Others needed guidance before children could play them independently.",
  },
  {
    title: "Real friction, real fixes",
    body: "Letter tracing confused both children at first. The teacher flagged lowercase letters as harder still: curves and reversals, like b, d, p, and q, are exactly what makes tracing difficult for a dyslexic reader.",
  },
];

const DALI_URL = "http://14.139.62.11/DALI/Language/DALI_English-JST-1&2.pdf";

/* ------------------------------------------------------------------ page */

export default function DyslexiArPage() {
  return (
    <CaseStudyShell slug="dyslexiar" toc={TOC}>
      {/* ---------------- Overview (Figma 636:410) ---------------- */}
      <section id="overview" className="scroll-mt-[120px] outline-none">
        <Reveal immediate delay={0.1}>
          <div className="flex flex-col gap-[12px]">
            <div className="flex min-w-0 flex-col gap-[8px]">
              <h1 className="font-display text-[42px] leading-[42px] tracking-[-0.408px] text-black">
                <SwashText text="DyslexiAR" swashTracking="3px" />
              </h1>
              <p className="max-w-[982px] text-[24px] leading-[28px] text-ink-muted">
                An AR learning tool that turns dyslexia research into short, game-like phonics
                practice for children.
              </p>
            </div>

            <ul className="flex flex-wrap items-center gap-[6px]">
              {TAGS.map((tag) => (
                <Chip key={tag}>{tag}</Chip>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal immediate delay={0.15}>
          {/* Figma 639:699 — the composition is a flat export here rather than
              a live rebuild (as Kora's banner is) because nothing in it moves
              or needs to be real text: it's artwork, not an annotated screen. */}
          <div className="relative mt-[28px] aspect-[1076/433] w-full overflow-hidden rounded-[24px] bg-white">
            <Image
              src="/assets/dyslexiar/final/thumbnail.webp"
              alt="The DyslexiAR title card floating in a cloudy blue sky, ringed by soft 3D letters — p, a, q, b and d, the shapes dyslexic readers most often reverse"
              fill
              priority
              sizes="(max-width: 1120px) 100vw, 1076px"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* ---------------- Meta card (Figma 636:435) ---------------- */}
        <Reveal immediate delay={0.2}>
          <dl className="mt-[32px] grid grid-cols-2 gap-x-[48px] gap-y-[24px] rounded-[20px] bg-plate p-[16px] shadow-paper md:grid-cols-4 md:gap-x-[64px] md:p-[24px]">
            {META.map((col) => (
              <div key={col.label} className="flex flex-col gap-[10px]">
                <dt className="text-[16px] uppercase text-ink-muted">{col.label}</dt>
                {col.items.map((item) => (
                  <dd key={item} className="text-[18px] tracking-[-0.54px] text-black">
                    {item}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------------- Context (Figma 636:457) ---------------- */}
      <section id="context" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Context" title="Traditional dyslexia assessments feel like exams." />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            That anxiety leads to inaccurate results and delayed intervention. DyslexiAR turns
            practice into something that <HighlightMark>feels like play, not a test</HighlightMark>.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Background research (Figma 636:462) ---------------- */}
      <section id="research" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader
            kicker="Background research"
            title="Goal was to create an interactive and playful learning experience for children."
          />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            Dyslexia affects nearly 15% of children worldwide, more so in multilingual countries
            like India. We grounded the design in the{" "}
            <a
              href={DALI_URL}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="hover"
              className="text-black underline decoration-[#bbb] underline-offset-[3px] transition-colors hover:decoration-black"
            >
              DALI (Dyslexia Assessment for Languages of India) test
            </a>
            , which surfaced six skill areas children with dyslexia repeatedly struggle with:
          </p>
        </Reveal>
        <InsightCards cards={SKILL_AREAS} />
      </section>

      {/* ---------------- Persona (Figma 641:832) ---------------- */}
      <section id="persona" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <div className="flex flex-col items-start gap-[32px] lg:flex-row">
            <div className="relative aspect-[426/287] w-full shrink-0 overflow-hidden rounded-[12px] bg-white lg:w-[426px]">
              <Image
                src="/assets/dyslexiar/final/persona-image.webp"
                alt="A child laughing while playing with the AR letter cards"
                fill
                sizes="(max-width: 1024px) 100vw, 426px"
                className="object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-[24px]">
              <SectionHeader
                kicker="A composite of the children DyslexiAR was designed for"
                title="Meet Anya"
              />
              <p className="text-[22px] leading-[26px] text-ink-muted">
                Anya is 8, bright, and dreads the reading tests at school. Every wrong answer feels
                like proof she&rsquo;s behind, not a data point a teacher can act on. She needs
                practice that doesn&rsquo;t feel like one more test she might fail.
              </p>
            </div>
          </div>
        </Reveal>
        <InsightCards cards={PRINCIPLES} columns={2} />
      </section>

      {/* ---------------- The games (Figma 641:833) ----------------
          Four games, one skill area each: told as a single pinned panel so the
          capture on the right always belongs to the card you're reading. */}
      <section id="games" className="mt-[100px] scroll-mt-[120px] outline-none">
        <FeatureScroller
          features={GAMES}
          kicker="The games"
          title="Each game targets one specific skill area."
          media="photo"
        />
      </section>

      {/* ---------------- Testing & validation (Figma 636:523) ---------------- */}
      <section id="testing" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Testing & validation" title="What we learnt" />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            Testing included 2 children with dyslexia, a teacher, and a child psychologist, using
            observation, semi-structured interviews, and the System Usability Scale.
          </p>
        </Reveal>

        {/* The one number the section is built around, so it gets its own
            plate and counts up on arrival instead of sitting in a card row. */}
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-[24px] rounded-[14px] bg-plate p-[24px]">
            <h3 className="text-[22px] font-medium leading-[28px] text-black">
              System Usability Scale
            </h3>
            <div className="flex flex-wrap items-end gap-[12px]">
              <CountUp
                value={84.1}
                decimals={1}
                className="font-display text-[56px] leading-[56px] tracking-[-0.408px] text-black"
              />
              <p className="text-[18px] leading-[24px] text-ink-muted">
                &mdash;Well above the 70 benchmark, an &ldquo;Excellent&rdquo; score by SUS&rsquo;s
                own scale.
              </p>
            </div>
          </div>
        </Reveal>

        <InsightCards cards={FINDINGS} minHeight={254} />

        <Reveal delay={0.05}>
          {/* Kept, not buried: the limitation is the most credible line in the
              section, and hiding it would make the 84.1 above less believable. */}
          <p className="text-[22px] italic leading-[26px] text-ink-muted">
            Novelty caused a bias in our testing as the children were clearly amazed with the
            technology. We would need to conduct more longitudinal sessions to draw stronger
            conclusions.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Conclusion (Figma 643:892) ---------------- */}
      <section id="conclusion" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Conclusion" title="Practice can feel like play, not another test." />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            One prototype won&rsquo;t undo years of exam anxiety. But DyslexiAR shows the
            alternative works: grounded in research, tested honestly, and built for Anya first.
          </p>
        </Reveal>
      </section>
    </CaseStudyShell>
  );
}
