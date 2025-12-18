"use client";

import { useEffect, useState } from "react";

export default function LightBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const updateEnabled = () => {
      setEnabled(document.documentElement.classList.contains("light"));
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
      <div className="sun-bubble bubble-1" />
      <div className="sun-bubble bubble-2" />
      <div className="sun-bubble bubble-3" />
    </div>
  );
}
