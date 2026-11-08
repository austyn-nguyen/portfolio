import Image from "next/image";
import { MapPin } from "lucide-react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  location: string;
  affiliations?: {
    name: string;
    detail: string;
    logo?: string;
    logoTone?: "dark";
    initials?: string;
  }[];
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
              {!!event.affiliations?.length && <ul className="music-history-affiliations" aria-label="Schools and musical communities">{event.affiliations.map((affiliation) => (
                <li className="music-history-affiliation" key={affiliation.name}>
                  <span className={`music-affiliation-mark${affiliation.logo ? "" : " music-affiliation-monogram"}${affiliation.logoTone === "dark" ? " music-affiliation-mark-dark" : ""}`} aria-hidden="true">
                    {affiliation.logo ? <Image src={affiliation.logo} alt="" width={52} height={52} sizes="52px" quality={95} /> : affiliation.initials}
                  </span>
                  <div className="music-affiliation-copy"><p>{affiliation.name}</p><span>{affiliation.detail}</span></div>
                </li>
              ))}</ul>}
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
