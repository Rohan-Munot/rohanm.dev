import { Popover } from "@base-ui/react/popover";
import { XIcon } from "@phosphor-icons/react/ssr";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { ExperienceItem } from "@/lib/types";
import ExperienceBullets from "./experience-bullets";

const ExperiencePopover = ({
  item,
  children,
}: {
  item: ExperienceItem;
  children: React.ReactElement;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger
        nativeButton={false}
        delay={0}
        openOnHover
        render={children}
      />
      <AnimatePresence>
        {open && (
          <Popover.Portal>
            <Popover.Positioner
              side="top"
              align="end"
              sideOffset={-5}
              alignOffset={0}
            >
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.95)" }}
                animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
                exit={{ opacity: 0, filter: "blur(4px)", transform: "scale(0.95)" }}
                transition={{
                  duration: 0.15,
                  ease: [0.23, 1, 0.32, 1],
                }}
                style={{ transformOrigin: "var(--transform-origin)" }}
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
              </motion.div>
            </Popover.Positioner>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
};

export default ExperiencePopover;