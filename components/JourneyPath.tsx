"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

/** Keep the decorative route attached to its stops as details expand or text wraps. */
export default function JourneyPath({ children, className = "" }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);
  const revealClip = useRef<SVGRectElement>(null);
  const updateReveal = useRef<() => void>(() => {});
  const clipId = `journey-reveal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [route, setRoute] = useState({ width: 0, height: 0, path: "" });

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    let frame = 0;
    let scrollFrame = 0;
    let revealed = 0;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const markers = Array.from(element.querySelectorAll<HTMLElement>("[data-journey-marker]"));
    const reveal = () => {
      const bounds = element.getBoundingClientRect();
      // Once drawn, keep the route visible when the reader scrolls back up.
      revealed = Math.min(bounds.height, Math.max(revealed, window.innerHeight * .84 - bounds.top, 0));
      revealClip.current?.setAttribute("height", String(motion.matches ? bounds.height : revealed));
    };
    updateReveal.current = reveal;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(reveal);
    };
    const stopObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          stopObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: .15 });
    const applyMotion = () => {
      element.dataset.motionReady = String(!motion.matches);
      if (motion.matches) markers.forEach((marker) => { marker.dataset.visible = "true"; });
      reveal();
    };
    markers.forEach((marker) => stopObserver.observe(marker));
    applyMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    motion.addEventListener("change", applyMotion);
    const measure = () => {
      const bounds = element.getBoundingClientRect();
      const stops = Array.from(element.querySelectorAll<HTMLElement>("[data-journey-marker]")).map((marker) => {
        const rect = marker.getBoundingClientRect();
        return { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 };
      });
      if (!stops.length || !bounds.width) return;
      let path = `M ${stops[0].x} 0 L ${stops[0].x} ${stops[0].y}`;
      stops.slice(1).forEach((stop, index) => {
        const previous = stops[index];
        const bend = (stop.y - previous.y) / 2;
        path += ` C ${previous.x} ${previous.y + bend}, ${stop.x} ${stop.y - bend}, ${stop.x} ${stop.y}`;
      });
      const last = stops[stops.length - 1];
      path += ` L ${last.x} ${bounds.height - 4}`;
      setRoute((previous) => previous.width === bounds.width && previous.height === bounds.height && previous.path === path
        ? previous : { width: bounds.width, height: bounds.height, path });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(element);
    element.querySelectorAll("[data-journey-stop], [data-journey-marker]").forEach((stop) => observer.observe(stop));
    schedule();
    return () => {
      observer.disconnect();
      stopObserver.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", onScroll);
      motion.removeEventListener("change", applyMotion);
      delete element.dataset.motionReady;
      updateReveal.current = () => {};
    };
  }, []);

  useEffect(() => { updateReveal.current(); }, [route]);

  return (
    <div ref={root} className={`journey ${className}`}>
      {route.width > 0 && <svg className="journey-route" width={route.width} height={route.height} viewBox={`0 0 ${route.width} ${route.height}`} aria-hidden="true" focusable="false">
        <defs><clipPath id={clipId}><rect ref={revealClip} x="0" y="0" width={route.width} height={0} /></clipPath></defs>
        <path d={route.path} clipPath={`url(#${clipId})`} />
      </svg>}
      {children}
    </div>
  );
}
