#!/usr/bin/env python3
"""
Render Apple's emoji artwork into /public/emoji so the About page shows the
same glyphs on every device.

WHY THIS EXISTS
---------------
Emoji are drawn by the reader's operating system. The About page uses 🏡 🏢 🏫
as part of its voice, and the Windows and Android versions of those glyphs look
nothing like the Apple ones the design was drawn with. Serving images fixes
that — but Apple Color Emoji is a licensed system font, so the artwork must NOT
be committed to the repo or copied off this machine. This script reads the copy
already installed on YOUR Mac and writes the PNGs into /public/emoji, which is
gitignored.

RUN IT
------
    pip3 install fonttools            # one-off
    python3 scripts/extract-apple-emoji.py

Re-run it whenever you add a new emoji to EMOJI below. On a machine without the
font, nothing breaks: components/layout/Emoji.tsx falls back to the native
character.

HOW IT WORKS
------------
Apple Color Emoji is an `sbix` font: instead of vector outlines it carries a
PNG bitmap per glyph, at several sizes. We look the character up in the cmap to
get its glyph name, then pull the largest available strike.
"""

import os
import sys

FONT_CANDIDATES = [
    "/System/Library/Fonts/Apple Color Emoji.ttc",
    "/Library/Fonts/Apple Color Emoji.ttc",
]

# Every emoji the site renders through <Emoji>. Keep in sync with the markup.
EMOJI = ["🏡", "🏢", "🏫"]

OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "emoji")


def die(message: str) -> None:
    print(f"\n  {message}\n")
    sys.exit(1)


def main() -> None:
    try:
        from fontTools.ttLib import TTFont
    except ImportError:
        die("fontTools is missing.  Run:  pip3 install fonttools")

    font_path = next((p for p in FONT_CANDIDATES if os.path.exists(p)), None)
    if not font_path:
        die(
            "Apple Color Emoji not found — this script only runs on macOS.\n"
            "  That's fine: the site falls back to native emoji without it."
        )

    font = TTFont(font_path, fontNumber=0)
    if "sbix" not in font:
        die("This font has no sbix table; nothing to extract.")

    cmap = font.getBestCmap()
    sbix = font["sbix"]
    # Largest strike = sharpest artwork. Retina wants at least 2x the CSS size.
    strike = max(sbix.strikes.values(), key=lambda s: s.ppem)

    os.makedirs(OUT_DIR, exist_ok=True)
    written = 0

    for char in EMOJI:
        codepoints = [c for c in (ord(ch) for ch in char) if c != 0xFE0F]
        name = "-".join(f"{c:x}" for c in codepoints)

        # Single-codepoint emoji resolve straight through cmap. Sequences (ZWJ,
        # flags, skin tones) are built by GSUB and are out of scope here.
        if len(codepoints) != 1:
            print(f"  skip {char} ({name}) — multi-codepoint sequences aren't supported")
            continue

        glyph_name = cmap.get(codepoints[0])
        if not glyph_name:
            print(f"  skip {char} ({name}) — not in this font")
            continue

        glyph = strike.glyphs.get(glyph_name)
        if not glyph or not glyph.imageData:
            print(f"  skip {char} ({name}) — no bitmap in the {strike.ppem}px strike")
            continue

        out = os.path.join(OUT_DIR, f"{name}.png")
        with open(out, "wb") as fh:
            fh.write(glyph.imageData)
        print(f"  {char}  ->  public/emoji/{name}.png  ({strike.ppem}px strike)")
        written += 1

    print(f"\n{written} of {len(EMOJI)} written to public/emoji/\n")


if __name__ == "__main__":
    main()
