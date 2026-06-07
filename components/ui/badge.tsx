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
          "px-2 py-0.5 text-xs rounded-sm bg-muted text-foreground/80 relative border border-border/50",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-sm)-0.5px)]",
          "before:shadow-[0_-1px_0_0_var(--badge-inner-shadow)]",
          className,
        ),
      },
      props,
    ),
  });

  return element;
};

export default Badge;
export type { BadgeProps };
