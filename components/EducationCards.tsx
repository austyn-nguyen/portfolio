import Image from "next/image";
import { Plus, Globe2 } from "lucide-react";
import type { EducationEntry } from "@/src/data/education";

export default function EducationCard({ edu, index }: { edu: EducationEntry; index: number }) {
  const degrees = edu.degrees ?? [{ degree: edu.degree ?? "", years: edu.years }];
  return (
    <article className={`education-notebook ${index === 0 ? "education-michigan" : ""}`}>
      <p className="education-tab">{index === 0 ? "The Michigan chapter" : "Where I got my start"}</p>
      <header className="education-school">
        <div className="education-logo">
          <Image
            src={edu.logo}
            alt=""
            width={56}
            height={56}
            style={{ width: 56, height: 56, objectFit: "contain" }}
          />
        </div>
        <div><h3>{edu.school}</h3><p>{edu.location} · {edu.years}</p></div>
      </header>
      <ul className="education-degrees">{degrees.map((degree) => <li key={degree.degree}><h4>{degree.degree}</h4><p>{degree.years}</p>{degree.description && <span className="education-incoming">{degree.description}</span>}</li>)}</ul>
      {edu.description && <p>{edu.description}</p>}
      {edu.studyAbroad && <aside className="education-abroad"><Globe2 size={23} aria-hidden="true" /><div><p className="education-abroad-label">A summer chapter abroad</p><h4>{edu.studyAbroad.university}</h4><p>{edu.studyAbroad.program} · {edu.studyAbroad.location}<br />{edu.studyAbroad.years}</p></div></aside>}
      <details className="education-details"><summary>Beyond the classroom <Plus size={17} aria-hidden="true" /><span className="sr-only"> at {edu.school}</span></summary><div className="education-detail-content">
        {!!edu.honors?.length && <div><h4>Little milestones, big meaning</h4><ul>{edu.honors.map((honor) => <li key={honor}>{honor}</li>)}</ul></div>}
        {!!edu.clubs?.length && <div><h4>People &amp; communities</h4><ul className="education-communities">{edu.clubs.map((club) => <li key={club.name}><strong>{club.name}</strong><span>{club.role}</span></li>)}</ul></div>}
      </div></details>
    </article>
  );
}
