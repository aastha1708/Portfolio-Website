import Image from "next/image";
import CaseStudyShell from "@/components/work/CaseStudyShell";
import KoraBanner from "@/components/work/KoraBanner";
import FeatureScroller, { type Feature } from "@/components/work/FeatureScroller";
import IphoneFrame from "@/components/work/IphoneFrame";
import Reveal from "@/components/motion/Reveal";
import HighlightMark from "@/components/motion/HighlightMark";
import type { TocItem } from "@/components/work/CaseStudyToc";

/**
 * Kora — the first full case study (Figma frame 459:3408, Aug 2026 revision).
 * Unlike the landing/about pages this is a real document, so it uses normal
 * responsive flow inside CaseStudyShell instead of the 1440 ScaledStage:
 * case studies get read, not composed.
 *
 * Screens come from design/assets-source/"Kora page" (raw captures) and are
 * presented inside the CSS IphoneFrame mockup.
 */

export const metadata = {
  title: "Kora — Aastha Singh",
  description:
    "A career exploration app focused on self-discovery of users. A career guide that understands you. Won 3rd place in India's first AI-focused designathon.",
};

/* ---------------------------------------------------------------- content */

const TOC: TocItem[] = [
  { id: "overview", label: "Overview" },
  { id: "context", label: "Context" },
  { id: "research", label: "Research" },
  { id: "audience", label: "Target group" },
  { id: "market", label: "Market" },
  { id: "features", label: "Features" },
  { id: "solution", label: "Solution" },
  { id: "reflections", label: "Reflections" },
];

/** Figma 459:3647 — updated roles/deliverables in the Aug revision. */
const META = [
  { label: "My role", items: ["Product Designer", "Developer"] },
  { label: "Deliverables", items: ["Prototype", "AI Maxing", "Rough Solution"] },
  { label: "Team", items: ["Sahil Deshpande"] },
  { label: "Skills", items: ["AI Prototyping", "UI/UX"] },
] as const;

const RESEARCH_CARDS = [
  {
    title: "501 posts scraped from Reddit",
    body: "We scraped real reddit posts by very real users through reddit threads like r/india, r/indianteens, r/CBSE, etc. using the PRAW library.",
  },
  {
    title: "Pain points surfaced",
    body: "We used Claude to surface pain points through an AI powered sentiment analysis of the full corpus. We generated 30 pain points in total from the posts.",
  },
  {
    title: "Problems we chose",
    body: "After shortlisting pain points, we manually picked the problems for depth, frequency and design potential.",
  },
] as const;

/** DRAFT reflections — grounded in the documented Kora work; Aastha to review
    and rewrite in her own voice. */
const REFLECTIONS = [
  {
    title: "AI accelerates, judgment decides",
    body: "AI could generate screens fast, but the real work was judging whether each one actually moved a student deeper in the journey. The taste and direction were the job, not the generation.",
  },
  {
    title: "Research where people are already honest",
    body: "The sharpest signal came from where students already vent — real Reddit threads — not a survey we designed. Meeting people in their own space beat asking them to come to ours.",
  },
  {
    title: "Go deep for a few, not shallow for everyone",
    body: "Trying to solve for every student at once flattened the design. Prioritising the explorers let us solve one journey with real depth instead of a generic tool for all.",
  },
] as const;

/** Figma 459:3729 — each step now has its own artwork (Aug 2026). */
const FEATURES: Feature[] = [
  {
    title: "Discover",
    body: "Start at the surface. What do I enjoy?",
    image: "/assets/kora/discover-feature.webp",
    alt: "Interest stickers — music, art, plants, books, a laptop — floating above the prompt “Let's get to know who you are”",
  },
  {
    title: "Explore",
    body: "The first dive. What careers are connected to my interests?",
    image: "/assets/kora/explore-feature.webp",
    alt: "A radial map of psychology disciplines: clinical, counselling, educational, behavioural, neuropsych and organisational psychology",
  },
  {
    title: "Reflect",
    body: "Reflect on what fits. What felt meaningful or natural?",
    image: "/assets/kora/reflect-feature.webp",
    alt: "A reflection prompt asking which parts of the path felt meaningful",
  },
  {
    title: "Collect",
    body: "Bring discoveries back up. What do I want to keep exploring?",
    image: "/assets/kora/collect-feature.webp",
    alt: "The career shelf, holding the paths a student chose to keep",
  },
];

