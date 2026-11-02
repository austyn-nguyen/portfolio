import Image from "next/image";
import { ArrowDownToLine, MapPin, Plus } from "lucide-react";
import { experiences } from "@/src/data/experiences";

export default function Experiences() {
  return (
    <section id="experiences" className="personal-experience">
      <header className="experience-heading">
        <div><p className="work-eyebrow">03 / Learning by doing</p><h2>A few stops <span>along the way.</span></h2></div>
        <div className="experience-heading-note"><p>Banking, healthcare, energy, research.<br />Different teams. Plenty to be curious about.</p><a href="/Austyn_Nguyen_Resume.pdf" download>My résumé <ArrowDownToLine size={16} aria-hidden="true" /></a></div>
      </header>

      <ol className="experience-trail">
        {experiences.map((experience, index) => (
          <li key={experience.company} className="experience-stop">
            <div className="experience-marker" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div>
            <article className="experience-entry">
              <header className="experience-company">
                <div className="experience-logo"><Image src={experience.logo} alt="" fill sizes="56px" /></div>
                <div><h3>{experience.company}</h3><p><MapPin size={13} aria-hidden="true" />{experience.location}</p></div>
                {index === 0 && <span className="experience-latest">Most recent chapter</span>}
              </header>
              <div className="experience-roles">{experience.roles.map((role) => (
                <div key={role.title} className="experience-role">
                  <div className="experience-role-heading"><h4>{role.title}</h4><p>{role.date}</p></div>
                  <p className="experience-highlight">{role.highlight}</p>
                  <details className="experience-details">
                    <summary><span>A closer look<span className="sr-only"> at {role.title} at {experience.company}</span></span><Plus size={17} aria-hidden="true" /></summary>
                    <div className="experience-detail-body">
                      <ul className="experience-description">{role.description.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                      {role.projects?.map((project) => <div key={project.title} className="experience-project"><h5>{project.title}</h5><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>)}
                      {experience.company === "Capital One" && <a className="experience-project-link" href="#projects">See the account verification project ↗</a>}
                    </div>
                  </details>
                </div>
              ))}</div>
            </article>
          </li>
        ))}
      </ol>
      <p className="experience-postscript"><span aria-hidden="true">✳</span> Still learning. Still asking questions. Still building.</p>
    </section>
  );
}
