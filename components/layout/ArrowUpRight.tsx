/**
 * The site's one "goes somewhere else" mark — an up arrow tipped 46°, as drawn
 * in Figma (basil:arrow-up-outline at -46.02°). Shared by the footer links and
 * the case-study visit link so external destinations always carry the same
 * signal.
 */
export default function ArrowUpRight({ className = "size-[20px]" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 20 20"
      className={`rotate-[46.02deg] ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 16V4M10 4l-5 5M10 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
