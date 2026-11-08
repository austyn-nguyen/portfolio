"use client";

import { Moon, Sun } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
function getTheme() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}
function getServerTheme() { return "light"; }

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  const switching = useRef(false);
  const toggleTheme = async () => {
    // One capture at a time: repeated clicks must not queue competing snapshots.
    if (switching.current) return;
    const currentTheme = getTheme();
    const nextTheme = currentTheme === "light" ? "dark" : "light";
    const root = document.documentElement;
    const applyTheme = () => {
      if (!root.classList.replace(currentTheme, nextTheme)) root.classList.add(nextTheme);
      try { localStorage.setItem("theme", nextTheme); } catch { /* Theme still works when storage is unavailable. */ }
    };

    switching.current = true;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const instant = reduceMotion || document.hidden;
    try {
      if (document.startViewTransition && !instant) {
        // Capture complete, stable themes instead of animating inherited tokens
        // and component colors independently on every frame.
        root.dataset.themeTransition = "snapshot";
        const transition = document.startViewTransition(applyTheme);
        // `ready` rejects independently of `finished` if the tab becomes hidden.
        // Handle it immediately; `finished` still resolves after the DOM update.
        void transition.ready.catch(() => {});
        await transition.finished;
      } else {
        root.dataset.themeTransition = instant ? "instant" : "fallback";
        applyTheme();
        if (!instant) await new Promise(resolve => window.setTimeout(resolve, 600));
      }
    } catch {
      // A skipped capture (for example, hiding the tab) must still save the theme.
      applyTheme();
    } finally {
      delete root.dataset.themeTransition;
      switching.current = false;
    }
  };

  return (
    <button type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`} className="theme-toggle" data-theme={theme}>
      <Moon className="theme-icon theme-icon-moon" size={20} aria-hidden="true" />
      <Sun className="theme-icon theme-icon-sun" size={20} aria-hidden="true" />
    </button>
  );
}
