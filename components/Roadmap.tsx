"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaSpinner, FaRocket } from "react-icons/fa";

interface RoadmapItem {
  task: string;
  status: "Released" | "In Progress" | "Backlog";
  priority: "High" | "Medium";
  category: string;
}

const roadmapData: RoadmapItem[] = [
  // BACKLOG (Strategic Future Initiatives)
  {
    task: "Full-Time PM Recruiting: Fall 2026 Cycle",
    status: "Backlog",
    priority: "High",
    category: "Career Strategy",
  },
  {
    task: "Masters Applications: Analytics & Data Science Focus",
    status: "Backlog",
    priority: "High",
    category: "Academic Growth",
  },
  {
    task: "Microsoft Azure Solutions Architect Certification",
    status: "Backlog",
    priority: "Medium",
    category: "Cloud Infrastructure",
  },
  // IN PROGRESS (Current Execution)
  {
    task: "Capital One PM Internship: FinTech Strategy",
    status: "In Progress",
    priority: "High",
    category: "Product Management",
  },
  {
    task: "CHEPS: Clinical Flowchart & Referral Optimization",
    status: "In Progress",
    priority: "High",
    category: "Systems Design",
  },
  // RELEASED (Proven Technical Impact)
  {
    task: "Electricity Price Hybrid Forecaster (XGBoost/LGBM)",
    status: "Released",
    priority: "High",
    category: "Machine Learning",
  },
  {
    task: "Chemours BI: 25% Dashboard Performance Optimization",
    status: "Released",
    priority: "High",
    category: "Data Engineering",
  },
];

export default function Roadmap() {
  const columns = ["Backlog", "In Progress", "Released"];

  return (
    <section id="roadmap" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          Career <span className="text-[var(--accent)]">Roadmap</span>
        </h2>
        <p className="text-[var(--muted)]">
          Live tracking of my professional development and product releases.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((col) => (
          <div key={col} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 px-2">
              {col === "Backlog" && <FaRocket className="text-blue-400" />}
              {col === "In Progress" && (
                <FaSpinner className="text-yellow-400 animate-spin-slow" />
              )}
              {col === "Released" && (
                <FaCheckCircle className="text-green-400" />
              )}
              <h3 className="font-bold uppercase tracking-widest text-sm opacity-80">
                {col}
              </h3>
            </div>

            <div className="bg-[var(--foreground)]/5 rounded-2xl p-4 border border-[var(--accent)]/5 min-h-[300px] flex flex-col gap-4">
              {roadmapData
                .filter((item) => item.status === col)
                .map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-[var(--background)] p-4 rounded-xl border border-[var(--accent)]/10 shadow-sm hover:border-[var(--accent)]/40 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.priority === "High"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="text-[10px] text-[var(--muted)] font-mono">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm font-medium leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {item.task}
                    </p>
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
