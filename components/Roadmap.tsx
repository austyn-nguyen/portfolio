import { ArrowUpRight, Check, Cloud, ChartNoAxesCombined, Compass } from "lucide-react";

const current = [
  { title: "Finding my next team", label: "Career", icon: Compass, description: "Full-time product management recruiting for the Fall 2026 cycle.", note: "Looking ahead", href: "#contact", action: "Let’s connect" },
  { title: "A little deeper into the cloud", label: "Learning", icon: Cloud, description: "Working toward the AWS Certified Solutions Architect – Associate certification.", note: "In progress" },
  { title: "Getting to know the markets", label: "Learning", icon: ChartNoAxesCombined, description: "Making my way through Bloomberg Market Concepts.", note: "In progress" },
];
const completed = ["Master’s program application", "Electricity Price Hybrid Forecaster (XGBoost / LightGBM)", "Capital One: NLP Feedback Categorization"];

export default function Roadmap() {
  return (
    <section id="roadmap" className="personal-now">
      <header className="chapter-heading"><p className="work-eyebrow">06 / A little life update</p><h2>What I’m <span>up to.</span></h2><p>A few things on my desk, a few things on the horizon.</p></header>
      <div className="now-notes">{current.map((item) => <article key={item.title} className="now-note"><p className="now-note-label"><item.icon size={18} aria-hidden="true" />{item.label}</p><h3>{item.title}</h3><p>{item.description}</p><div className="now-note-footer"><span>{item.note}</span>{item.href && <a href={item.href}>{item.action}<ArrowUpRight size={15} aria-hidden="true" /></a>}</div></article>)}</div>
      <div className="now-bottom"><details className="now-completed"><summary>A few things checked off <span>{completed.length}</span></summary><ul>{completed.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></details><p className="now-life-note"><span aria-hidden="true">☺</span> Adulthood? Still in the backlog.</p></div>
    </section>
  );
}
