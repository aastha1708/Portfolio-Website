import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/layout/Nav";
import PostcardFooter from "@/components/layout/PostcardFooter";
import IphoneFrame from "@/components/work/IphoneFrame";
import FooterMotion from "@/components/motion/FooterMotion";
import Reveal from "@/components/motion/Reveal";
import HighlightMark from "@/components/motion/HighlightMark";

/**
 * Kora — the first full case study (Figma frame 335:461, July 2026).
 * Unlike the landing/about pages this is a real document, so it uses normal
 * responsive flow instead of the 1440 ScaledStage: case studies get read,
 * not composed.
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

const FEATURES = [
  { title: "Discover", body: "Start at the surface. What do I enjoy?" },
  { title: "Explore", body: "The first dive. What careers are connected to my interests?" },
  { title: "Reflect", body: "Reflect on what fits. What felt meaningful or natural?" },
  { title: "Collect", body: "Bring discoveries back up. What do I want to keep exploring?" },
] as const;

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

          {/* ---------------- Hero (Figma 335:553) ----------------
              Composed live rather than a flat export: pastel ground, the
              onboarding screen in the CSS iPhone mockup (cropped by the
              card, as in the file), and Figma's blue annotation pins kept
              as real text. */}
          <Reveal delay={0.05}>
            <div className="relative mt-10 overflow-hidden rounded-[24px] shadow-paper">
              <div
                className="relative aspect-[4/5] w-full sm:aspect-[1076/560] lg:aspect-[1076/433]"
                style={{
                  background:
                    "linear-gradient(115deg, #ece8f5 0%, #f4ecf1 34%, #f6f1ea 68%, #e9eef0 100%)",
                }}
              >
                <div className="absolute left-1/2 top-[36px] w-[240px] -translate-x-1/2 md:w-[280px]">
                  <IphoneFrame
                    src="/assets/kora/screen3.webp"
                    alt="Kora's home chat greeting the student by name"
                    sizes="280px"
                    priority
                  />
                </div>
                {/* Figma's blue annotation pins (345:757-760) */}
                {HERO_NOTES.map((note) => (
                  <span
                    key={note.text}
                    className="absolute hidden whitespace-nowrap rounded-[14px] bg-[#007aff] px-[12px] py-[10px] text-[16px] leading-[12px] text-white shadow-[0_6px_18px_rgba(0,122,255,0.35)] md:inline-block"
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
              <h1 className="font-card text-[42px] leading-none tracking-[-0.408px] text-black">Kora</h1>
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
              <div className="relative aspect-[900/432] w-full max-w-[900px]">
                <Image
                  src="/assets/kora/market-analysis.webp"
                  alt="Donut chart of market drivers: youth population and demand 35%, digital adoption 25%, policy mandates 18%, rising household disposable income 13%, AI-powered personalisation 9%"
                  fill
                  sizes="(max-width: 932px) 100vw, 900px"
                  className="object-contain"
                />
              </div>
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
                {/* The phone peeks up from the plate, cropped by it — the
                    journey's end state (the career shelf) on display. */}
                <div className="relative h-[364px] w-[400px] max-w-full overflow-hidden rounded-[53px] bg-white md:w-[456px]">
                  <div className="absolute left-1/2 top-[42px] w-[240px] -translate-x-1/2">
                    <IphoneFrame
                      src="/assets/kora/screen6.webp"
                      alt="The career shelf collecting saved discoveries"
                      sizes="240px"
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
