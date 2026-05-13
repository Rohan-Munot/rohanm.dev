"use client";

import { cn } from "@/lib/utils";
import { useRender } from "@base-ui/react/use-render";
import { mergeProps } from "@base-ui/react/merge-props";

type BadgeProps = useRender.ComponentProps<"span">;

const Badge = ({ render, className, ...props }: BadgeProps) => {
  const element = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        className: cn(
          "[&_svg]:size-4 sm:[&_svg]:size-3.5 flex gap-2 items-center",
          "px-2 py-0.5 text-xs rounded-sm bg-muted text-muted-foreground relative border border-border/50 shadow-lg",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-sm)-0.5px)]",
          "before:shadow-[0_-1px_0_0_oklch(0.45_0.07_55/0.25)] dark:before:shadow-[0_-1px_0px_0_oklch(0.85_0.04_70/0.25)]",
          className,
        ),
      },
      props,
    ),
  });

  return element;
};

export { Badge };
export type { BadgeProps };
