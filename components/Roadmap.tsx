"use client";

import { motion } from "framer-motion";
import { FaCheckCircle, FaSpinner, FaRocket } from "react-icons/fa";

interface RoadmapItem {
  task: string;
  status: "Released" | "In Progress" | "Backlog";
  priority: "High" | "Medium";
  category: string;
  progress?: number; // New field: Manual progress percentage (0-100)
}

const roadmapData: RoadmapItem[] = [
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
  {
    task: "Capital One PM Internship: FinTech Strategy",
    status: "In Progress",
    priority: "High",
    category: "Product Management",
    progress: 10, // <--- MANUALLY CHANGE THIS NUMBER
  },
  {
    task: "CHEPS: Clinical Flowchart & Referral Optimization",
    status: "In Progress",
    priority: "High",
    category: "Systems Design",
    progress: 50, // <--- MANUALLY CHANGE THIS NUMBER
  },
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
  const columns = ["Backlog", "In Progress", "Released"] as const;

  return (
    <section id="roadmap" className="py-24 px-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 tracking-tight">
          Career <span className="text-[var(--accent)]">Roadmap</span>
        </h2>
        <p className="text-[var(--muted)]">
          Live tracking of professional velocity and product delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {columns.map((col) => (
          <div key={col} className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-2 px-2">
              {col === "Backlog" && <FaRocket className="text-blue-400" />}
              {col === "In Progress" && (
                <FaSpinner className="text-yellow-400 animate-[spin_3s_linear_infinite]" />
              )}
              {col === "Released" && (
                <FaCheckCircle className="text-green-400" />
              )}
              <h3 className="font-bold uppercase tracking-widest text-sm opacity-80">
                {col}
              </h3>
            </div>

            <div className="bg-[var(--foreground)]/5 rounded-2xl p-4 border border-[var(--accent)]/5 min-h-[400px] flex flex-col gap-4">
              {roadmapData
                .filter((item) => item.status === col)
                .map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`bg-[var(--background)] p-4 rounded-xl border border-[var(--accent)]/10 shadow-sm transition-all duration-300 group ${
                      item.status === "Released"
                        ? "hover:shadow-[0_0_15px_rgba(34,197,94,0.15)] hover:border-green-500/30"
                        : item.status === "In Progress"
                        ? "hover:shadow-[0_0_15px_rgba(234,179,8,0.15)] hover:border-yellow-500/30"
                        : "hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:border-blue-500/30"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          item.priority === "High"
                            ? "bg-red-500/10 text-red-500"
                            : "bg-blue-500/10 text-blue-500"
                        }`}
                      >
                        {item.priority}
                      </span>
                      <span className="text-[9px] text-[var(--muted)] font-mono uppercase">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-sm font-semibold leading-tight group-hover:text-[var(--accent)] transition-colors">
                      {item.task}
                    </p>

                    {/* MANUALLY CONTROLLED PROGRESS BAR */}
                    {item.status === "In Progress" && (
                      <div className="mt-4">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[8px] font-bold text-[var(--muted)] uppercase tracking-tighter">
                            Current Sprint
                          </span>
                          <span className="text-[8px] font-bold text-[var(--accent)]">
                            {item.progress}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-[var(--accent)]/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${item.progress}%` }}
                            transition={{
                              duration: 1.5,
                              ease: "easeOut",
                              delay: 0.2,
                            }}
                            className="h-full bg-[var(--accent)] shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
