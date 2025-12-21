"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
  motion,
} from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  suffix?: string;
}

export default function Counter({
  value,
  direction = "up",
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });
  const isInView = useInView(ref, { margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  const displayValue = useTransform(springValue, (latest) =>
    Math.round(latest).toLocaleString()
  );

  return (
    <span ref={ref} className="font-bold text-[var(--accent)]">
      <motion.span>{displayValue}</motion.span>
      {suffix}
    </span>
  );
}
