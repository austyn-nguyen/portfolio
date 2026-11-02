import Image from "next/image";
import JourneyPath from "./JourneyPath";
import AnimatedDetails from "./AnimatedDetails";
import { ArrowDownToLine, MapPin, Plus } from "lucide-react";
import { experiences } from "@/src/data/experiences";

export default function Experiences() {
  return (
    <section id="experiences" className="personal-experience">
      <header className="experience-heading">
        <div><h2>A few stops <span>along the way.</span></h2></div>
        <div className="experience-heading-note"><a href="/Austyn_Nguyen_Resume.pdf" download>My résumé <ArrowDownToLine className="download-icon" size={16} aria-hidden="true" /></a></div>
      </header>

      <JourneyPath className="career-journey">
      <ol className="journey-stops" role="list">
        {experiences.map((experience) => (
          <li key={experience.company} className="journey-stop" data-journey-stop>
            <div className="journey-marker" data-journey-marker><Image src={experience.logo} alt="" width={56} height={56} /></div>
            <article className="experience-entry journey-copy">
              <header className="experience-company">
                <div><h3>{experience.company}</h3><p><MapPin size={13} aria-hidden="true" />{experience.location}</p></div>
              </header>
              <div className="experience-roles">{experience.roles.map((role) => (
                <div key={role.title} className="experience-role">
                  <div className="experience-role-heading"><h4>{role.title}</h4><p>{role.date}</p></div>
                  <p className="experience-highlight">{role.highlight}</p>
                  <AnimatedDetails className="experience-details" summary={<><span>Details<span className="sr-only"> for {role.title} at {experience.company}</span></span><Plus size={17} aria-hidden="true" /></>}>
                    <div className="experience-detail-body">
                      <ul className="experience-description">{role.description.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
                      {role.projects?.map((project) => <div key={project.title} className="experience-project"><h5>{project.title}</h5><ul>{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>)}
                      {experience.company === "Capital One" && <a className="experience-project-link" href="#projects">See the account verification project ↗</a>}
                    </div>
                  </AnimatedDetails>
                </div>
              ))}</div>
            </article>
          </li>
        ))}
      </ol>
      </JourneyPath>
    </section>
  );
}
