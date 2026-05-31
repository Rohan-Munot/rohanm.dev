import Image from "next/image";
import type { ExperienceItem } from "./experience-content";

export const ExperienceLogo = ({ item }: { item: ExperienceItem }) => (
  <div className="size-8 rounded-sm overflow-hidden shrink-0 border border-border/40 flex items-center justify-center bg-white p-0.5">
    {item.logo ? (
      <Image
        src={`/logos/${item.logo}.png`}
        alt={`${item.company} logo`}
        width={32}
        height={32}
        className="size-full object-contain"
      />
    ) : (
      <span className="text-xs text-muted-foreground font-mono">
        {item.company.charAt(0)}
      </span>
    )}
  </div>
);
