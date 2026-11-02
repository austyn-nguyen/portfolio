import EducationCard from "./EducationCards";
import { educationData } from "@/src/data/education";

export default function Education() {
  return (
    <section id="education" className="personal-education">
      <header className="chapter-heading"><p className="work-eyebrow">04 / Where it started (and what’s next)</p><h2>Always <span>a student.</span></h2><p>From community college to Michigan, with a summer in Seoul along the way.</p></header>
      <div className="education-notebooks">{educationData.map((education, index) => <EducationCard key={education.school} edu={education} index={index} />)}</div>
    </section>
  );
}
