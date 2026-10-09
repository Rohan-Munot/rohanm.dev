import {
  formatDate,
  formatDuration,
} from "@/components/experience/experience-utils";
import ExperienceLogo from "@/components/experience/experience-logo";
import type { ExperienceItem } from "@/lib/types";
import { CaretRightIcon } from "@phosphor-icons/react";

const ExperienceHeader = ({ item }: { item: ExperienceItem }) => {
  const dateRange = `${formatDate(item.startDate)} — ${item.endDate ? formatDate(item.endDate) : "Present"
    }`;
  const duration = formatDuration(item.startDate, item.endDate);

  return (
    <div className="flex gap-3">
      <ExperienceLogo item={item} />
      <div className="flex-1 min-w-0 flex justify-between">
        <div className="flex flex-col justify-between gap-0.5 w-max">
          <span className="text-sm font-medium text-foreground truncate flex items-center gap-1">
            {item.company}
            <div className="invisible rotate-0 transition-transform duration-150 ease-out group-hover:visible group-data-panel-open:visible group-data-panel-open:rotate-90 motion-reduce:transition-none">
              <CaretRightIcon />
            </div>
          </span>
          <span className="text-xs text-muted-foreground truncate">
            {item.role}
          </span>
        </div>

        <div className="flex flex-col justify-center gap-0.5 items-end">
          <span className="text-xs text-muted-foreground tracking-tight tabular-nums shrink-0">
            {dateRange}
          </span>
          <span className="text-xs text-muted-foreground tabular-nums shrink-0">
            {duration}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExperienceHeader;
