"use client";

import { useEffect, useState } from "react";

export default function ScrollRestoration() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleBeforeUnload = () => {
      const sections = ["hero", "about", "skills"];
      let currentSection = "hero";
      let minDistance = Infinity;

      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = id;
          }
        }
      });

      sessionStorage.setItem("currentSection", currentSection);
    };

    const handleLoad = () => {
      const currentSection = sessionStorage.getItem("currentSection");
      if (currentSection) {
        setTimeout(() => {
          const element = document.getElementById(currentSection);
          if (element) {
            element.scrollIntoView({ behavior: "auto" });
          }
          sessionStorage.removeItem("currentSection");
          setIsLoading(false);
        }, 50); // Reduced delay
      } else {
        setIsLoading(false);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("load", handleLoad);

    // If page is already loaded, run immediately
    if (document.readyState === "complete") {
      handleLoad();
    }

    // Fallback: hide loading after 1 second
    const fallbackTimer = setTimeout(() => setIsLoading(false), 1000);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("load", handleLoad);
      clearTimeout(fallbackTimer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--accent)] mx-auto mb-4"></div>
          <p className="text-[var(--foreground)]">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}
