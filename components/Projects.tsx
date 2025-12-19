"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

interface Project {
  title: string;
  affiliation: string;
  date: string;
  description: string;
  longDescription: string;
  tags: string[];
  link: string;
  githubLink?: string;
  devpostLink?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Electricity Price Hybrid Forecaster",
    affiliation: "ElectricFish",
    date: "Aug 2025 – Dec 2025",
    description:
      "A three-tier hybrid model using XGBoost, LGBM, and NGBoost to predict CAISO market pricing with high accuracy",
    longDescription:
      "Developed a robust Day-Ahead Price Forecasting Model focusing on Locational Marginal Price (LMP) in the CAISO region. The system incorporates a three-tier hybrid architecture: LightGBM for spike classification, NGBoost for uncertainty estimation, and XGBoost for baselines. We pivoted to city-level data for nine major load centers to capture localized pricing required for operational needs.",
    tags: ["Python", "Machine Learning", "XGBoost", "Data Science"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/electricfish.png",
  },
  {
    title: "Infusion Workflow Optimization",
    affiliation: "CHEPS / Brighton Center for Specialty Care",
    date: "Aug 2025 – Oct 2025",
    description:
      "Process mapping and data collection to identify bottlenecks in medication order checking for infusion nurses",
    longDescription:
      "The nurses at Brighton Center for Specialty Care (BCSC) Infusion Clinic flagged delays caused by unactionable medication orders. Using process mapping, shadowing, and intensive data collection, I documented the infusion order checking workflow. This documentation identified critical bottlenecks and provided data-driven opportunities to streamline patient care.",
    tags: ["Healthcare Engineering", "Process Mapping", "Data Collection"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/cheps.jpg",
  },
  {
    title: "The WiLi Watch",
    affiliation: "MHacks (University of Michigan)",
    date: "Sep 2024",
    description:
      "A smart home wristband utilizing cloud-based LLMs for wireless environment control and voice-automated tasks",
    longDescription:
      "Collaborated with a team of 3 to develop a wearable device enabling wireless interaction with smart home environments. The system uses a cloud-based LLM to predict user needs based on verbal cues. Integrated a Free WiLi device with an Orange Pi 5 and Arduino Nano, using Groq, Whisper, and Cartesia for speech-to-text interfacing.",
    tags: ["Python", "LLM", "Arduino", "Hardware"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    devpostLink: "https://devpost.com/software/wili-watch",
    image: "/mhack.jpg",
  },
  {
    title: "Beverage Delivery Robot",
    affiliation: "University of Michigan",
    date: "Aug 2024 – Dec 2024",
    description:
      "An autonomous omnidirectional robot and Java simulation designed to serve students in the Duderstadt Library",
    longDescription:
      "Developed a beverage delivery bot for the Duderstadt Library. Modified a VANLINNY omnidirectional robot for autonomous patrolling and developed a Java-based computer simulation to model robot navigation across various floors of the library. Conducted user interviews and surveys to gain insights into study habits and ethical opinions.",
    tags: ["Java", "C++", "CAD", "Robotics"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/robot.jpg",
  },
  {
    title: "FAIR-Compliant Metadata Standard",
    affiliation: "National Institute of Standards and Technology (NIST)",
    date: "May 2024 – Aug 2024",
    description:
      "Developing machine-ready RO-Crate standards for phase field simulations to enhance research data portability",
    longDescription:
      "Discusses the adoption of the RO-Crate standard to describe phase field simulations in computational materials science. Used software libraries to demonstrate how simulations can be packaged with metadata including computational environments, numerical schemes, and problem specifications, addressing deficiencies in machine-ready semantic web standards.",
    tags: [
      "Python",
      "Shell Scripting",
      "Unix/Linux",
      "Pandas",
      "Matplotlib",
      "Git",
      "GitHub",
    ],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    githubLink: "https://github.com/austyn-nguyen/RO-Crate",
    image: "/nist.png",
  },
  {
    title: "Manduca sexta Feeding Inductions",
    affiliation: "Howard Community College",
    date: "Aug 2023 – Dec 2023",
    description:
      "An investigation into the dietary flexibility and adaptability of tobacco hornworm larvae across different plant families",
    longDescription:
      "Investigated feeding inductions by rearing larvae on non-solanaceous plants from the Fabaceae and Cruciferae families. The study explores the dietary versatility of Manduca sexta to better understand extent of their adaptability when raised on different plant families outside their typical host range.",
    tags: ["LaTeX", "Biology Research"],
    link: "https://www.linkedin.com/in/austyn-an-nguyen/",
    image: "/cms.jpg",
  },
];

interface ProjectsProps {
  onToggle?: (isOpen: boolean) => void;
}

export default function Projects({ onToggle }: ProjectsProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    onToggle?.(selectedIndex !== null);
  }, [selectedIndex, onToggle]);

  const paginate = (direction: number) => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      let next = prev + direction;
      if (next < 0) next = projects.length - 1;
      if (next >= projects.length) next = 0;
      return next;
    });
  };

  return (
    <section id="projects" className="py-20 px-8 max-w-6xl mx-auto">
      <h2 className="text-5xl font-bold text-center mb-12">Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            onClick={() => setSelectedIndex(index)}
            className="group p-6 rounded-xl bg-[var(--foreground)]/5 border border-[var(--accent)]/20 backdrop-blur-sm cursor-pointer flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold group-hover:text-[var(--accent)] transition-colors leading-tight mr-2">
                {project.title}
              </h3>
              <span className="text-[10px] font-mono text-[var(--muted)] whitespace-nowrap pt-1">
                {project.date.split(" – ")[0]}
              </span>
            </div>

            <p className="text-xs font-semibold text-[var(--accent)] mb-4 italic">
              {project.affiliation}
            </p>

            <div className="relative w-full h-40 mb-4 overflow-hidden rounded-lg border border-[var(--accent)]/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <p className="text-[var(--muted)] text-sm mb-4 flex-grow leading-relaxed">
              {project.description}...{" "}
              <span className="text-[var(--accent)] text-xs font-bold underline decoration-dotted">
                Learn More
              </span>
            </p>

            <div className="flex gap-2 flex-wrap">
              {project.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-[10px] font-medium rounded bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 3 && (
                <span className="text-[10px] text-[var(--muted)] pt-1">
                  +{project.tags.length - 3}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[var(--background)]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.button
              className="absolute top-8 right-8 text-[var(--foreground)] z-[110]"
              onClick={() => setSelectedIndex(null)}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <FaTimes size={40} />
            </motion.button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(-1);
              }}
              className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 hover:text-[var(--foreground)] z-[110]"
            >
              <FaArrowLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                paginate(1);
              }}
              className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-[var(--foreground)]/50 hover:text-[var(--foreground)] z-[110]"
            >
              <FaArrowRight size={36} />
            </button>

            <motion.div
              className="bg-[var(--background)] border border-[var(--accent)]/30 p-8 md:p-12 rounded-2xl max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[var(--accent)] font-bold tracking-widest uppercase text-xs">
                {projects[selectedIndex].affiliation} •{" "}
                {projects[selectedIndex].date}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 leading-tight">
                {projects[selectedIndex].title}
              </h2>
              <p className="text-base md:text-lg text-[var(--muted)] leading-relaxed mb-8">
                {projects[selectedIndex].longDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {projects[selectedIndex].tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs rounded-full bg-[var(--foreground)]/5 border border-[var(--accent)]/30 text-[var(--foreground)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href={projects[selectedIndex].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#0077b5] text-white font-bold hover:scale-105 transition-transform shadow-lg"
                >
                  LinkedIn <FaLinkedin size={18} />
                </a>

                {projects[selectedIndex].githubLink && (
                  <a
                    href={projects[selectedIndex].githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#333] text-white font-bold hover:scale-105 transition-transform border border-white/10 shadow-lg"
                  >
                    GitHub <FaGithub size={18} />
                  </a>
                )}

                {projects[selectedIndex].devpostLink && (
                  <a
                    href={projects[selectedIndex].devpostLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#003E54] text-white font-bold hover:scale-105 transition-transform border border-white/10 shadow-lg"
                  >
                    Devpost <SiDevpost size={18} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
