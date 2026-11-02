import Image from "next/image";
import { MapPin } from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  location: string;
  images?: string[];
}

export default function Timeline({ events }: { events: TimelineEvent[] }) {
  return (
    <section id="timeline" className="music-history" aria-labelledby="music-history-title">
      <header className="music-section-heading"><h2 id="music-history-title">My journey</h2><span className="music-staff" aria-hidden="true" /></header>
      <ol className="music-program-notes" role="list">
        {events.map((event) => (
          <li key={`${event.year}-${event.title}`} className="music-history-entry">
            <p className="music-history-year">{event.year}</p>
            <article className="music-history-story">
              <h3>{event.title}</h3><p>{event.description}</p>
              <p className="music-history-location"><MapPin size={14} aria-hidden="true" />{event.location}</p>
              {!!event.images?.length && <div className="music-history-photos">{event.images.map((src) => (
                <div className="music-history-photo" key={src}><Image src={src} alt="" width={180} height={120} sizes="(max-width: 479px) 40vw, 180px" /></div>
              ))}</div>}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
