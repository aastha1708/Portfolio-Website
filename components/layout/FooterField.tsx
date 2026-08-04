import type { ReactNode } from "react";
import DotGridMouse from "@/components/motion/DotGridMouse";
import FooterMotion from "@/components/motion/FooterMotion";
import PostcardFooter from "@/components/layout/PostcardFooter";

/**
 * The footer, complete: the dot field that leans toward the cursor, with the
 * postcard landing on top of it.
 *
 * The landing page's desktop stage places these by hand inside its 1440
 * composition; every other footer on the site is a normal flow block, and
 * they were all still painting the static CSS dot field. One component now,
 * so the live field is the default and can't be forgotten again.
 */
export default function FooterField({
  className = "",
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative px-6 pb-16 pt-10 max-lg:px-5 ${className}`}>
      <DotGridMouse className="absolute inset-0 size-full" />
      <FooterMotion className="relative mx-auto max-w-[1195px]">
        {children ?? <PostcardFooter />}
      </FooterMotion>
    </div>
  );
}
