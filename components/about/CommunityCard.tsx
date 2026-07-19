import Image from "next/image";

export type Community = {
  title: string;
  body: string;
  photo: string;
  logo?: string;
  logoSize: number;
};

export default function CommunityCard({ community }: { community: Community }) {
  return (
    <article className="flex w-full flex-col items-start rounded-[12px] bg-[#f0efea] p-[24px] lg:w-[377px]">
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
          <Image src={community.photo} alt={community.title} fill sizes="377px" className="object-cover" />
        </div>
      </div>
    </article>
  );
}
