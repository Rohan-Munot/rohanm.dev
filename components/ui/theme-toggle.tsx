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
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);

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
