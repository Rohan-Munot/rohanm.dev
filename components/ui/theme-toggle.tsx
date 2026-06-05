"use client";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = async () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";

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
  };

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
    <Button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="items-start rounded-md p-1 hover:bg-muted hover:border-secondary-foreground/30 border border-transparent transition-all ease-in-out [&_svg]:size-4.5 [&_svg]:text-foreground"
    >
      {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
