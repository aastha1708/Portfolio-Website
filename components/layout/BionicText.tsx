/**
 * Bionic reading: the opening letters of every word are set heavier, so the
 * eye lands on a fixation point and skims the rest. Used for the About bio
 * (Figma 561:352, which ships it as 199 hand-styled text runs).
 *
 * Generated rather than transcribed — 199 spans of hard-coded markup would be
 * unreadable and unmaintainable, and the copy still changes.
 *
 * Only the leading LETTERS count toward the split, so trailing punctuation
 * rides with the light tail: "world," bolds "wo", not "wor". Words are
 * emitted as plain spans (not <strong>), because this is a reading aid, not
 * emphasis — a screen reader should hear an ordinary paragraph, and the text
 * still copies out as one clean string.
 */
export default function BionicText({
  text,
  /** Share of each word's letters to embolden. 0.4 reproduces the Figma runs. */
  ratio = 0.4,
  className,
}: {
  text: string;
  ratio?: number;
  className?: string;
}) {
  /* Split on whitespace but KEEP it, so the original spacing survives. */
  const tokens = text.split(/(\s+)/);

  return (
    <span className={className}>
      {tokens.map((token, i) => {
        if (!token || /^\s+$/.test(token)) return token;

        const letters = /^\p{L}+/u.exec(token)?.[0].length ?? 0;
        if (!letters) return token;

        const cut = Math.max(1, Math.round(letters * ratio));
        return (
          <span key={i}>
            {/* Weight only — the Figma runs keep both halves at #666. Adding
                colour contrast on top of weight makes the page look like it
                has a highlighting bug. */}
            <span className="font-semibold">{token.slice(0, cut)}</span>
            {token.slice(cut)}
          </span>
        );
      })}
    </span>
  );
}
