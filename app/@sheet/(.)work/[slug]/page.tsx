import { notFound } from "next/navigation";
import ProjectSheet from "@/components/work/ProjectSheet";
import CaseStudyBody from "@/components/work/CaseStudyBody";
import KoraPage from "@/app/work/kora/page";
import { PROJECTS } from "@/lib/projects";

/**
 * Intercepting route: when a project card is clicked ON the landing page,
 * /work/[slug] renders here — as a bottom sheet over the still-mounted
 * landing — instead of replacing the whole view. The URL is the real,
 * shareable case-study URL; direct visits and refreshes fall through to
 * app/work/... as full pages.
 */
export default async function InterceptedCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.id === slug);
  if (!project) notFound();

  return (
    <ProjectSheet>
      {slug === "kora" ? <KoraPage /> : <CaseStudyBody project={project} />}
    </ProjectSheet>
  );
}
