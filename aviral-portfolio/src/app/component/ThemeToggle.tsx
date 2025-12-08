"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | "neon">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | "neon" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initial = saved || (prefersDark ? "dark" : "light");
    applyTheme(initial);
  }, []);

  const applyTheme = (next: "light" | "dark" | "neon") => {
    setTheme(next);
    localStorage.setItem("theme", next);

    document.documentElement.classList.remove("light", "dark", "neon");
    document.documentElement.classList.add(next);
  };

  const cycleTheme = () => {
    const order = ["light", "dark", "neon"] as const;
    const next = order[(order.indexOf(theme) + 1) % order.length];
    applyTheme(next);
  };

  return (
    <button
      onClick={cycleTheme}
      style={{
        padding: "8px 14px",
        borderRadius: "12px",
        border: "1px solid var(--accent)",
        background: "var(--card)",
        cursor: "pointer",
      }}
    >
      Theme: {theme}
    </button>
  );
}
