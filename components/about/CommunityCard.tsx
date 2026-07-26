"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export type Community = {
  title: string;
  body: string;
  photo: string;
  logo?: string;
  logoSize: number;
};

export default function CommunityCard({ community }: { community: Community }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className="group flex w-full flex-col items-start rounded-[12px] bg-[#f0efea] p-[24px] lg:w-[377px]"
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 28 }}
      data-cursor="hover"
    >
      <div className="flex w-full flex-col gap-[24px]">
        <div className="flex w-full flex-col gap-[12px]">
          <div className="flex h-[22px] w-full items-center gap-[10px]">
            {community.logo && (
              <span className="relative shrink-0" style={{ width: community.logoSize, height: community.logoSize }}>
                <Image src={community.logo} alt="" fill sizes="58px" className="object-contain" />
              </span>
            )}
            <h3 className="whitespace-nowrap font-serif text-[20px] font-medium leading-[22px] tracking-[-0.408px] text-black">
              {community.title}
            </h3>
          </div>
          <p className="w-full text-[16px] leading-[20px] text-ink-muted">{community.body}</p>
        </div>
        <div className="relative h-[257.093px] w-full overflow-hidden rounded-[8px]">
          {/* Same quiet push-in the project cards use — one hover language everywhere. */}
          <Image
            src={community.photo}
            alt={community.title}
            fill
            sizes="377px"
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] motion-reduce:transition-none"
          />
        </div>
      </div>
    </motion.article>
  );
}
