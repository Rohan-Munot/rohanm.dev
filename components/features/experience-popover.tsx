"use client";

import { Popover } from "@base-ui/react/popover";
import { Badge } from "@/components/ui/badge";
import type { ExperienceItem } from "./experience-content";

export const ExperiencePopover = ({
  item,
  children,
}: {
  item: ExperienceItem;
  children: React.ReactElement;
}) => (
  <Popover.Root>
    <Popover.Trigger
      nativeButton={false}
      openOnHover
      delay={100}
      closeDelay={80}
      render={children}
    />
    <Popover.Portal keepMounted>
      <Popover.Positioner side="right" align="center" sideOffset={8} alignOffset={0}>
        <Popover.Popup className="bg-background p-3.5 w-72 border border-border rounded-md ">

          <span className="text-sm font-medium text-foreground">{item.company}</span>

          {item.description.length > 0 && (
            <ul className="text-sm text-foreground/80 leading-relaxed space-y-1">
              {item.description.map((point, i) => (
                <li
                  key={i}
                  className="relative pl-4 before:absolute before:left-0 before:top-3 before:h-px before:w-2 before:border-t before:border-dashed before:border-muted-foreground"
                >
                  {point}
                </li>
              ))}
            </ul>
          )}
          {item.tools && item.tools.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-xs text-foreground">Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <Badge key={tool}>{tool}</Badge>
                ))}
              </div>
            </div>
          )}
        </Popover.Popup>
      </Popover.Positioner>
    </Popover.Portal>
  </Popover.Root>
);