const SCREENS_ROW_1 = ["screen1", "screen2", "screen3"] as const;
const SCREENS_ROW_2 = ["screen4", "screen5", "screen6"] as const;

/* ------------------------------------------------------------ components */

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="text-[16px] uppercase text-ink-muted">{kicker}</p>
      <h2 className="font-card text-[32px] leading-[1.1] tracking-[-0.408px] text-black">{title}</h2>
    </div>
  );
}

function InsightCards({ cards }: { cards: readonly { title: string; body: string }[] }) {
  return (
    <div className="grid gap-[24px] md:grid-cols-3">
      {cards.map((card, i) => (
        <Reveal key={card.title} delay={i * 0.06}>
          <div className="flex h-full min-h-[195px] flex-col gap-[12px] rounded-[14px] bg-[#f0efea] px-[16px] py-[24px]">
            <h3 className="text-[22px] font-medium leading-[28px] text-black">{card.title}</h3>
            <p className="text-[18px] leading-[24px] text-ink-muted">{card.body}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function PhoneRow({ screens, alts }: { screens: readonly string[]; alts: string[] }) {
  return (
    <div className="flex flex-wrap items-start justify-center gap-[36px]">
      {screens.map((name, i) => (
        <Reveal key={name} delay={i * 0.07}>
          <IphoneFrame
            src={`/assets/kora/${name}.webp`}
            alt={alts[i]}
            className="w-[240px] max-w-[70vw] md:w-[262px]"
          />
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function KoraPage() {
  return (
    <CaseStudyShell toc={TOC}>
      {/* ---------------- Overview (Figma 459:3629) ---------------- */}
      <section id="overview" className="scroll-mt-[120px] outline-none">
        <Reveal immediate delay={0.1}>
          <div className="mt-10 flex flex-col gap-[12px]">
            <h1 className="font-card text-[42px] leading-none tracking-[-0.408px] text-black">Kora</h1>
            <p className="max-w-[1076px] text-[24px] leading-[28px] text-ink-muted">
              A career exploration app focused on self-discovery of users. A career guide that
              understands you. Won 3rd place in India&rsquo;s first AI-focused designathon.
            </p>
            {/* Award ribbon (Figma 469:4151) — a real award gets a real badge,
                not another tag chip. */}
            <span className="relative mt-[8px] block h-[32px] w-[252px] max-w-full">
              <Image
                src="/assets/kora/3rdplace.webp"
                alt="3rd place in Pro Creator Designathon"
                fill
                sizes="252px"
                className="object-contain object-left"
                priority
              />
            </span>
          </div>
        </Reveal>

        <Reveal immediate delay={0.15}>
          <div className="mt-[28px]">
            <KoraBanner />
          </div>
        </Reveal>

        {/* ---------------- Meta card (Figma 459:3646) ---------------- */}
        <Reveal immediate delay={0.2}>
          <dl className="mt-[32px] grid grid-cols-2 gap-x-[48px] gap-y-[24px] rounded-[20px] bg-[#f0efea] p-[16px] shadow-paper md:grid-cols-4 md:gap-x-[64px] md:p-[24px]">
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

      {/* ---------------- Context (Figma 459:3694) ---------------- */}
      <section id="context" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader
            kicker="Context"
            title="Career exploration should begin before the crisis, not after the result."
          />
        </Reveal>
        <Reveal delay={0.05}>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            People like high school students in India struggle with knowing who they are and what
            they want, because the system, their parents, and society only ever showed them two
            paths, leaving them no tools to explore, no language for their interests, and nothing
            to fall back on when results don&rsquo;t go as planned.
          </p>
        </Reveal>
      </section>

      {/* ---------------- Research (Figma 459:3699) ---------------- */}
      <section id="research" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader
            kicker="How we found the problem"
            title="Where are students the most honest? Reddit."
          />
        </Reveal>
        <InsightCards cards={RESEARCH_CARDS} />
      </section>

      {/* ---------------- Target group (Figma 459:3713) ---------------- */}
      <section id="audience" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Defining the target group" title="Prioritising the explorers" />
        </Reveal>
        <Reveal delay={0.05}>
          <div className="flex flex-col gap-[16px] text-[22px] leading-[32px] text-ink-muted">
            <p>
              We are designing for Indian high school students who are expected to make
              life-shaping career decisions before they have had the space, language, or guidance
              to understand themselves.
            </p>
            <p>
              We prioritised <HighlightMark>the explorers</HighlightMark> to solve deeper at the
              early stage, instead of trying to solve for every student at once.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Market (Figma 459:3720) ---------------- */}
      <section id="market" className="mt-[100px] scroll-mt-[120px] outline-none">
        <Reveal>
          <div className="flex flex-col items-center gap-[40px] rounded-[20px] bg-[#f0efea] px-[16px] pb-[48px] pt-[36px]">
            <div className="flex flex-col items-center gap-[8px] text-center">
              <h2 className="text-[28px] font-medium leading-[28px] text-black">
                What&rsquo;s driving the market?
              </h2>
              <p className="max-w-[838px] text-[22px] font-medium leading-[28px] text-ink-muted">
                A 5,000 Cr market no one has cracked yet. The next 100 million career-confused
                students are largely untouched by any existing platform. This is where Kora wins.
              </p>
            </div>
            <div className="relative aspect-[900/432] w-full max-w-[900px]">
              <Image
                src="/assets/kora/market-analysis.webp"
                alt="Donut chart of market drivers: youth population and demand 35%, digital adoption 25%, policy mandates 18%, rising household disposable income 13%, AI-powered personalisation 9%"
                fill
                sizes="(max-width: 932px) 100vw, 900px"
                className="object-contain"
              />
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Features (Figma 459:3725) ----------------
          The four steps are a journey, so they're told as one: the panel
          pins and the story advances as you scroll. */}
      <section id="features" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Features" title="Turning career discovery into a deep-dive journey" />
        </Reveal>
        <FeatureScroller features={FEATURES} />
      </section>

      {/* ---------------- Solution (Figma 459:3745) ---------------- */}
      <section id="solution" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[36px] outline-none">
        <Reveal>
          <div className="flex flex-col gap-[24px]">
            <SectionHeader kicker="The solution" title="Crafting the perfect career discovery journey" />
            <p className="text-[22px] leading-[32px] text-ink-muted">
              We used AI-powered tools to create high-fidelity versions that are near working and
              pixel-perfect and align with our Figma designs as well. We also went on to add a
              bunch of features and accessibility tools and shortcuts as well.
            </p>
          </div>
        </Reveal>
        <PhoneRow
          screens={SCREENS_ROW_1}
          alts={[
            "Onboarding — getting to know who you are",
            "Guided chat that maps interests to careers",
            "Personalised welcome with the career journey",
          ]}
        />
        <Reveal>
          <p className="text-[22px] leading-[32px] text-ink-muted">
            AI helped us generate the shape of the product, but our role was to judge whether each
            screen actually moved the student deeper in the journey. We evaluated every screen
            against three questions.
          </p>
        </Reveal>
        <PhoneRow
          screens={SCREENS_ROW_2}
          alts={[
            "Exploring psychology as a field",
            "Deep-dive into the clinical psychologist path",
            "The career shelf collecting saved discoveries",
          ]}
        />
      </section>

      {/* ---------------- Reflections (Figma 459:3760) ---------------- */}
      <section id="reflections" className="mt-[100px] flex scroll-mt-[120px] flex-col gap-[24px] outline-none">
        <Reveal>
          <SectionHeader kicker="Reflections" title="What I've learned" />
        </Reveal>
        <InsightCards cards={REFLECTIONS} />
      </section>
    </CaseStudyShell>
  );
}
