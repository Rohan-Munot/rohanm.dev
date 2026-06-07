"use client";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/ssr";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/button";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

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

    const button = buttonRef.current;
    const rect = button?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : window.innerHeight / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );

    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    await transition.ready;

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        fill: "forwards",
        pseudoElement: "::view-transition-new(root)",
      },
    );
  }, [resolvedTheme, setTheme]); // ← this was missing

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
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="items-start rounded-md p-1 hover:bg-muted hover:border-secondary-foreground/30 border border-transparent transition ease-in-out [&_svg]:size-4.5 [&_svg]:text-foreground active:scale-90"
    >
      <span className="relative inline-flex size-4.5 items-center justify-center">
        {resolvedTheme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </Button>
  );
};

export default ThemeToggle;
