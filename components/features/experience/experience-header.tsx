import Link from "next/link";
import { ExperienceLogo } from "./experience-logo";
import type { ExperienceItem } from "./experience-content";
import { formatDate, formatDuration } from "./experience-utils";

export const ExperienceHeader = ({ item }: { item: ExperienceItem }) => {
  const dateRange = `${formatDate(item.startDate)} — ${
    item.endDate ? formatDate(item.endDate) : "Present"
  }`;
  const duration = formatDuration(item.startDate, item.endDate);

  return (
    <div className="flex gap-3">
      <ExperienceLogo item={item} />
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <div className="flex justify-between gap-2">
          {item.url ? (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground custom-dotted-underline truncate"
              aria-label={`Visit ${item.company} website`}
            >
              {item.company}
            </Link>
          ) : (
            <span className="text-sm font-medium text-foreground truncate">
              {item.company}
            </span>
          )}
          <span className="hidden sm:block text-xs text-muted-foreground tabular-nums shrink-0">
            {dateRange}
          </span>
        </div>

        <div className="flex justify-between gap-2">
          <span className="text-xs text-muted-foreground truncate">
            {item.role}
          </span>
          <span className="hidden sm:block text-xs text-muted-foreground tabular-nums shrink-0">
            {duration}
          </span>
        </div>

        <span className="sm:hidden mt-0.5 text-xs text-muted-foreground tabular-nums">
          {dateRange}
          {duration && (
            <>
              <span className="text-border-color"> · </span>
              {duration}
            </>
          )}
        </span>
      </div>
    </div>
  );
};
