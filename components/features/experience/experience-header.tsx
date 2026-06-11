import Link from "next/link";
import { CaretDownIcon } from "@phosphor-icons/react/ssr";
import { formatDate, formatDuration } from "./experience-utils";
import ExperienceLogo from "./experience-logo";
import type { ExperienceItem } from "@/lib/types";

const ExperienceHeader = ({ item }: { item: ExperienceItem }) => {
  const dateRange = `${formatDate(item.startDate)}—${
    item.endDate ? formatDate(item.endDate) : "Present"
  }`;
  const duration = formatDuration(item.startDate, item.endDate);

  return (
    <div className="flex gap-3">
      <ExperienceLogo item={item} />
      <div className="flex-1 min-w-0 flex justify-between">
        <div className="flex flex-col justify-between gap-0.5 w-max">
          {item.url ? (
            <Link
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground custom-dotted-underline truncate w-max"
              aria-label={`Visit ${item.company} website`}
            >
              {item.company}
            </Link>
          ) : (
            <span className="text-sm font-medium text-foreground truncate">
              {item.company}
            </span>
          )}
          <span className="text-xs text-muted-foreground truncate">
            {item.role}
          </span>
        </div>

        <div className="flex gap-2 items-center">
        <div className="flex flex-col justify-center gap-0.5 items-end">
          <span className="text-xs text-muted-foreground tracking-tight tabular-nums shrink-0">
            {dateRange}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {duration}
          </span>
        </div>
        {/*<div className="flex items-center justify-center p-1 rounded-sm hover:bg-mutedy transition-colors">
          <CaretDownIcon
            size={16}
            className="text-muted-foreground transition-transform duration-200 group-data-panel-open:rotate-180"
          />
        </div>*/}
        </div>
      </div>
    </div>
  );
};

export default ExperienceHeader;
