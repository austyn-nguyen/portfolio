"use client";

import { motion } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  location: string;
  date: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    company: "Placeholder Company One",
    role: "Software Engineering Intern",
    location: "Ann Arbor, MI",
    date: "May 2025 – Aug 2025",
    description: [
      "Collaborated with a team of developers to build scalable web applications using Next.js and TypeScript.",
      "Optimized database queries, reducing load times by 20% for high-traffic internal tools.",
      "Participated in daily stand-ups and Agile sprints to ensure timely project delivery.",
    ],
  },
  {
    company: "Placeholder Organization Two",
    role: "Project Management Lead",
    location: "Remote",
    date: "Jan 2024 – May 2024",
    description: [
      "Led a cross-functional team of 5 students to deliver a community-driven technology initiative.",
      "Managed project timelines using Jira and Asana to track progress and mitigate risks.",
      "Communicated technical requirements to non-technical stakeholders through weekly presentations.",
    ],
  },
];

export default function Experiences() {
  return (
    <section id="experiences" className="py-24 px-8 max-w-5xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-16">Experience</h2>

      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative pl-8 border-l-2 border-[var(--accent)]/30 hover:border-[var(--accent)] transition-colors"
          >
            {/* Dot indicator on the line */}
            <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-[var(--background)] border-2 border-[var(--accent)]" />

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[var(--foreground)]">
                  {exp.role}
                </h3>
                <p className="text-lg font-semibold text-[var(--accent)]">
                  {exp.company}
                </p>
              </div>
              <div className="text-left md:text-right">
                <p className="font-mono text-sm text-[var(--foreground)]/80">
                  {exp.date}
                </p>
                <p className="text-sm italic text-[var(--muted)]">
                  {exp.location}
                </p>
              </div>
            </div>

            <ul className="list-disc list-outside ml-4 space-y-2 text-[var(--muted)] leading-relaxed">
              {exp.description.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
