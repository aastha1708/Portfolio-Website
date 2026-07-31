import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import PostcardFooter from "@/components/layout/PostcardFooter";
import FooterMotion from "@/components/motion/FooterMotion";
import Reveal from "@/components/motion/Reveal";
import HighlightMark from "@/components/motion/HighlightMark";

/**
 * Kora — the first full case study (Figma frame 335:461, July 2026).
 * Unlike the landing/about pages this is a real document, so it uses normal
 * responsive flow instead of the 1440 ScaledStage: case studies get read,
 * not composed.
 *
 * Run `node scripts/fetch-figma-assets.mjs` once to pull the /assets/kora
 * images from Figma.
 */

export const metadata = {
  title: "Kora — Aastha Singh",
  description:
    "A career exploration app focused on self-discovery of users. A career guide that understands you. Won 3rd place in India's first AI-focused designathon.",
};

/* ---------------------------------------------------------------- content */

const META = [
  { label: "My role", items: ["UX Researcher", "UX Designer"] },
  { label: "Deliverables", items: ["Prototype Refinement", "Usability Testing", "Research"] },
  { label: "Team", items: ["Sahil Deshpande"] },
  { label: "Skills", items: ["2024"] },
] as const;

/** Annotation chips over the hero render — percentages of the 1076x433 frame. */
const HERO_NOTES = [
  { text: "discover", left: 28.6, top: 15.2 },
  { text: "explore", left: 61.0, top: 15.2 },
  { text: "collect", left: 60.9, top: 66.7 },
  { text: "increased career visibility", left: 19.5, top: 75.1 },
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

const MARKET = [
  { label: "Youth population and demand", value: 35, color: "#bcd4f0" },
  { label: "Digital adoption", value: 25, color: "#cfc4ef" },
  { label: "Policy mandates", value: 18, color: "#f0e7b8" },
  { label: "Rising household disposable income", value: 13, color: "#c6e5c0" },
  { label: "AI-powered personalisation", value: 9, color: "#f3c9d9" },
] as const;

const FEATURES = [
  { title: "Discover", body: "Start at the surface. What do I enjoy?" },
  { title: "Explore", body: "The first dive. What careers are connected to my interests?" },
  { title: "Reflect", body: "Reflect on what fits. What felt meaningful or natural?" },
  { title: "Collect", body: "Bring discoveries back up. What do I want to keep exploring?" },
] as const;

const SCREENS_ROW_1 = ["kora-screen-1", "kora-screen-2", "kora-screen-3"] as const;
const SCREENS_ROW_2 = ["kora-screen-4", "kora-screen-5", "kora-screen-6"] as const;

/* ------------------------------------------------------------ components */

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="text-[16px] uppercase text-ink-muted">{kicker}</p>
      <h2 className="font-card text-[32px] leading-[1.1] tracking-[-0.408px] text-black">{title}</h2>
    </div>
  );
}

