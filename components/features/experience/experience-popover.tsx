import { Popover } from "@base-ui/react/popover";
import { XIcon } from "@phosphor-icons/react/dist/ssr";
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
          sideOffset={-5}
          alignOffset={0}
        >
          <Popover.Popup className="bg-background p-3.5 max-w-86 border border-border flex flex-col gap-3 z-50 relative">
            <Popover.Close className="sm:hidden absolute top-3 right-3">
              <XIcon size={16} />
            </Popover.Close>
            <span className="text-sm font-medium text-foreground">{item.company}</span>
            <ExperienceBullets
              items={item.description}
              tools={item.tools}
              showTools={false}
            />
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
};
