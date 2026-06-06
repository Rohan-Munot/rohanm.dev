"use client";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/button";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = useCallback(async () => {
    const currentTheme = resolvedTheme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    if (
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme);
      return;
    }

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      { clipPath: ["inset(0 0 100% 0)", "inset(0)"] },
      { duration: 400, pseudoElement: "::view-transition-new(root)" },
    );
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "d" ||
        e.key === "D"
      ) {
        const target = e.target as HTMLElement;
        if (
          target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable
        ) {
          return;
        }
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleTheme]);

  if (!mounted) {
    return (
      <Button
        aria-label="Toggle Theme"
        className="items-start rounded-md p-1 hover:bg-zinc-400/30 [&_svg]:size-4"
      >
        <div className="size-4" />
      </Button>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger
        aria-label="Toggle Theme"
        render={
          <Button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="items-start rounded-md p-1 hover:bg-muted hover:border-secondary-foreground/30 border border-transparent transition-colors ease-in-out [&_svg]:size-4.5 [&_svg]:text-foreground"
          />
        }
      >
        <span className="relative inline-flex size-[18px] items-center justify-center">
          <AnimatePresence mode="wait" initial={false}>
            {resolvedTheme === "dark" ? (
              <motion.span
                key="sun"
                initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute"
              >
                <SunIcon />
              </motion.span>
            ) : (
              <motion.span
                key="moon"
                initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute"
              >
                <MoonIcon />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </TooltipTrigger>
      <TooltipPopup className="bg-foreground text-background p-2 px-3" arrowClassName="before:bg-foreground">
        <div className="flex items-center gap-2">
          <span>
            Toggle Theme
          </span>
          <kbd
            className="relative inline-flex h-5 min-w-[1.25rem] select-none items-center justify-center rounded-sm border border-border/50 bg-foreground px-1 font-mono text-[10px] font-medium text-background"
          >
            <span
              className="absolute inset-0 rounded-[calc(var(--radius-sm)-0.5px)] shadow-[0_-1px_0_0_var(--badge-inner-shadow)] pointer-events-none"
              aria-hidden="true"
            />
            D
          </kbd>
        </div>
      </TooltipPopup>
    </Tooltip>
  );
}
