/**
 * The quiet uppercase marker that names a section — "how I work", "projects
 * that i designed with love <3" (Figma 538:4735 / 569:568).
 *
 * The August 2026 design retired the big display section headings: the work
 * itself is the loud element now, and the label only has to say where you are.
 * Rendered as an h2 so the page still has a real outline for assistive tech
 * even though it doesn't look like a heading.
 */
export default function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-center text-[16px] font-semibold uppercase text-ink-muted max-lg:text-[13px] ${className}`}
    >
      {children}
    </h2>
  );
}
