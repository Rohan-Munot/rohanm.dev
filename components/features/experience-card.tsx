"use client";

import Link from "next/link";
import Image from "next/image";
import type { ExperienceItem } from "./experience-content";
import { ExperiencePopover } from "./experience-popover";

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const ExperienceLogo = ({ item }: { item: ExperienceItem }) => (
  <div className="size-8 rounded-sm overflow-hidden shrink-0 border border-border/40 flex items-center justify-center bg-white">
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

export const ExperienceCard = ({ item }: { item: ExperienceItem }) => {
  return (
    <div className="not-last:**:data-experience-card:border-b not-last:**:data-experience-card:border-dashed not-last:**:data-experience-card:border-border">
      <ExperiencePopover item={item}>
        <div
          data-experience-card
          className="flex items-center gap-3 py-3 outline-none focus:outline-none focus-visible:outline-none"
        >
          <ExperienceLogo item={item} />
          <div className="flex-1 min-w-0 flex flex-col gap-0.5">
            <div className="flex items-center justify-between gap-2">
              {item.url ? (
                <Link
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-foreground custom-dotted-underline"
                  aria-label={`Visit ${item.company} website`}
                >
                  {item.company}
                </Link>
              ) : (
                <span className="text-sm font-medium text-foreground">
                  {item.company}
                </span>
              )}
              <span className="text-xs text-muted-foreground tabular-nums shrink-0">
                {formatDate(item.startDate)} —{" "}
                {item.endDate ? formatDate(item.endDate) : "Present"}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">{item.role}</span>
          </div>
        </div>
      </ExperiencePopover>
    </div>
  );
};
