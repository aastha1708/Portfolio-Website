import Image from "next/image";

/**
 * Case-study tags (Figma 517:4260).
 *
 * The August 2026 design retired the pink filled tags for outlined pills on
 * paper: a case-study header carries a title, a subtitle, an award and three
 * tags all at once, and filled colour made the tags shout over the title. An
 * outline says "metadata" without competing.
 *
 * The `award` variant flanks its label with the gold laurels, so the one
 * genuine achievement in the row reads differently from the two descriptive
 * tags. The laurel art is lifted from the original Pro Creator Designathon
 * ribbon export (3rdplace) — keyed off its cream plate by saturation and
 * committed to design/assets-source, so it goes through the normal asset
 * pipeline rather than being a one-off file in public/.
 */
export function Chip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex h-[28px] items-center rounded-full border border-hairline bg-paper px-[12px] text-[12px] font-medium leading-none text-[#777]">
      {children}
    </li>
  );
}

export function AwardChip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex h-[28px] items-center gap-[2px] rounded-full border border-hairline bg-paper px-[8px] text-[12px] font-medium leading-none text-[#777]">
      <Image src="/assets/kora/laurel-left.webp" alt="" width={14} height={16} className="h-[16px] w-[14px]" />
      {children}
      <Image src="/assets/kora/laurel-right.webp" alt="" width={14} height={16} className="h-[16px] w-[14px]" />
    </li>
  );
}
