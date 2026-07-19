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

export default function Nav() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.header
      className="absolute inset-x-0 top-0 z-50"
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
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
                <NavLink href={href} label={label} />
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
      className="group relative inline-block"
    >
      <Link href={href} data-cursor="hover" className="relative inline-block">
        {label}
        {/* Underline wipes in from the left, out to the right. */}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 motion-reduce:transition-none" />
        {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-current" />}
      </Link>
    </motion.span>
  );
}
