"use client";

import { useEffect, useState } from "react";

export default function SpaceBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateEnabled = () => {
      setEnabled(document.documentElement.classList.contains("dark"));
    };

    updateEnabled();

    const observer = new MutationObserver(updateEnabled);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Star field */}
      <div className="absolute inset-0 stars" />

      {/* Shooting star */}
      <div className="shooting-star" />

      {/* Rotating glow */}
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] space-glow" />
    </div>
  );
}
