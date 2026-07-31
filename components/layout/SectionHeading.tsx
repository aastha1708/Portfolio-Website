/** "my projects" style section header — Canela Text Italic over an uppercase
    kicker (Figma 246:2646). The July 2026 redesign moved these headings from
    the handwritten script to the display serif. */
export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center gap-[12px] text-center ${className}`}>
      <h2 className="font-display w-full text-[42px] leading-[42px] tracking-[-1.5px] text-black">{title}</h2>
      {subtitle && (
        <p className="w-full text-[16px] uppercase text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}
