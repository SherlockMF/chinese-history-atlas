import Image from "next/image";

import { portraits } from "@/data/portraits";
import { cn } from "@/lib/utils";
import type { Person } from "@/types/history";

export function PersonPortrait({
  person,
  variant = "portrait",
  details = false,
  collapsibleDetails = false,
  className,
}: {
  person: Pick<Person, "id" | "name">;
  variant?: "portrait" | "avatar";
  details?: boolean;
  collapsibleDetails?: boolean;
  className?: string;
}) {
  const portrait = portraits[person.id];
  const isAvatar = variant === "avatar";

  if (!portrait) {
    return <span className={cn("block text-center", isAvatar && "w-16 shrink-0", className)}>
      <span aria-hidden="true" className={cn("relative grid place-items-center overflow-hidden border border-current/15 bg-mist/60 font-serif text-current/60", isAvatar ? "size-16 rounded-full text-2xl" : "aspect-[3/4] rounded-xl text-5xl")}>
        <span className={cn("border-y border-current/20 py-5 tracking-[0.12em]", !isAvatar && "[writing-mode:vertical-rl]")}>{isAvatar ? person.name.slice(0, 1) : person.name}</span>
      </span>
      <span className="mt-2 block text-[10px] leading-4 opacity-70">画像未收录</span>
    </span>;
  }

  const detailContent = portrait.kind === "referenced" ? (
    <a href={portrait.source.url} target="_blank" rel="noreferrer" className="block underline decoration-current/40 underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current">
      参考画像：{portrait.source.title}
    </a>
  ) : <span className="block">本幅未采用传世本人肖像，依据年龄设定、身份与生平作艺术想象。</span>;
  const description = <span className="mt-3 block space-y-2 text-xs leading-6">
    {detailContent}
    <span className="block opacity-75">{portrait.note.split(/(https?:\/\/[^\s\u3000-\u303f\uff00-\uffef)]+)/g).map((part, index) => /^https?:\/\//.test(part) ? (
      <a key={index} href={part} target="_blank" rel="noreferrer" className="break-all underline decoration-current/40 underline-offset-4 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current">{part}</a>
    ) : part)}</span>
    <span className="block opacity-75">画像均为艺术创作，非真容复原。</span>
  </span>;

  return (
    <span className={cn("block", isAvatar && "w-16 shrink-0 text-center", className)}>
      <span className={cn("block overflow-hidden border border-current/15 bg-[#ded3b9]", isAvatar ? "size-16 rounded-full" : "aspect-[3/4] rounded-xl")}>
        <Image
          src={portrait.src}
          alt={`${person.name}画像`}
          width={portrait.width}
          height={portrait.height}
          sizes={isAvatar ? "64px" : "(max-width: 640px) 90vw, 320px"}
          className={cn("h-full w-full object-cover", isAvatar && "object-[center_25%]")}
        />
      </span>
      <span className={cn("mt-2 block text-[10px] leading-4", !isAvatar && "tracking-wider")}>
        {portrait.kind === "referenced" ? "有参考画像" : "无参考画像"}
      </span>
      {details ? collapsibleDetails ? <details className="mt-2 text-xs"><summary className="cursor-pointer text-current/70 focus-visible:outline-current">画像依据与说明</summary>{description}</details> : description : null}
    </span>
  );
}
