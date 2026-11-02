import DecorativeMark from "./DecorativeMark";
import { ArrowUpRight, Code2, Compass, Database, Monitor } from "lucide-react";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { FaPython, FaGitAlt, FaGithub, FaTools, FaFilePowerpoint, FaFileExcel, FaEnvelope, FaCloud, FaChartBar, FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { SiC, SiCplusplus, SiMongodb, SiPostgresql, SiJira, SiAsana, SiScrumalliance, SiDebian, SiGo, SiAmazon, SiFigma, SiConfluence } from "react-icons/si";
import { DiJava, DiMsqlServer } from "react-icons/di";

const skillVisuals: Record<string, { icon: IconType; color: string }> = {
  "Agile Scrum": { icon: SiScrumalliance, color: "#9664c5" },
  Jira: { icon: SiJira, color: "#4285df" },
  Confluence: { icon: SiConfluence, color: "#528bd3" },
  Asana: { icon: SiAsana, color: "#e67676" },
  Figma: { icon: SiFigma, color: "#c46caa" },
  Python: { icon: FaPython, color: "#c69b23" },
  "C++": { icon: SiCplusplus, color: "#4b86ce" },
  C: { icon: SiC, color: "#8295af" },
  Java: { icon: DiJava, color: "#d2644e" },
  Go: { icon: SiGo, color: "#31a6bd" },
  Git: { icon: FaGitAlt, color: "#e47450" },
  GitHub: { icon: FaGithub, color: "var(--foreground)" },
  DevOps: { icon: FaTools, color: "#9381cc" },
  PostgreSQL: { icon: SiPostgresql, color: "#5486b4" },
  "SQL Server": { icon: DiMsqlServer, color: "#d46d70" },
  NoSQL: { icon: SiMongodb, color: "#68a46a" },
  Excel: { icon: FaFileExcel, color: "#55a17c" },
  PowerPoint: { icon: FaFilePowerpoint, color: "#d47c55" },
  "Power BI": { icon: FaChartBar, color: "#c69b23" },
  AWS: { icon: SiAmazon, color: "#d59639" },
  "Microsoft Azure": { icon: FaCloud, color: "#57a4d5" },
  Windows: { icon: FaWindows, color: "#548fe0" },
  macOS: { icon: FaApple, color: "var(--foreground)" },
  "Linux/Unix": { icon: FaLinux, color: "#c69b23" },
  Debian: { icon: SiDebian, color: "#cd6481" },
  Outlook: { icon: FaEnvelope, color: "#548fe0" },
};

const toolkit = [
  { title: "From idea to plan", icon: Compass, tools: ["Agile Scrum", "Jira", "Confluence", "Asana", "Figma"] },
  { title: "From plan to something real", icon: Code2, tools: ["Python", "C++", "C", "Java", "Go", "Git", "GitHub", "DevOps"] },
  { title: "Making sense of the data", icon: Database, tools: ["PostgreSQL", "SQL Server", "NoSQL", "Excel", "PowerPoint", "Power BI"] },
  { title: "The everyday setup", icon: Monitor, tools: ["AWS", "Microsoft Azure", "Windows", "macOS", "Linux/Unix", "Debian", "Outlook"] },
];

export default function Skills() {
  return (
    <section id="skills" className="personal-toolkit">
      <header className="chapter-heading"><h2>A few things <span>in my toolkit.</span></h2></header>
      <div className="toolkit-rows">{toolkit.map((group) => <div key={group.title} className="toolkit-row"><div className="toolkit-label"><group.icon size={23} aria-hidden="true" /><div><h3>{group.title}</h3></div></div><ul>{group.tools.map((tool) => {
        const visual = skillVisuals[tool];
        return <li key={tool} style={{ "--skill-color": visual.color } as CSSProperties}>
          <span className="skill-icon-badge"><visual.icon size={28} aria-hidden="true" /></span>
          <span className="skill-name">{tool}</span>
        </li>;
      })}</ul></div>)}</div>
      <a className="toolkit-credential" href="https://learn.microsoft.com/en-us/users/austynnguyen-2735/credentials/c37b22fdc08bdf5a" target="_blank" rel="noopener noreferrer"><span className="credential-mark" aria-hidden="true"><DecorativeMark /></span><span>Power BI certified</span><span className="credential-action">View credential <ArrowUpRight className="link-arrow" size={17} aria-hidden="true" /></span></a>
    </section>
  );
}
