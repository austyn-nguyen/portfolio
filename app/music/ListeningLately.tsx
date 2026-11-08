"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Headphones, Music2, Play, RotateCw } from "lucide-react";
import type { ListeningData } from "@/src/types/spotify";

export default function ListeningLately() {
  const [data, setData] = useState<ListeningData | null>(null);
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const player = useRef<HTMLDivElement>(null);
  const selected = data?.tracks.find((track) => track.id === selectedId) ?? data?.tracks[0];

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/spotify/top-tracks", { signal: controller.signal });
        const result: ListeningData = await response.json();
        if (!response.ok && result.status !== "unavailable") throw new Error("Listening data unavailable");
        if (active) setData(result);
      } catch {
        if (active) setData((previous) => previous?.tracks.length ? previous : { status: "unavailable", tracks: [], profileUrl: previous?.profileUrl ?? null });
      } finally {
        clearTimeout(timeout);
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [attempt]);

  return (
    <section id="listening" className="music-listening" aria-labelledby="listening-title">
      <header className="music-section-heading">
        <h2 id="listening-title">What I’m listening to lately</h2>
        <span className="music-staff" aria-hidden="true" />
      </header>
      <div className="music-listening-layout">
        <div className="music-listening-aside">
          <p className="music-listening-eyebrow"><Headphones size={17} aria-hidden="true" />Off the music stand</p>
          <p className="music-listening-description">A little of what’s been keeping me company, beyond the viola.</p>
          <p className="music-listening-period">Top tracks · Past four weeks</p>
          <div className="music-spotify-attribution">
            <Image className="music-spotify-logo music-spotify-logo-light" src="/images/music/spotify-logo-black.svg" alt="Spotify" width={96} height={29} />
            <Image className="music-spotify-logo music-spotify-logo-dark" src="/images/music/spotify-logo-white.svg" alt="Spotify" width={96} height={29} />
            {data?.profileUrl && <a href={data.profileUrl} target="_blank" rel="noopener noreferrer">My profile<ArrowUpRight className="link-arrow" size={16} aria-hidden="true" /></a>}
          </div>
          {selected && <div ref={player} id="listening-player" className="music-spotify-player">
            <p aria-live="polite" aria-atomic="true">Selected: {selected.name} — {selected.artists}</p>
            <iframe key={selected.id} src={`https://open.spotify.com/embed/track/${selected.id}`} title={`Spotify player: ${selected.name} by ${selected.artists}`} width="100%" height="152" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" referrerPolicy="strict-origin-when-cross-origin" />
            <a href={selected.url} target="_blank" rel="noopener noreferrer">Open selected track in Spotify<ArrowUpRight className="link-arrow" size={15} aria-hidden="true" /></a>
          </div>}
        </div>
        <div className="music-listening-content" aria-busy={loading}>
          {loading && !data && <div className="music-listening-placeholder" role="status"><Headphones size={28} aria-hidden="true" /><p>Finding my current rotation…</p></div>}
          {!!data?.tracks.length && <ol className="music-track-list" aria-label="My top tracks from the past four weeks">
            {data.tracks.map((track, index) => <li key={track.id}>
              <button type="button" className="music-track-select" aria-pressed={selected?.id === track.id} aria-controls="listening-player" onClick={(event) => {
                setSelectedId(track.id);
                if (event.detail > 0 && window.matchMedia("(max-width: 767px)").matches) {
                  player.current?.scrollIntoView({ block: "start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
                }
              }} aria-label={`Select ${track.name} by ${track.artists} in the Spotify player`}>
                <span className="music-track-rank" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="music-track-artwork">{track.artwork ? <Image src={track.artwork} alt="" width={64} height={64} unoptimized /> : <Music2 size={24} aria-hidden="true" />}</span>
                <span className="music-track-copy"><span className="music-track-name">{track.name}{track.explicit && <span className="music-track-explicit" aria-label="Explicit">E</span>}</span><span className="music-track-artist">{track.artists}</span></span>
                <Play className="music-track-play" size={16} fill={selected?.id === track.id ? "currentColor" : "none"} aria-hidden="true" />
              </button>
              <a className="music-track-link" href={track.url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${track.name} by ${track.artists} in Spotify`}><ArrowUpRight className="link-arrow" size={18} aria-hidden="true" /></a>
            </li>)}
          </ol>}
          {data && !data.tracks.length && <div className="music-listening-placeholder" role="status">
            <Headphones size={28} aria-hidden="true" />
            <p>{data.status === "pending" ? "My listening rotation is on its way." : data.status === "empty" ? "A new rotation is in the making." : "My listening rotation is taking a short break."}</p>
            <span>{data.status === "empty" ? "Check back soon for more music." : data.status === "pending" ? "Check back soon for the songs on repeat." : "You can try loading the tracks again in a moment."}</span>
            {data.status === "unavailable" && <button type="button" disabled={loading} onClick={() => { setLoading(true); setAttempt((value) => value + 1); }}><RotateCw size={15} aria-hidden="true" />{loading ? "Loading…" : "Try again"}</button>}
          </div>}
          {!!data?.tracks.length && <p className="music-listening-footnote">From my Spotify listening, refreshed throughout the day. Choose a track to load it in the player.</p>}
        </div>
      </div>
    </section>
  );
}
