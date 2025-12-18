"use client";

import {
  FaPython,
  FaGitAlt,
  FaDocker,
  FaTools,
  FaFilePowerpoint,
  FaFileExcel,
  FaEnvelope,
  FaCloud,
  FaChartBar,
} from "react-icons/fa";
import {
  SiC,
  SiCplusplus,
  SiMongodb,
  SiPostgresql,
  SiJira,
  SiAsana,
  SiScrumalliance,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

const skillCategories = [
  {
    title: "Product Management Tools",
    skills: [
      { name: "Agile Scrum", icon: SiScrumalliance, color: "text-purple-500" },
      { name: "Jira", icon: SiJira, color: "text-blue-500" },
      { name: "Asana", icon: SiAsana, color: "text-orange-500" },
      { name: "DevOps", icon: FaTools, color: "text-indigo-500" },
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
    title: "Databases",
    skills: [
      { name: "SQL", icon: SiPostgresql, color: "text-blue-600" },
      { name: "NoSQL", icon: SiMongodb, color: "text-green-600" },
      { name: "MongoDB", icon: SiMongodb, color: "text-green-600" },
    ],
  },
  {
    title: "Microsoft Tools & Certifications",
    skills: [
      {
        name: "PowerPoint",
        icon: FaFilePowerpoint,
        color: "text-orange-600",
      },
      { name: "Excel", icon: FaFileExcel, color: "text-green-600" },
      { name: "Outlook", icon: FaEnvelope, color: "text-blue-600" },
      {
        name: "Azure ML Studio",
        icon: FaCloud,
        color: "text-blue-500",
      },
      {
        name: "Power BI (Certified)",
        icon: FaChartBar,
        color: "text-yellow-500",
      },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center px-8 py-16"
    >
      <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-12">
        Skills
      </h2>
      <div className="space-y-12 max-w-6xl">
        {skillCategories.map((category) => (
          <div key={category.title} className="text-center">
            <h3 className="text-2xl md:text-3xl font-medium mb-8">
              {category.title}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col items-center p-6 bg-white/10 dark:bg-gray-800/10 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                >
                  <skill.icon size={48} className={`${skill.color} mb-4`} />
                  <span className="text-lg font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
