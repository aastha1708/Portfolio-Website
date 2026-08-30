import { notFound } from "next/navigation";
import CaseStudyBody from "@/components/work/CaseStudyBody";
import { PROJECTS } from "@/lib/projects";

/**
 * Standalone case-study page — one per project, at its final URL, so deep
 * links and refreshes work even though in-site navigation presents the same
 * content as a bottom sheet (see app/@sheet). Written-up case studies have
 * their own full pages (app/work/kora, app/work/dyslexiar), which win over
 * this dynamic segment; this route serves the ones still to be written.
 */

/** Only the projects this route actually owns — the rest have real pages. */
const WRITTEN_UP = new Set(["kora", "dyslexiar"]);

export function generateStaticParams() {
  return PROJECTS.filter((p) => !WRITTEN_UP.has(p.id)).map((p) => ({ slug: p.id }));
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
