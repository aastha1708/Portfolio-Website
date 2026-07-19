import Link from "next/link";

const LINKS = [
  { label: "About", href: "/about", ready: true },
  { label: "Work", href: "/work", ready: false },
  { label: "Playground", href: "/playground", ready: false },
  { label: "Visitor Gallery", href: "/gallery", ready: false },
];

export default function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-[1320px] items-center justify-between px-gutter py-[34px] text-[13px]"
      >
        <Link href="/" data-cursor="hover" className="font-medium tracking-tight">
          Aastha
        </Link>
        <ul className="flex items-center gap-8">
          {LINKS.map(({ label, href, ready }) => (
            <li key={label}>
              {ready ? (
                <Link href={href} data-cursor="hover" className="transition-opacity hover:opacity-60">
                  {label}
                </Link>
              ) : (
                <span
                  data-cursor="label"
                  data-cursor-text="Coming soon"
                  className="cursor-default text-ink-muted/70"
                  aria-disabled="true"
                >
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
