"use client";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle Theme"
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        border: "1px solid #ccc",
        background: "none",
        cursor: "pointer",
      }}
    >
      {theme === "dark" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
