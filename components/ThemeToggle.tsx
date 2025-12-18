"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    const html = document.documentElement;

    html.classList.remove("light", "dark");

    if (savedTheme) {
      html.classList.add(savedTheme);
      setTheme(savedTheme);
    } else {
      html.classList.add("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    const html = document.documentElement;

    html.classList.remove("light", "dark");
    html.classList.add(newTheme);

    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full p-3 bg-[var(--accent)] text-gray-900 shadow-lg hover:scale-110 transition"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
}
