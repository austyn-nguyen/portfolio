"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { performances } from "@/src/data/music-performances";

export default function PerformanceShowcase() {
  const player = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = performances[selectedIndex];
  const embedUrl = `https://www.youtube.com/embed/${selected.videoId}?start=${selected.startTime ?? 0}&rel=0`;
  const watchUrl = `https://www.youtube.com/watch?v=${selected.videoId}${selected.startTime ? `&t=${selected.startTime}s` : ""}`;

  const selectPerformance = (index: number, pointerInteraction: boolean) => {
    if (index === selectedIndex) return;
    setSelectedIndex(index);
    if (pointerInteraction && window.matchMedia("(max-width: 767px)").matches) {
      player.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  };

  return (
    <section id="performances" className="music-performances" aria-labelledby="performances-title">
      <header className="music-section-heading"><h2 id="performances-title">Performances</h2><span className="music-staff" aria-hidden="true" /></header>
      <div className="music-program-layout">
        <div ref={player} id="performance-player" className="music-featured-performance">
          <div className="music-video-frame">
            <iframe key={embedUrl} src={embedUrl} title={selected.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
          </div>
          <div className="music-performance-caption" aria-live="polite" aria-atomic="true">
            <h3>{selected.title}</h3><p>{selected.description}</p>
            <a href={watchUrl} target="_blank" rel="noopener noreferrer">Watch on YouTube<ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></a>
          </div>
        </div>
        <div className="music-program">
          <h3>Program</h3>
          <ol className="music-program-list" aria-label="Choose a performance">
            {performances.map((performance, index) => (
              <li key={`${performance.videoId}-${performance.startTime ?? 0}`}>
                <button type="button" aria-pressed={selectedIndex === index} aria-controls="performance-player" onClick={(event) => selectPerformance(index, event.detail > 0)}>
                  <span className="music-program-indicator" aria-hidden="true"><Play size={16} fill={selectedIndex === index ? "currentColor" : "none"} /></span>
                  <span className="music-program-text"><span className="music-program-title">{performance.title}</span><span className="music-program-note">{performance.programNote}</span></span>
                  {selectedIndex === index && <span className="music-program-selected">Selected</span>}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
