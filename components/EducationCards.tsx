import Image from "next/image";
import AnimatedDetails from "./AnimatedDetails";
import { Plus, Globe2 } from "lucide-react";
import type { EducationEntry } from "@/src/data/education";

export default function EducationCard({ edu }: { edu: EducationEntry }) {
  const degrees = edu.degrees ?? [{ degree: edu.degree ?? "", years: edu.years }];
  return (
    <article className="education-entry">
      <span className="education-pin" aria-hidden="true" />
      <header className="education-school">
        <span className="education-school-mark" aria-hidden="true"><Image src={edu.logo} alt="" width={56} height={56} /></span>
        <div><h3>{edu.school}</h3><p>{edu.location} · {edu.years}</p></div>
      </header>
      <ul className="education-degrees">{degrees.map((degree) => <li key={degree.degree}><h4>{degree.degree}</h4><p>{degree.years}</p>{degree.description && <span className="education-incoming">{degree.description}</span>}</li>)}</ul>
      {edu.description && <p>{edu.description}</p>}
      {edu.studyAbroad && <aside className="education-abroad" aria-label={`${edu.studyAbroad.program} at ${edu.studyAbroad.university}`}>
        <span className="education-slip-clip" aria-hidden="true" />
        <div className="education-stamp-heading"><p className="education-abroad-label">{edu.studyAbroad.program}</p><span className="education-postmark" aria-hidden="true">{edu.studyAbroad.logo ? <Image src={edu.studyAbroad.logo} alt="" width={36} height={36} /> : <Globe2 size={28} />}</span></div>
        <h4>{edu.studyAbroad.university}</h4>
        <p className="education-postcard-location"><Globe2 size={14} aria-hidden="true" />{edu.studyAbroad.location}</p>
        <p className="education-postcard-date">{edu.studyAbroad.years}</p>
      </aside>}
      <AnimatedDetails className="education-details" summary={<>Honors &amp; activities <Plus size={17} aria-hidden="true" /><span className="sr-only"> at {edu.school}</span></>}><div className="education-detail-content">
        {!!edu.honors?.length && <div><h4>Honors</h4><ul>{edu.honors.map((honor) => <li key={honor}>{honor}</li>)}</ul></div>}
        {!!edu.clubs?.length && <div><h4>Activities</h4><ul className="education-communities">{edu.clubs.map((club) => <li key={club.name}><strong>{club.name}</strong><span>{club.role}</span></li>)}</ul></div>}
      </div></AnimatedDetails>
    </article>
  );
}
