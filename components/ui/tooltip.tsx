"use client";

import * as React from "react";
import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------- */
/*                                   Provider                                 */
/* -------------------------------------------------------------------------- */

export const TooltipProvider = BaseTooltip.Provider;

/* -------------------------------------------------------------------------- */
/*                                    Root                                    */
/* -------------------------------------------------------------------------- */

export type TooltipProps = BaseTooltip.Root.Props;

export function TooltipRoot(props: TooltipProps) {
  return <BaseTooltip.Root {...props} />;
}
// Alias for convenience
export { TooltipRoot as Tooltip };

/* -------------------------------------------------------------------------- */
/*                                  Trigger                                   */
/* -------------------------------------------------------------------------- */

export type TooltipTriggerProps = BaseTooltip.Trigger.Props;

export function TooltipTrigger({
  delay = 0,
  ...props
}: TooltipTriggerProps) {
  return <BaseTooltip.Trigger delay={delay} {...props} />;
}

/* -------------------------------------------------------------------------- */
/*                                    Popup                                   */
/* -------------------------------------------------------------------------- */

export interface TooltipPopupProps {
  children?: React.ReactNode;
  className?: string;
  side?: BaseTooltip.Positioner.Props["side"];
  align?: BaseTooltip.Positioner.Props["align"];
  sideOffset?: number;
  portalProps?: BaseTooltip.Portal.Props;
  arrow?: boolean;
  arrowClassName?: string;
}

export function TooltipPopup({
  children,
  className,
  side = "top",
  align = "center",
  sideOffset = 6,
  portalProps,
  arrow = true,
  arrowClassName,
}: TooltipPopupProps) {
  return (
    <BaseTooltip.Portal {...portalProps}>
      <BaseTooltip.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <BaseTooltip.Popup
          className={cn(
            "relative z-50 flex flex-col gap-1",
            "rounded-md border border-border bg-popover px-2 py-1",
            "text-sm text-popover-foreground",
            "origin-[var(--transform-origin)]",
            "shadow-lg",
            "transition-[transform,opacity] duration-150 ease-out",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "data-[instant]:transition-none",
            className,
          )}
        >
          {arrow && (
            <BaseTooltip.Arrow
              className={cn(
                "relative block h-1.5 w-3 overflow-clip",
                "data-[side=bottom]:top-[-6px]",
                "data-[side=left]:right-[-9px] data-[side=left]:rotate-90",
                "data-[side=right]:left-[-9px] data-[side=right]:-rotate-90",
                "data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180",
                "before:absolute before:bottom-0 before:left-1/2",
                "before:h-[calc(6px*1.4142)] before:w-[calc(6px*1.4142)]",
                "before:-translate-x-1/2 before:translate-y-1/2 before:rotate-45",
                "before:border before:border-border before:bg-popover",
                "before:content-['']",
                arrowClassName,
              )}
            />
          )}
          {children}
        </BaseTooltip.Popup>
      </BaseTooltip.Positioner>
    </BaseTooltip.Portal>
  );
}

// Alias for convenience
export { TooltipPopup as TooltipContent };

/* -------------------------------------------------------------------------- */
/*                               Advanced parts                               */
/* -------------------------------------------------------------------------- */

export const TooltipPortal = BaseTooltip.Portal;
export const TooltipPositioner = BaseTooltip.Positioner;
export const TooltipArrow = BaseTooltip.Arrow;
export const TooltipViewport = BaseTooltip.Viewport;

/* -------------------------------------------------------------------------- */
/*                                 createHandle                               */
/* -------------------------------------------------------------------------- */

export const TooltipCreateHandle = BaseTooltip.createHandle;
