"use client";

import { motion } from "framer-motion";
import {
  FaPython,
  FaGitAlt,
  FaGithub,
  FaTools,
  FaFilePowerpoint,
  FaFileExcel,
  FaEnvelope,
  FaCloud,
  FaChartBar,
  FaWindows,
  FaApple,
  FaLinux,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiJira,
  SiAsana,
  SiScrumalliance,
  SiDebian,
} from "react-icons/si";
import { DiJava, DiMsqlServer } from "react-icons/di";

const skillCategories = [
  {
    title: "Product Management Tools",
    skills: [
      { name: "Agile Scrum", icon: SiScrumalliance, color: "text-purple-500" },
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
      { name: "Asana", icon: SiAsana, color: "text-orange-500" },
      { name: "DevOps", icon: FaTools, color: "text-indigo-500" },
      { name: "Git", icon: FaGitAlt, color: "text-orange-600" },
      { name: "GitHub", icon: FaGithub, color: "text-gray-400" },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "Python", icon: FaPython, color: "text-yellow-500" },
      { name: "C++", icon: SiCplusplus, color: "text-blue-600" },
      { name: "C", icon: SiC, color: "text-gray-600" },
      { name: "Java", icon: DiJava, color: "text-red-500" },
    ],
  },
  {
    title: "Operating Systems",
    skills: [
      { name: "Windows", icon: FaWindows, color: "text-blue-500" },
      { name: "MacOS", icon: FaApple, color: "text-gray-400" },
      { name: "Linux/Unix", icon: FaLinux, color: "text-yellow-600" },
      { name: "Debian", icon: SiDebian, color: "text-red-600" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
      { name: "SQL Server", icon: DiMsqlServer, color: "text-red-600" },
      { name: "NoSQL", icon: SiMongodb, color: "text-green-600" },
    ],
  },
  {
    title: "Microsoft Tools & Certifications",
    skills: [
      { name: "PowerPoint", icon: FaFilePowerpoint, color: "text-orange-600" },
      { name: "Excel", icon: FaFileExcel, color: "text-green-600" },
      { name: "Outlook", icon: FaEnvelope, color: "text-blue-600" },
      { name: "Microsoft Azure", icon: FaCloud, color: "text-blue-400" },
      {
        name: "Power BI (Certified)",
        icon: FaChartBar,
        color: "text-yellow-500",
        // Certification link added here
        url: "https://learn.microsoft.com/en-us/users/austynnguyen-2735/credentials/c37b22fdc08bdf5a",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-24 px-8 max-w-6xl mx-auto flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl font-bold tracking-tight mb-16"
      >
        Technical <span className="text-[var(--accent)]">Skills</span>
      </motion.h2>

      <div className="space-y-20 w-full">
        {skillCategories.map((category, catIdx) => (
          <div key={category.title} className="text-center">
            <h3 className="text-2xl font-semibold mb-10 text-[var(--foreground)]/70 uppercase tracking-widest">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center">
              {category.skills.map((skill, skillIdx) => {
                // Determine if this skill should be a link or a div
                const isLink = !!skill.url;
                const Wrapper = isLink ? motion.a : motion.div;

                return (
                  <Wrapper
                    key={skill.name}
                    {...(isLink
                      ? {
                          href: skill.url,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: catIdx * 0.1 + skillIdx * 0.05 }}
                    whileHover={{ y: -5 }}
                    className={`flex flex-col items-center p-6 bg-[var(--foreground)]/5 border border-[var(--accent)]/10 backdrop-blur-md rounded-2xl shadow-sm hover:border-[var(--accent)]/40 transition-all group ${
                      isLink ? "cursor-pointer" : ""
                    }`}
                  >
                    <skill.icon
                      size={40}
                      className={`${skill.color} mb-4 transition-transform group-hover:scale-110`}
                    />
                    <span className="text-sm font-medium tracking-tight">
                      {skill.name}
                    </span>
                    {isLink && (
                      <span className="text-[10px] mt-2 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)] font-bold uppercase">
                        View Credential
                      </span>
                    )}
                  </Wrapper>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
