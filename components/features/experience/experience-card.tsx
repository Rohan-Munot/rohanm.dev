"use client";

import type { ExperienceItem } from "@/lib/types";
import ExperienceBullets from "./experience-bullets";
import ExperienceHeader from "./experience-header";
import Badge from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsiblePanel,
} from "@/components/ui/collapsible";

const ExperienceCard = ({
  item,
}: {
  item: ExperienceItem;
}) => {
  return (
    <div className="not-last:**:data-experience-card:border-b not-last:**:data-experience-card:border-dashed not-last:**:data-experience-card:border-border select-none">
      <Collapsible>
        <CollapsibleTrigger
          nativeButton={false}
          render={
            <div
              data-experience-card
              className="group flex flex-col gap-2.5 py-3.5 outline-none focus:outline-none focus-visible:outline-none cursor-pointer"
            >
              <ExperienceHeader item={item} />
              <CollapsiblePanel>
                <div className="pl-13.5">
                  <ExperienceBullets
                    items={item.description}
                    tools={item.tools}
                    showTools={false}
                  />
                </div>
              </CollapsiblePanel>
              {item.tools && item.tools.length > 0 && (
                <div className="flex gap-1.5 flex-wrap pl-13.5">
                  {item.tools.map((tool, index) => (
                    <Badge key={index}>{tool}</Badge>
                  ))}
                </div>
              )}
            </div>
          }
        />
      </Collapsible>
    </div>
  );
};

export default ExperienceCard;