function ResearchCards() {
  return (
    <div className="grid gap-[24px] md:grid-cols-3">
      {RESEARCH_CARDS.map((card, i) => (
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

/** The market donut, rebuilt as an accessible SVG instead of a flat export —
    crisp at any DPI and readable by screen readers. */
function MarketDonut() {
  const C = 2 * Math.PI * 90; // circumference at r=90
  let offset = 0;
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-[72px] gap-y-10">
      <svg
        viewBox="0 0 240 240"
        className="size-[300px] max-w-full"
        role="img"
        aria-label={`Market drivers: ${MARKET.map((m) => `${m.label} ${m.value}%`).join(", ")}`}
      >
        {MARKET.map((seg) => {
          const dash = (seg.value / 100) * C;
          const el = (
            <circle
              key={seg.label}
              cx="120"
              cy="120"
              r="90"
              fill="none"
              stroke={seg.color}
              strokeWidth="52"
              strokeDasharray={`${dash - 3} ${C - dash + 3}`}
              strokeDashoffset={-offset}
              transform="rotate(-90 120 120)"
            />
          );
          offset += dash;
          return el;
        })}
      </svg>
      <ul className="flex flex-col gap-[14px]">
        {MARKET.map((seg) => (
          <li key={seg.label} className="flex items-center gap-[12px]">
            <span aria-hidden className="size-[14px] shrink-0 rounded-full" style={{ backgroundColor: seg.color }} />
            <span className="text-[16px] text-black">
              {seg.label} <span className="text-ink-muted">· {seg.value}%</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PhoneRow({ screens, alts }: { screens: readonly string[]; alts: string[] }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-[36px]">
      {screens.map((name, i) => (
        <Reveal key={name} delay={i * 0.07}>
          <div className="relative aspect-[262/528] w-[240px] max-w-[70vw] md:w-[262px]">
            <Image
              src={`/assets/kora/${name}.webp`}
              alt={alts[i]}
              fill
              sizes="262px"
              className="object-contain"
            />
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ page */

export default function KoraPage() {
  return (
    <main className="relative min-h-screen">
      <div className="bg-grid-lines">
        <Nav />

        <article className="mx-auto max-w-[1080px] px-6 pb-[120px] pt-[120px]">
          <Reveal>
            <Link
              href="/"
              data-cursor="hover"
              className="text-[13px] uppercase tracking-[0.04em] text-ink-muted transition-colors hover:text-black"
            >
              &larr; back to all projects
            </Link>
          </Reveal>

          {/* ---------------- Hero (Figma 335:553) ---------------- */}
          <Reveal delay={0.05}>
            <div className="relative mt-10 overflow-hidden rounded-[24px] shadow-paper">
              <div className="relative aspect-[1076/433] w-full bg-[#eceaf6]">
                <Image
                  src="/assets/kora/kora-hero.webp"
                  alt="Kora onboarding chat flanked by annotated feature callouts"
                  fill
                  sizes="(max-width: 1128px) 100vw, 1076px"
                  className="object-cover"
                  priority
                />
                {/* Figma's blue annotation pins, kept live as text (335:757-760) */}
                {HERO_NOTES.map((note) => (
                  <span
                    key={note.text}
                    className="absolute hidden whitespace-nowrap rounded-[14px] bg-[#007aff] px-[12px] py-[10px] text-[16px] leading-[12px] text-white md:inline-block"
                    style={{ left: `${note.left}%`, top: `${note.top}%` }}
                  >
                    {note.text}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-[32px] flex flex-col gap-[12px]">
              <div className="flex items-center gap-[10px]">
                <h1 className="font-card text-[42px] leading-none tracking-[-0.408px] text-black">Kora</h1>
                <span className="relative h-[47px] w-[37px]">
                  <Image src="/assets/kora/kora-logo.webp" alt="" fill sizes="37px" className="object-contain" />
                </span>
              </div>
              <p className="max-w-[1076px] text-[24px] leading-[28px] text-ink-muted">
                A career exploration app focused on self-discovery of users. A career guide that
                understands you. Won 3rd place in India&rsquo;s first AI-focused designathon.
              </p>
              <ul className="mt-[0px] flex flex-wrap items-center gap-[8px]">
                {["Designathon", "Developed"].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[4px] bg-chip-bg px-[8px] py-[6px] text-[16px] font-medium capitalize tracking-[0.04px] text-chip-text"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* ---------------- Meta card (Figma 345:782) ---------------- */}
          <Reveal delay={0.15}>
            <dl className="mt-[32px] grid grid-cols-2 gap-x-[48px] gap-y-[24px] rounded-[20px] bg-[#f0efea] p-[16px] shadow-paper md:grid-cols-[218px_2fr_1.5fr_auto] md:gap-x-[112px] md:p-[16px]">
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

          {/* ---------------- Context (Figma 356:839) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[24px]">
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

          {/* ---------------- Research (Figma 356:848) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[24px]">
            <Reveal>
              <SectionHeader
                kicker="How we found the problem"
                title="Where are students the most honest? Reddit."
              />
            </Reveal>
            <ResearchCards />
          </section>

          {/* ---------------- Target group (Figma 356:924) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[24px]">
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

          {/* ---------------- Market (Figma 363:937) ---------------- */}
          <Reveal>
            <section className="mt-[100px] flex flex-col items-center gap-[40px] rounded-[20px] bg-[#f0efea] px-[16px] pb-[48px] pt-[36px]">
              <div className="flex flex-col items-center gap-[8px] text-center">
                <h2 className="text-[28px] font-medium leading-[28px] text-black">
                  What&rsquo;s driving the market?
                </h2>
                <p className="max-w-[838px] text-[22px] font-medium leading-[28px] text-ink-muted">
                  A 5,000 Cr market no one has cracked yet. The next 100 million career-confused
                  students are largely untouched by any existing platform. This is where Kora wins.
                </p>
              </div>
              <MarketDonut />
            </section>
          </Reveal>

          {/* ---------------- Features (Figma 364:1002) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[24px]">
            <Reveal>
              <SectionHeader kicker="Features" title="Turning career discovery into a deep-dive journey" />
            </Reveal>
            <div className="flex flex-wrap items-center justify-between gap-[40px]">
              <div className="flex w-full max-w-[529px] flex-col gap-[16px]">
                {FEATURES.map((feature, i) => (
                  <Reveal key={feature.title} delay={i * 0.06}>
                    <div
                      className={`flex flex-col gap-[8px] rounded-[14px] p-[16px] ${
                        i === 0 ? "bg-[#e7e4d5] shadow-paper" : "bg-[#f0efea]"
                      }`}
                    >
                      <h3 className="text-[18px] font-medium text-black">{feature.title}</h3>
                      <p className="text-[14px] text-ink-muted">{feature.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.1}>
                <div className="relative flex min-h-[364px] w-[400px] max-w-full items-center justify-center overflow-hidden rounded-[53px] bg-white md:w-[456px]">
                  <div className="relative size-[310px]">
                    <Image
                      src="/assets/kora/kora-features-phone.webp"
                      alt="Kora home screen with the four journey stages"
                      fill
                      sizes="310px"
                      className="object-contain"
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ---------------- Solution (Figma 364:1075) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[36px]">
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

          {/* ---------------- Reflections (Figma 364:1108) ---------------- */}
          <section className="mt-[100px] flex flex-col gap-[24px]">
            <Reveal>
              <SectionHeader kicker="Reflections" title="What I've learned" />
            </Reveal>
            <ResearchCards />
          </section>
        </article>
      </div>

      {/* ---------------- Footer (Figma 335:706) ---------------- */}
      <div className="bg-grid-dots px-6 pb-16 pt-8">
        <FooterMotion className="mx-auto max-w-[1195px]">
          <PostcardFooter />
        </FooterMotion>
      </div>
    </main>
  );
}
