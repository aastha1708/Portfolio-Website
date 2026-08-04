import { notFound } from "next/navigation";
import CaseStudyBody from "@/components/work/CaseStudyBody";
import { PROJECTS } from "@/lib/projects";

/**
 * Standalone case-study page — one per project, at its final URL, so deep
 * links and refreshes work even though in-site navigation presents the same
 * content as a bottom sheet (see app/@sheet). Kora has its own full page at
 * app/work/kora, which wins over this dynamic segment.
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

  /* CaseStudyBody brings its own shell (nav, contents column, footer) so the
     standalone route and the intercepted sheet render identically. */
  return <CaseStudyBody project={project} />;
}
