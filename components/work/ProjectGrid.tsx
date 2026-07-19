import { PROJECTS } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

/** Desktop: the exact Figma scatter. Mobile: a plain stack of the same cards. */
export default function ProjectGrid() {
  return (
    <>
      <div className="relative hidden h-[983px] w-[1324px] lg:block">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
      <div className="flex flex-col gap-12 px-5 lg:hidden">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.id} project={p} absolute={false} />
        ))}
      </div>
    </>
  );
}
