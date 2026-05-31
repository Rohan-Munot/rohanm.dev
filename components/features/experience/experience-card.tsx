"use client";

import Link from "next/link";
import type { ExperienceItem } from "./experience-content";
import { ExperiencePopover } from "./experience-popover";
import { ExperienceLogo } from "./experience-logo";

const formatDate = (dateString: string): string => {
  const [year, month] = dateString.split("-");
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};


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
