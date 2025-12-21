"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import Counter from "./Counter";

interface Project {
  title: string;
  bullets: string[];
}

interface Experience {
  company: string;
  role: string;
  location: string;
  date: string;
  description: (string | ReactNode)[];
  projects?: Project[];
  logo: string;
}

const experiences: Experience[] = [
  {
    company: "Capital One",
    role: "Product Management Intern",
    location: "McLean, VA",
    date: "June 2026 - Aug 2026",
    description: [
      "Selected for a highly competitive PM internship to drive product strategy for FinTech solutions serving millions of customers.",
      "Will collaborate with engineering and design teams to define product requirements, manage backlogs, and deliver customer-centric features using Agile methodologies.",
    ],
    logo: "/experiences/c1.jpeg",
  },
  {
    company: "ElectricFish",
    role: "Energy Market Analyst Intern",
    location: "Detroit, MI",
    date: "Aug 2025 – Dec 2025",
    description: [
      <span>
        Analyzed <Counter value={5} /> years of ERCOT/CAISO market data to
        isolate <Counter value={7} suffix="+" /> key cost drivers, informing
        strategic procurement and reducing energy risk exposure.
      </span>,
      "Modelled temporal and locational energy loss patterns to optimize battery deployment strategies in high-congestion markets.",
    ],
    projects: [
      {
        title: "Agile Operations & Leadership",
        bullets: [
          "Orchestrated 1-week team sprints and managed Jira dashboards to ensure transparent task tracking and 100% adherence to project timelines.",
          "Directed task delegation and facilitated sprint planning and retrospectives to optimize team velocity and iterative workflow efficiency.",
          "Collaborated directly with lead mentors to align technical project milestones with company-wide energy market objectives.",
        ],
      },
    ],
    logo: "/experiences/ef.jpeg",
  },
  {
    company: "CHEPS",
    role: "Business Operations Consultant",
    location: "Ann Arbor, MI",
    date: "Aug 2025 – Present",
    description: [
      "Spearheading cross-functional operational improvements for the Enhancing Cancer Center Operations (ECCO) team to improve patient throughput.",
    ],
    projects: [
      {
        title: "Product Strategy & Systems Design",
        bullets: [
          "Developed complex flowcharts to map clinical patient journeys, identifying critical friction points in the referral lifecycle.",
          "Engineered an interactive restructured org-chart proposal using code-based visualization to improve communication velocity across departments.",
          "Leveraged Excel PivotTables and advanced data modeling to synthesize breast cancer referral datasets into actionable operational insights.",
          "Designed a phone tag intervention strategy, utilizing data-driven spreadsheets to quantify and reduce patient outreach delays.",
        ],
      },
    ],
    logo: "/experiences/cheps.png",
  },
  {
    company: "The Chemours Company",
    role: "Business Intelligence Intern",
    location: "Wilmington, DE",
    date: "May 2025 – Aug 2025",
    description: [
      <span>
        Optimized technical performance by reducing dashboard size by{" "}
        <Counter value={25} suffix="%" /> (400MB to &lt;300MB) through SQL-based
        transformations and Power Query migration.
      </span>,
      <span>
        Standardized version control for <Counter value={10} suffix="+" />{" "}
        cross-functional analysts by establishing a Power BI–Git DevOps
        integration and training program.
      </span>,
    ],
    projects: [
      {
        title: "BI Product Development",
        bullets: [
          "Developed SQL-backed Power BI dashboards to provide real-time visibility into S&P global trade data for stakeholders.",
          "Automated equipment MTBF estimation using custom DAX formulas to enable proactive reliability engineering.",
          "Conducted user acceptance testing (UAT) and iterative improvements to ensure intuitive user experience and reliable performance.",
        ],
      },
    ],
    logo: "/experiences/chemours.jpg",
  },
  {
    company: "Michigan Medicine: Watson Lab",
    role: "Data Engineer",
    location: "Ann Arbor, MI",
    date: "Jan 2025 – May 2025",
    description: [
      <span>
        Engineered automated shell scripts to categorize and index{" "}
        <Counter value={4} suffix="TB" /> of neuro recordings, increasing data
        retrieval speed for researchers.
      </span>,
      <span>
        Developed MatLab scripts via Spike2 API to parse{" "}
        <Counter value={2} suffix="TB" /> of spike data to correlate
        physiological numbers with specific events.
      </span>,
    ],
    logo: "/experiences/mm.jpeg",
  },
  {
    company: "NIST",
    role: "Software Engineer Intern",
    location: "Gaithersburg, MD",
    date: "May 2024 – Aug 2024",
    description: [
      <span>
        Architected a scalable workflow automation solution to process{" "}
        <Counter value={500} suffix="+ GB" /> of simulation data, significantly
        reducing manual processing time.
      </span>,
      "Translated complex technical workflows into actionable product roadmaps for interdisciplinary stakeholders and researchers.",
      "Partnered with open-source developers to establish standardized methodologies and improve documentation for the research community.",
    ],
    logo: "/experiences/nist.png",
  },
  {
    company: "UMBC",
    role: "HCI Researcher",
    location: "Baltimore, MD",
    date: "June 2023 – Aug 2024",
    description: [
      <span>
        Synthesized insights from <Counter value={1300} suffix="+" /> research
        papers to identify product-market fit for patient-facing AI tools in
        healthcare.
      </span>,
      "Co-authored a PRISMA-standard systematic review on AI and haptic therapy to guide future medical-tech product development.",
    ],
    logo: "/experiences/umbc.png",
  },
  {
    company: "Wegmans Food Markets",
    role: "Front-End Associate",
    location: "Columbia, MD",
    date: "April 2023 – April 2024",
    description: [
      "Optimized front-end operational efficiency by managing high-volume transactions and inventory restocking during peak retail hours.",
      "Maintained real-time inventory oversight and restocking protocols to ensure product availability and department organization.",
    ],
    logo: "/experiences/weggies.jpeg",
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="py-24 px-8 max-w-6xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-6xl font-bold text-center mb-20 tracking-tight"
      >
        Technical <span className="text-[var(--accent)]">Experience</span>
      </motion.h2>

      <div className="flex flex-col gap-20">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8"
          >
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl group-hover:rotate-3 transition-transform flex-shrink-0">
              <Image
                src={exp.logo}
                alt={`${exp.company} logo`}
                fill
                className="object-cover"
              />
            </div>

            <div className="border-l-2 border-[var(--accent)]/10 pl-8 relative">
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]" />

              <div className="flex flex-col md:flex-row md:justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-extrabold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                    {exp.role}
                  </h3>
                  <p className="text-xl font-semibold opacity-90">
                    {exp.company}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 md:text-right">
                  <p className="font-mono text-sm uppercase tracking-widest">
                    {exp.date}
                  </p>
                  <p className="text-sm italic text-[var(--muted)]">
                    {exp.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {exp.description.map((bullet, i) => (
                  <li
                    key={i}
                    className="text-[var(--foreground)]/80 leading-relaxed relative before:content-['▹'] before:absolute before:-left-6 before:text-[var(--accent)]"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {exp.projects && (
                <div className="grid grid-cols-1 gap-4">
                  {exp.projects.map((proj, i) => (
                    <div
                      key={i}
                      className="bg-[var(--foreground)]/5 p-6 rounded-2xl border border-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all"
                    >
                      <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                        {proj.title}
                      </h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm text-[var(--muted)]">
                        {proj.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]/40 flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
