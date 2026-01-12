"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted on client to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle Theme"
        className="[&_svg]:size-4 items-start cursor-pointer rounded-md p-1 hover:bg-zinc-400/30 transition-colors"
      >
        <div className="size-4" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      className="[&_svg]:size-4 items-start cursor-pointer rounded-md p-1 hover:bg-zinc-400/30 transition-colors"
    >
      {resolvedTheme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
