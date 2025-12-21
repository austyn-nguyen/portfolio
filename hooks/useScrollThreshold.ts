"use client";

import { useState, useEffect } from "react";

export function useScrollThreshold(threshold: number = 300) {
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolledPast;
}
