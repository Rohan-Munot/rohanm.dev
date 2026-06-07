"use client";

import type { ExperienceItem } from "@/lib/types";
import ExperiencePopover from "./experience-popover";
import ExperienceHeader from "./experience-header";
import Badge from "@/components/ui/badge";

const ExperienceCard = ({ item }: { item: ExperienceItem }) => {
  return (
    <div className="not-last:**:data-experience-card:border-b not-last:**:data-experience-card:border-dashed not-last:**:data-experience-card:border-border">
      <ExperiencePopover item={item}>
        <div
          data-experience-card
          className="flex flex-col gap-2.5 py-3.5 outline-none focus:outline-none focus-visible:outline-none"
        >
          <ExperienceHeader item={item} />
          {item.tools && item.tools.length > 0 && (
            <div className="flex gap-1.5 flex-wrap pl-13.5">
              {item.tools.map((tool, index) => (
                <Badge key={index}>{tool}</Badge>
              ))}
            </div>
          )}
        </div>
      </ExperiencePopover>
    </div>
  );
};

export default ExperienceCard;