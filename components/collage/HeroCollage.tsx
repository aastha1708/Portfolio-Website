/**
 * Hero: wordmark + tagline + chips.
 *
 * The scattered object collage (airpods, Kite Runner, beach polaroid, orchid,
 * seashell, camera, dry flower, gingham paper, postcard, iced coffee, daisy,
 * paperclip, and the tool logos) is NOT yet placed. Figma reports the
 * *untransformed* origin for rotated nodes, so the raw x/y values don't
 * describe where the objects visually sit, and rotation isn't exposed at all
 * on individual nodes. Exact geometry is pulled from the grouped hero frame —
 * see lib/collage-landing.ts once that data lands.
 */
export default function HeroCollage() {
  return (
    <section className="relative lg:absolute lg:inset-x-0" aria-label="Introduction">
      <div className="lg:absolute lg:left-[438px] lg:top-[300px] lg:w-[564px] flex flex-col items-center justify-center gap-[16px] max-lg:px-5 max-lg:pb-16 max-lg:pt-32">
        <h1 className="font-wordmark w-full text-center text-[102px] leading-[96px] text-black max-lg:text-[56px] max-lg:leading-[56px]">
          aastha singh
        </h1>
        <div className="flex items-center justify-center gap-[12px] max-lg:flex-wrap">
          {["designing", "tinkering", "drinking coffee"].map((word, i) => (
            <span key={word} className="flex items-center gap-[12px]">
              {i > 0 && <span aria-hidden className="size-[6px] rounded-full bg-ink-muted" />}
              <span className="text-center text-[20px] uppercase text-ink-muted max-lg:text-[14px]">{word}</span>
            </span>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          <span className="chip max-lg:text-[15px]">[ UI/UX Designer ]</span>
          <span className="chip max-lg:text-[15px]">[ Delhi, India ]</span>
        </div>
      </div>
    </section>
  );
}
