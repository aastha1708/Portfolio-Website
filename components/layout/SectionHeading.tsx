/** "my projects" / "some of my favourite things" style section header. */
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
    <div className={`flex flex-col items-center gap-[24px] text-center ${className}`}>
      <h2 className="font-script w-full text-[36px] leading-[22px] tracking-[-0.408px] text-black">{title}</h2>
      {subtitle && (
        <p className="w-full text-[16px] uppercase text-ink-muted">{subtitle}</p>
      )}
    </div>
  );
}
