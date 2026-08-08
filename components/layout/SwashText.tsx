/**
 * A display line whose opening capital is set in the swash face (Amoresa)
 * while the rest stays in PP Editorial Old — the Figma treatment for both
 * "Product & Visual Designer" and "Feel free to connect for cool projects".
 *
 * Doing the split here rather than at each call site keeps the two lines
 * consistent and keeps the markup a single accessible string: the swash is a
 * `<span>` inside the heading, not a separate element, so screen readers and
 * text selection still see one word.
 *
 * Amoresa's capitals carry a long entry tail, so the character that follows
 * needs positive tracking to clear it. That value differs per glyph (the P's
 * tail is short, the F's is long), hence `swashTracking`.
 */
export default function SwashText({
  text,
  swashTracking = "2.8px",
  className,
}: {
  /** Use "\n" for an explicit line break. */
  text: string;
  /** Letter-spacing applied to the ornamental capital. */
  swashTracking?: string;
  className?: string;
}) {
  const [first, ...restChars] = [...text];
  const rest = restChars.join("");
  const lines = rest.split("\n");

  return (
    <span className={className}>
      <span className="font-swash" style={{ letterSpacing: swashTracking }}>
        {first}
      </span>
      {lines.map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </span>
  );
}
