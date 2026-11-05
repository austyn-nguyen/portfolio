import EducationCard from "./EducationCards";
import { educationData } from "@/src/data/education";

export default function Education() {
  return (
    <section id="education" className="personal-education">
      <header className="chapter-heading education-heading">
        <h2>Always <span>a student.</span></h2>
        <p>Concurrent graduate study in computer science at Georgia Tech and Industrial &amp; Operations Engineering at Michigan.</p>
      </header>
      <div className="education-spread">{educationData.map((education) => <EducationCard key={education.school} edu={education} />)}</div>
    </section>
  );
}
