import { Popover } from "@base-ui/react/popover";
import type { ExperienceItem } from "./experience-content";
import { ExperienceBullets } from "./experience-bullets";

export const ExperiencePopover = ({
  item,
  children,
}: {
  item: ExperienceItem;
  children: React.ReactElement;
}) => {
  return (
    <Popover.Root>
      <Popover.Trigger
        nativeButton={false}
        delay={0}
        openOnHover
        render={children}
      />
      <Popover.Portal>
        <Popover.Positioner
          side="top"
          align="end"
          sideOffset={-15}
          alignOffset={0}
        >
          <Popover.Popup className="bg-background p-3.5 w-96 border border-border flex flex-col gap-3 z-50">
            <span className="text-sm font-medium text-foreground">{item.company}</span>
            <ExperienceBullets
              items={item.description}
              tools={item.tools}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
