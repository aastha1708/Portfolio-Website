import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/layout/Nav";
import Reveal from "@/components/motion/Reveal";
import { PROJECTS } from "@/lib/projects";

/**
 * Placeholder case-study page — one per project, at its final URL, so the
 * information architecture is real even while the stories are being written.
 * The full case studies will replace the "in progress" note in place.
 */

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Aastha Singh`,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <main className="relative min-h-screen bg-grid-lines">
      <Nav />

      <article className="mx-auto max-w-[880px] px-6 pb-32 pt-[160px] max-lg:pt-[120px]">
        <Reveal>
          <Link
            href="/"
            data-cursor="hover"
            className="text-[13px] uppercase tracking-[0.04em] text-ink-muted transition-colors hover:text-black"
          >
            &larr; back to all projects
          </Link>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="font-serif text-[56px] font-medium leading-[1.05] text-black max-lg:text-[36px]">
              {project.title}
            </h1>
            <span className="font-script text-[24px] text-ink-muted">{project.year}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[560px] text-[18px] leading-[28px] text-ink-muted">{project.description}</p>
          <ul className="mt-6 flex flex-wrap items-center gap-[8px]">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-[4px] bg-chip-bg px-[8px] py-[4px] text-[14px] font-medium capitalize tracking-[0.035px] text-chip-text"
              >
                {tag}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mt-14 bg-[#f5f4f1] p-[24px] shadow-paper">
            <span
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-[-18px] h-[55.408px] w-[114px] -translate-x-1/2 rotate-[-5deg] overflow-hidden"
            >
              <Image src="/assets/landing/tape-1.webp" alt="" fill sizes="114px" className="object-cover" />
            </span>
            <div className="relative aspect-[660/282] w-full overflow-hidden">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 832px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-20 flex flex-col items-center gap-6 text-center">
            <span className="chip text-[16px]">[ full case study — coming soon ]</span>
            <p className="max-w-[420px] text-[16px] leading-[24px] text-ink-muted">
              The whole story — research, explorations, dead ends and the shipped thing — is being
              written up with the care it deserves.
            </p>
            <p className="font-script text-[18px] text-black/70">worth the wait, promise.</p>
          </div>
        </Reveal>
      </article>
    </main>
  );
}
