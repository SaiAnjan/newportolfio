"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { type MouseEvent, useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = (event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const nextTheme = isDark ? "light" : "dark";

    document.documentElement.style.setProperty("--theme-transition-x", `${x}px`);
    document.documentElement.style.setProperty("--theme-transition-y", `${y}px`);

    if ("startViewTransition" in document) {
      const transitionStarter = document as Document & {
        startViewTransition?: (callback: () => void) => { ready: Promise<void> };
      };

      transitionStarter.startViewTransition?.(() => {
        setTheme(nextTheme);
      });
      return;
    }

    setTheme(nextTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="h-9 w-9 rounded-full"
    >
      {isDark ? <Moon className="h-4 w-4 text-muted-foreground" /> : <Sun className="h-4 w-4 text-muted-foreground" />}
    </Button>
  );
};

export { ThemeSwitcher };
