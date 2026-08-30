"use client";

import { useEffect, useState } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

/**
 * The two themes are the two diazo print processes, so the control names them
 * rather than saying "light" and "dark".
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    setReady(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // storage unavailable, the choice just does not persist
    }
  }

  const label = dark ? "Blueprint" : "Whiteprint";

  return (
    <Tooltip>
      <TooltipTrigger
        onClick={toggle}
        className="annotation cursor-pointer border border-line-soft px-2.5 py-1.5 transition-colors hover:border-line hover:text-foreground"
        aria-label={`Switch to ${dark ? "whiteprint" : "blueprint"} print`}
      >
        <span suppressHydrationWarning>{ready ? label : "Blueprint"}</span>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {dark
          ? "Diazo negative. Switch to the positive print."
          : "Diazo positive. Switch to the negative print."}
      </TooltipContent>
    </Tooltip>
  );
}
