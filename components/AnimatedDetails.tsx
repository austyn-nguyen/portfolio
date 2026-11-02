"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Native summary keyboard behavior with interruptible opening and closing motion. */
export default function AnimatedDetails({ summary, children, className }: {
  summary: ReactNode;
  children: ReactNode;
  className: string;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const expanded = useRef(false);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finishImmediately = () => {
      if (!motion.matches || !animation.current) return;
      animation.current.cancel();
      animation.current = null;
      if (details.current) details.current.open = expanded.current;
      if (content.current) content.current.style.overflow = "";
    };
    motion.addEventListener("change", finishImmediately);
    return () => { animation.current?.cancel(); motion.removeEventListener("change", finishImmediately); };
  }, []);

  const toggle = () => {
    const element = details.current;
    const body = content.current;
    if (!element || !body) return;
    const opening = !expanded.current;
    expanded.current = opening;
    const height = element.open ? body.getBoundingClientRect().height : 0;
    const opacity = element.open ? getComputedStyle(body).opacity : "0";
    animation.current?.cancel();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !body.animate) {
      element.open = opening;
      body.style.overflow = "";
      return;
    }
    // Keep the native details open until its closing animation finishes.
    element.open = true;
    body.style.overflow = "hidden";
    const targetHeight = opening ? body.scrollHeight : 0;
    const next = body.animate([
      { height: `${height}px`, opacity },
      { height: `${targetHeight}px`, opacity: opening ? 1 : 0 },
    ], { duration: 220, easing: "cubic-bezier(.2,.7,.2,1)" });
    animation.current = next;
    next.onfinish = () => {
      element.open = opening;
      body.style.overflow = "";
      animation.current = null;
    };
  };

  return (
    <details ref={details} className={className} onToggle={(event) => {
      if (!animation.current) expanded.current = event.currentTarget.open;
    }}>
      <summary onClick={(event) => { event.preventDefault(); toggle(); }}>{summary}</summary>
      <div ref={content} className="details-reveal">{children}</div>
    </details>
  );
}
