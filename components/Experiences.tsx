"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import Counter from "./Counter";

interface Project {
  title: string;
  bullets: (string | ReactNode)[];
}

interface Role {
  title: string;
  date: string;
  description: (string | ReactNode)[];
  projects?: Project[];
}

interface Experience {
  company: string;
  location: string;
  logo: string;
  roles: Role[];
}

const experiences: Experience[] = [
  {
    company: "Capital One",
    location: "McLean, VA",
    logo: "/experiences/c1.jpeg",
    roles: [
      {
        title: "Product Management Intern",
        date: "June 2026 – Aug. 2026",
        description: [
          "Authored PRDs and technical specifications for Bank Statement modernization, translating system constraints into sprint-ready requirements and OKRs targeting $10M in projected savings and $175K annual OpEx reduction.",
          "Spearheaded competitive analysis across 6 peer banks (e.g., Wells Fargo, JPMC, Stripe) to design a customer-facing help page for VOD — surfacing UX patterns that shaped go-to-market strategy and feature roadmap prioritization.",
        ],
        projects: [
          {
            title: "Product Strategy & Execution",
            bullets: [
              <span>Defined UI, data-availability, and API requirements with <Counter value={2} /> engineering leads across <Counter value={2} /> sprint teams — leading sprint planning and backlog grooming across the SDLC — launching <Counter value={2} /> self-service products serving <Counter value={20} /> M+ customers.</span>,
              <span>Conducted 7-method customer research (call listening, <Counter value={28} /> customer/associate interviews, competitive analysis across <Counter value={26} /> services) — mapping <Counter value={3} /> customer journeys and <Counter value={4} /> behavioral modes to drive data-driven product decisions.</span>,
              <span>Coordinated associate UAT pilot across <Counter value={125} /> test cases covering navigation, PDF generation, and edge-case account rules — managing launch sequencing across <Counter value={3} /> legacy teams previously handling ~<Counter value={1000} /> manual calls per 6 months.</span>,
            ],
          },
        ],
      },
    ],
  },
  {
    company: "CHEPS",
    location: "Ann Arbor, MI",
    logo: "/experiences/cheps.png",
    roles: [
      {
        title: "Emergency Department Operations Consultant (Team REDC)",
        date: "Jan 2026 – Apr 2026",
        description: [
          "Spearheading data-driven interventions for the Reducing Emergency Department Crowding (REDC) team to mitigate systemic patient boarding.",
          "Investigating imaging delays for post-spinal surgery patients, addressing baseline wait times of 4+ months that drive acute ED surges.",
          "Conducting ethnographic observations of radiology workflows to map communication gaps between physicians and technicians.",
        ],
        projects: [
          {
            title: "Healthcare Operations & Clinical Strategy",
            bullets: [
              <span>Synthesized ED MRI and patient admission datasets using Python to model "day-of" behaviors and identify <Counter value={2} suffix="x" /> throughput bottlenecks.</span>,
              "Analyzed the fiscal and operational impact of 'ED-as-Primary-Access' trends for post-operative surgical complications.",
              "Uncovered a fundamental lack of consensus on the operational definition of 'STAT' orders across multidisciplinary teams.",
              "Architected a proposed communication framework to standardize urgency protocols between Neurosurgery and Radiology.",
            ],
          },
        ],
      },
      {
        title: "Operations Consultant (Team ECCO)",
        date: "Aug 2025 – Dec 2025",
        description: [
          "Spearheading cross-functional operational improvements for the Enhancing Cancer Center Operations (ECCO) team to improve patient throughput.",
        ],
        projects: [
          {
            title: "Product Strategy & Systems Design",
            bullets: [
              "Developed complex flowcharts to map clinical patient journeys, identifying critical friction points in the referral lifecycle.",
              "Engineered an interactive restructured org-chart proposal using code-based visualization to improve communication velocity.",
              "Leveraged Excel PivotTables and advanced data modeling to synthesize breast cancer referral datasets.",
              "Designed a phone tag intervention strategy, utilizing data-driven spreadsheets to quantify and reduce patient outreach delays.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "ElectricFish",
    location: "Detroit, MI",
    logo: "/experiences/ef.jpeg",
    roles: [
      {
        title: "Product Management Intern",
        date: "Aug 2025 – Dec 2025",
        description: [
          "Informing strategic procurement and reducing energy risk exposure through large-scale market analysis.",
          "Modelled temporal and locational energy loss patterns to optimize battery deployment strategies.",
        ],
        projects: [
          {
            title: "Market Intelligence & Agile Ops",
            bullets: [
              <span>Analyzed <Counter value={5} /> years of ERCOT/CAISO market data to isolate <Counter value={7} suffix="+" /> key cost drivers.</span>,
              "Orchestrated 1-week team sprints and managed Jira dashboards to ensure 100% adherence to project timelines.",
              "Directed task delegation and facilitated sprint planning and retrospectives to optimize team velocity.",
              "Collaborated with mentors to align technical project milestones with company-wide energy market objectives.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "The Chemours Company",
    location: "Wilmington, DE",
    logo: "/experiences/chemours.jpg",
    roles: [
      {
        title: "Business Intelligence Intern",
        date: "May 2025 – Aug 2025",
        description: [
          "Modernizing data infrastructure through SQL-based transformations and Power Query migration.",
          "Establishing robust version control and standardized methodologies for cross-functional analyst teams.",
        ],
        projects: [
          {
            title: "BI Product Development",
            bullets: [
              <span>Reduced dashboard size by <Counter value={25} suffix="%" /> (400GB to &lt;300GB) via optimized data modeling.</span>,
              "Developed SQL-backed Power BI dashboards for real-time visibility into S&P global trade data.",
              "Automated equipment MTBF estimation using custom DAX formulas to enable proactive reliability engineering.",
              "Established Power BI–Git DevOps integration for a team of 10+ analysts.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "Michigan Medicine: Watson Lab",
    location: "Ann Arbor, MI",
    logo: "/experiences/mm.jpeg",
    roles: [
      {
        title: "Data Engineer",
        date: "Jan 2025 – May 2025",
        description: [
          "Architecting high-performance data pipelines for large-scale neurological research datasets.",
          "Correlating physiological metrics with clinical events through advanced API integration.",
        ],
        projects: [
          {
            title: "Neuro-Data Engineering",
            bullets: [
              <span>Engineered automated shell scripts to categorize and index <Counter value={4} suffix="TB" /> of neuro recordings.</span>,
              <span>Developed MatLab scripts via Spike2 API to parse <Counter value={2} suffix="TB" /> of spike data.</span>,
              "Increased data retrieval speed and accessibility for primary research investigators through automated indexing.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "NIST",
    location: "Gaithersburg, MD",
    logo: "/experiences/nist.png",
    roles: [
      {
        title: "Software Engineer Intern",
        date: "May 2024 – Aug 2024",
        description: [
          "Building scalable automation solutions for national-level simulation data processing.",
          "Bridging technical development with stakeholder roadmaps to ensure research community adoption.",
        ],
        projects: [
          {
            title: "Workflow Automation & Open Source",
            bullets: [
              <span>Architected a solution to process <Counter value={500} suffix="+ GB" /> of simulation data.</span>,
              "Translated complex technical workflows into actionable product roadmaps for interdisciplinary researchers.",
              "Partnered with open-source developers to establish standardized methodologies and improved documentation.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "UMBC",
    location: "Baltimore, MD",
    logo: "/experiences/umbc.png",
    roles: [
      {
        title: "HCI Researcher",
        date: "June 2023 – Aug 2024",
        description: [
          "Evaluating product-market fit for patient-facing AI tools through comprehensive clinical literature synthesis.",
          "Contributing to medical-tech product development guidelines via systematic reviews.",
        ],
        projects: [
          {
            title: "AI Healthcare Research",
            bullets: [
              <span>Synthesized insights from <Counter value={1300} suffix="+" /> research papers to identify AI tool opportunities.</span>,
              "Co-authored a PRISMA-standard systematic review on AI and haptic therapy.",
              "Mapped user experience requirements for next-generation medical device interfaces.",
            ],
          },
        ],
      },
    ],
  },
  {
    company: "Wegmans Food Markets",
    location: "Columbia, MD",
    logo: "/experiences/weggies.jpeg",
    roles: [
      {
        title: "Front-End Associate",
        date: "April 2023 – April 2024",
        description: [
          "Optimized front-end operational efficiency by managing high-volume transactions during peak retail hours.",
          "Maintained real-time inventory oversight to ensure product availability and department organization.",
        ],
      },
    ],
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

      <div className="flex flex-col gap-24">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group grid grid-cols-1 md:grid-cols-[100px_1fr] gap-8"
          >
            {/* Logo Section */}
            <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-xl group-hover:rotate-3 transition-transform flex-shrink-0">
              <Image src={exp.logo} alt={exp.company} fill className="object-cover" />
            </div>

            {/* Content Section */}
            <div className="relative pl-8">
              {/* Timeline Line: Consistent across all roles */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--accent)]/10 overflow-hidden">
                <motion.div
                  animate={{ y: ["-100%", "200%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent"
                />
              </div>

              {/* Company Header */}
              <div className="mb-10">
                <h3 className="text-3xl font-black tracking-tight text-[var(--accent)]">
                  {exp.company}
                </h3>
                <p className="text-sm italic text-[var(--muted)]">
                  {exp.location}
                </p>
              </div>

              {/* Roles Loop: Handles single or multiple roles (LinkedIn style) */}
              <div className="flex flex-col gap-16">
                {exp.roles.map((role, rIdx) => (
                  <div key={rIdx} className="relative">
                    {/* Circle Indicator: Animated and styled identically */}
                    <div className="absolute left-[-32px] top-2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--accent)] shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)] z-10 -translate-x-1/2" />

                    <div className="flex flex-col md:flex-row md:justify-between mb-6">
                      <h4 className="text-2xl font-bold tracking-tight group-hover:text-[var(--accent)] transition-colors">
                        {role.title}
                      </h4>
                      <p className="font-mono text-sm uppercase tracking-widest mt-1 md:mt-0 opacity-70">
                        {role.date}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {role.description.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-[var(--foreground)]/80 leading-relaxed relative before:content-['▹'] before:absolute before:-left-6 before:text-[var(--accent)]"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    {/* Project Highlight Box: Standardized for all technical roles */}
                    {role.projects && (
                      <div className="grid grid-cols-1 gap-4">
                        {role.projects.map((proj, i) => (
                          <div
                            key={i}
                            className="bg-[var(--foreground)]/5 p-6 rounded-2xl border border-[var(--accent)]/5 hover:border-[var(--accent)]/20 transition-all"
                          >
                            <h5 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--accent)] mb-3">
                              {proj.title}
                            </h5>
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
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}