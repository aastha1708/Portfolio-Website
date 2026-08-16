import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

/**
 * A platform-independent emoji.
 *
 * Emoji are drawn by the reader's operating system, so 🏡 is a cosy cottage on
 * a Mac, a flat blue house on Windows and something else again on Android. The
 * About page leans on the Apple set as part of its voice, so those glyphs ship
 * as images rather than characters.
 *
 * The artwork is NOT committed: Apple Color Emoji is a licensed system font
 * and its bitmaps can't be redistributed. Run
 *
 *   python3 scripts/extract-apple-emoji.py
 *
 * on a Mac to render the glyphs out of the local system font into
 * /public/emoji (gitignored). Until that runs — or on a machine without the
 * font — this renders the native character instead.
 *
 * The presence check happens on the server at render time rather than in the
 * browser via `onError`, which means no 404 per glyph, no flash of a broken
 * image, and no client JavaScript for what is a static decision. The directory
 * is read once per server process, so adding new artwork needs a dev-server
 * restart to show up.
 */

const EMOJI_DIR = path.join(process.cwd(), "public", "emoji");

const available: Set<string> = (() => {
  try {
    if (!existsSync(EMOJI_DIR)) return new Set();
    return new Set(readdirSync(EMOJI_DIR).filter((f) => f.endsWith(".png")).map((f) => f.slice(0, -4)));
  } catch {
    return new Set();
  }
})();

export default function Emoji({
  char,
  label,
  size = 16,
  className = "",
}: {
  /** The emoji character, e.g. "🏡". Doubles as the fallback and the alt text. */
  char: string;
  /** Accessible name. Omit to mark the glyph decorative. */
  label?: string;
  size?: number;
  className?: string;
}) {
  const name = [...char]
    .map((c) => c.codePointAt(0)!.toString(16))
    .filter((c) => c !== "fe0f") // drop the variation selector, as Twemoji does
    .join("-");

  const shared = `inline-block shrink-0 align-[-0.16em] ${className}`;

  if (!available.has(name)) {
    return (
      <span
        role={label ? "img" : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
        className={shared}
        style={{ fontSize: size, lineHeight: 1 }}
      >
        {char}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/emoji/${name}.png`}
      alt={label ?? ""}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={shared}
      style={{ width: size, height: size }}
    />
  );
}
