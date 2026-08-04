import Image from "next/image";

const LINKS = [
  { label: "aasthapcharag@gmail.com", href: "mailto:aasthapcharag@gmail.com", arrow: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aasthasingh1708", arrow: true },
  { label: "Resume", href: "https://flowcv.com/resume/4rqffng202tj", arrow: true },
];

/** Shared postcard footer — identical on the landing and about pages. */
export default function PostcardFooter() {
  return (
    <footer className="relative flex w-full gap-[56px] border border-solid border-[#ddd] bg-[#f5f4f1] px-[40px] py-[32px] shadow-paper max-lg:flex-col max-lg:gap-8">
      <div className="flex shrink-0 flex-col gap-[32px] border-dashed border-[#999] py-[28px] lg:w-[657.576px] lg:border-r max-lg:border-b max-lg:pb-8">
        <p className="font-script text-[32px] leading-[56px] text-black lg:w-[603.8px] max-lg:text-[24px] max-lg:leading-[40px]">
          like art, their perception of you is an interpretation.
        </p>
        <p className="text-[16px] font-medium leading-[24px] text-[#404040] lg:w-[420.356px]">
          Open to Product/ UX designer roles for 2026. If you&rsquo;ve read this far, the coffee is on me.
        </p>
        <p className="font-script text-[16px] leading-[24px] text-[#404040]">&mdash; aastha</p>
      </div>

      <span
        aria-hidden
        className="pointer-events-none absolute hidden h-[121px] w-[100px] lg:block"
        style={{ left: 1067.71, top: 17.01, transform: "rotate(-176.29deg) scaleY(-1)" }}
      >
        <Image src="/assets/landing/postcard-stamp.webp" alt="" fill sizes="100px" className="object-cover" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col justify-between lg:h-[295.009px]">
        <ul className="flex flex-col items-start justify-end gap-[8px] lg:h-[159.42px]">
          {LINKS.map(({ label, href, arrow }) => (
            <li key={label} className="flex items-center border-b-[1.5px] border-solid border-[#888]">
              <a
                href={href}
                data-cursor="snap"
                className="flex items-center text-[14px] font-medium leading-[30px] text-black transition-opacity hover:opacity-60"
                {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer noopener" } : {})}
              >
                {label}
                {arrow && (
                  <svg
                    aria-hidden
                    viewBox="0 0 20 20"
                    className="ml-1 size-[20px] rotate-[46.02deg]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M10 16V4M10 4l-5 5M10 4l5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-[12px] font-medium uppercase text-ink-muted lg:mt-0">
          designed &amp; hand-assembled by Aastha singh &middot; 2026
        </p>
      </div>
    </footer>
  );
}
