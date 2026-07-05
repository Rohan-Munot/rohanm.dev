import Image from "next/image";
import type { ExperienceItem } from "@/lib/types";

const ExperienceLogo = ({ item }: { item: ExperienceItem }) => (
  <div className="h-10.25 w-10.25 aspect-square rounded-sm overflow-hidden shrink-0 border border-border/40 flex items-center justify-center bg-white p-0.5">
    {item.logo ? (
      <Image
        src={`/logos/${item.logo}.png`}
        alt={`${item.company} logo`}
        width={41}
        height={41}
        className="size-full object-contain"
      />
    ) : (
      <span className="text-xs text-muted-foreground font-mono">
        {item.company.charAt(0)}
      </span>
    )}
  </div>
);

export default ExperienceLogo;
