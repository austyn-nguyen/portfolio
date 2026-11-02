import EducationCard from "./EducationCards";
import { educationData } from "@/src/data/education";

export default function Education() {
  return (
    <section id="education" className="personal-education">
      <header className="chapter-heading"><h2>Always <span>a student.</span></h2></header>
      <div className="education-spread">{educationData.map((education) => <EducationCard key={education.school} edu={education} />)}</div>
    </section>
  );
}
