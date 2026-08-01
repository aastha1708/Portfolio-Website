import Image from "next/image";

/**
 * A pure-CSS iPhone mockup for case-study screenshots. The exported screens
 * (design/assets-source/Kora page) are raw 1608x3496 captures — status bar
 * and home indicator baked in, no device — so this supplies the body:
 * bezel, screen radius and dynamic island. CSS instead of a device PNG
 * keeps it crisp at any DPI and costs zero image weight.
 *
 * Width is set by the parent; everything inside scales off it.
 */
export default function IphoneFrame({
  src,
  alt,
  className = "",
  priority = false,
  sizes = "262px",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[13.5%_/_6.2%] bg-[#101014] p-[3.2%] shadow-paper ring-1 ring-black/10 ${className}`}
    >
      <div className="relative aspect-[1608/3496] w-full overflow-hidden rounded-[11%_/_5.1%] bg-[#f5f5f5]">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" priority={priority} />
        {/* Dynamic island */}
        <span
          aria-hidden
          className="absolute left-1/2 top-[1.55%] h-[3.3%] w-[32%] -translate-x-1/2 rounded-full bg-[#101014]"
        />
      </div>
    </div>
  );
}
