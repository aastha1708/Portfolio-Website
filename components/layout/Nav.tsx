"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useMagnetic } from "@/components/motion/useMagnetic";

const LINKS = [
  { label: "About", href: "/about", ready: true },
  { label: "Work", href: "/work", ready: false },
  { label: "Playground", href: "/playground", ready: false },
  { label: "Visitor Gallery", href: "/gallery", ready: false },
];

/* Shared pill treatment: padding is cancelled with negative margins so the
   highlight can appear on hover without shifting the text. */
const PILL =
  "relative inline-block rounded-full px-[10px] py-[5px] -mx-[10px] -my-[5px] transition-colors duration-200";

export default function Nav() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Full-bleed row, 60px from each edge (Figma frame 246:2522) — the logo
          and the link cluster sit at opposite ends of the whole page. */}
      <nav
        aria-label="Primary"
        className="flex w-full items-center justify-between px-gutter py-[34px] text-[13px] max-lg:px-5 max-lg:py-6"
      >
        <Link href="/" data-cursor="hover" className="font-medium tracking-tight">
          Aastha
        </Link>
        <ul className="flex items-center gap-[36px] max-lg:gap-5">
          {LINKS.map(({ label, href, ready }) => (
            <li key={label}>
              {ready ? (
                <NavLink href={href} label={label} />
              ) : (
                /* Coming-soon pages read exactly like inactive links — the
                   hover label is what communicates their state. */
                <span
                  data-cursor="label"
                  data-cursor-text="Coming soon"
                  className={`${PILL} cursor-default text-ink-muted hover:bg-black/[0.04]`}
                  aria-disabled="true"
                >
                  {label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  const magnetic = useMagnetic(0.25);

  return (
    <motion.span
      ref={magnetic.ref as never}
      onPointerMove={magnetic.onPointerMove}
      onPointerLeave={magnetic.onPointerLeave}
      style={{ x: magnetic.x, y: magnetic.y }}
      className="inline-block"
    >
      <Link
        href={href}
        data-cursor="hover"
        aria-current={active ? "page" : undefined}
        className={`${PILL} hover:bg-black/[0.05] ${
          active ? "text-black" : "text-ink-muted hover:text-black"
        }`}
      >
        {label}
      </Link>
    </motion.span>
  );
}
