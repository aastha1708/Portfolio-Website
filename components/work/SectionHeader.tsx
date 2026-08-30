/**
 * The two-line heading every case-study section opens with: a quiet uppercase
 * kicker naming the phase of work, and the finding itself set in the display
 * face (Figma 636:458 / 459:3694).
 *
 * The kicker is the label, the title is the argument — which is why the title
 * is a sentence and not a noun. "Context / Traditional dyslexia assessments
 * feel like exams." tells a skimming hiring manager what the section concluded
 * without them reading the paragraph under it.
 */
export default function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="flex flex-col gap-[14px]">
      <p className="text-[16px] font-medium uppercase text-ink-muted">{kicker}</p>
      <h2 className="font-display text-[32px] leading-[1.15] tracking-[-0.408px] text-black">{title}</h2>
    </div>
  );
}
