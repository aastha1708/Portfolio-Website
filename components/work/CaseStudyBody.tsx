import Image from "next/image";
import CaseStudyShell from "@/components/work/CaseStudyShell";
import Reveal from "@/components/motion/Reveal";
import type { Project } from "@/lib/projects";

/**
 * The three case studies that aren't written yet. Deliberately the same page
 * as Kora — same shell, same hero rhythm, same meta card — so the portfolio
 * reads as one product rather than one finished page and three placeholders.
 * The only difference is what fills the body.
 *
 * The meta card stays: role, year and scope are true today and are most of
 * what a hiring manager scans for anyway. Inventing process sections that
 * don't exist yet would be worse than an honest "coming soon".
 */
export default function CaseStudyBody({ project }: { project: Project }) {
  return (
    <CaseStudyShell>
      <section className="scroll-mt-[120px]">
        <Reveal immediate delay={0.1}>
          <div className="mt-10 flex flex-col gap-[12px]">
            <h1 className="font-card text-[42px] leading-none tracking-[-0.408px] text-black">
              {project.title}
            </h1>
            <p className="max-w-[1076px] text-[24px] leading-[28px] text-ink-muted">
              {project.description}
            </p>
            <ul className="mt-[8px] flex flex-wrap items-center gap-[8px]">
              {project.tags.map((tag) => (
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

        {/* Same plate as Kora's hero, carrying the project's own still. */}
        <Reveal immediate delay={0.15}>
          <div className="relative mt-[28px] overflow-hidden rounded-[24px] bg-white shadow-paper">
            <div className="relative aspect-[4/5] w-full sm:aspect-[1076/560] lg:aspect-[1076/433]">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1120px) 100vw, 1080px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>

        <Reveal immediate delay={0.2}>
          <dl className="mt-[32px] grid grid-cols-2 gap-x-[48px] gap-y-[24px] rounded-[20px] bg-[#f0efea] p-[16px] shadow-paper md:grid-cols-4 md:gap-x-[64px] md:p-[24px]">
            <div className="flex flex-col gap-[10px]">
              <dt className="text-[16px] uppercase text-ink-muted">My role</dt>
              <dd className="text-[18px] tracking-[-0.54px] text-black">Product Designer</dd>
            </div>
            <div className="flex flex-col gap-[10px]">
              <dt className="text-[16px] uppercase text-ink-muted">Scope</dt>
              {project.tags.map((tag) => (
                <dd key={tag} className="text-[18px] capitalize tracking-[-0.54px] text-black">
                  {tag}
                </dd>
              ))}
            </div>
            <div className="flex flex-col gap-[10px]">
              <dt className="text-[16px] uppercase text-ink-muted">Year</dt>
              <dd className="text-[18px] tracking-[-0.54px] text-black">{project.year}</dd>
            </div>
            <div className="flex flex-col gap-[10px]">
              <dt className="text-[16px] uppercase text-ink-muted">Write-up</dt>
              <dd className="text-[18px] tracking-[-0.54px] text-black">In progress</dd>
            </div>
          </dl>
        </Reveal>
      </section>

      <Reveal delay={0.1}>
        <section className="mt-[100px] flex flex-col items-center gap-[20px] rounded-[20px] bg-[#f0efea] px-[16px] py-[80px] text-center">
          <span className="chip text-[16px]">[ full case study — coming soon ]</span>
          <p className="max-w-[520px] text-[20px] leading-[30px] text-ink-muted">
            The whole story &mdash; research, explorations, dead ends and the shipped thing &mdash;
            is being written up with the care it deserves.
          </p>
          <p className="font-script text-[18px] text-black/70">worth the wait, promise.</p>
        </section>
      </Reveal>
    </CaseStudyShell>
  );
}
