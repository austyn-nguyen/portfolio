"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FaGraduationCap,
  FaAward,
  FaUsers,
  FaMapMarkerAlt,
  FaGlobeAmericas,
  FaCalendarAlt,
} from "react-icons/fa";
import { EducationEntry } from "./Education";

export default function EducationCard({
  edu,
  index,
}: {
  edu: EducationEntry;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const isEven = index % 2 === 0;

  // Parallax and Rotation logic based on index
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [-25, 25] : [25, -25]
  );
  const logoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.1]);
  const watermarkRotate = useTransform(
    scrollYProgress,
    [0, 1],
    isEven ? [10, 30] : [20, 0]
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, ease: "easeOut", delay: index * 0.1 }}
      className="relative flex flex-col md:flex-row bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--accent)]/10 rounded-3xl shadow-2xl"
      style={{ boxShadow: `0 20px 50px -20px ${edu.accentColor}` }}
    >
      {/* LEFT: Integrated Logo Area */}
      <div
        className="relative md:w-1/3 flex items-center justify-center p-12 overflow-hidden shrink-0"
        style={{
          background: `linear-gradient(${isEven ? "145deg" : "215deg"}, ${
            edu.accentColor
          }, transparent)`,
        }}
      >
        <motion.div
          style={{ y, rotate: watermarkRotate }}
          className={`absolute ${
            isEven ? "-bottom-16 -right-16" : "-top-16 -left-16"
          } w-[32rem] h-[32rem] pointer-events-none z-0`}
        >
          <Image
            src={edu.logo}
            alt=""
            fill
            className="object-contain opacity-10 grayscale blur-[2px] select-none mix-blend-overlay"
          />
        </motion.div>

        <motion.div
          className="absolute w-40 h-40 rounded-full blur-[70px] z-0"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.3, 0.6, 0.3]
            ),
            backgroundColor: edu.accentColor,
          }}
        />

        <motion.div
          style={{ scale: logoScale }}
          className="relative w-40 h-40 md:w-48 md:h-48 z-10 flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <Image
              src={edu.logo}
              alt={edu.school}
              fill
              className="object-contain filter drop-shadow-2xl brightness-105 contrast-105"
              style={{ mixBlendMode: "multiply" }}
            />
          </div>
        </motion.div>
      </div>

      {/* RIGHT: Content Area */}
      <div className="relative z-10 flex-grow p-8 lg:p-12 bg-gradient-to-r from-transparent to-[var(--background)]/10">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-10">
          <div>
            <h3 className="text-3xl lg:text-4xl font-black tracking-tight mb-2">
              {edu.school}
            </h3>
            <div className="flex items-center gap-2 text-[var(--accent)] font-bold">
              <FaGraduationCap className="text-xl" />
              <span className="text-lg lg:text-xl tracking-tight">
                {edu.degree}
              </span>
            </div>
          </div>
          <div className="lg:text-right shrink-0">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--background)] border border-[var(--accent)]/30 text-sm font-black shadow-sm">
              <FaCalendarAlt className="text-[var(--accent)]" />
              {edu.years}
            </div>
            <p className="mt-3 text-[var(--muted)] flex items-center lg:justify-end gap-2 text-xs uppercase tracking-[0.2em] font-bold">
              <FaMapMarkerAlt className="text-[var(--accent)]" /> {edu.location}
            </p>
          </div>
        </div>

        {/* Study Abroad Section - Clipping Fix Applied */}
        {edu.studyAbroad && (
          <div className="mb-12 mt-6 p-6 rounded-3xl bg-white/5 border border-white/10 relative overflow-visible">
            <div className="absolute -top-3 left-6 px-4 py-1 bg-[var(--accent)] text-[var(--background)] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg z-20">
              International Experience
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-5">
                {edu.studyAbroad.logo ? (
                  <div className="relative w-16 h-16 shrink-0 bg-white rounded-xl p-2 shadow-inner">
                    <Image
                      src={edu.studyAbroad.logo}
                      alt="Yonsei"
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-[var(--background)] rounded-2xl shadow-xl border border-white/5">
                    <FaGlobeAmericas className="text-[var(--accent)] text-2xl" />
                  </div>
                )}
                <div>
                  <h4 className="font-extrabold text-xl">
                    {edu.studyAbroad.university}
                  </h4>
                  <p className="text-[var(--muted)] font-medium">
                    {edu.studyAbroad.program}
                  </p>
                </div>
              </div>
              <div className="text-sm sm:text-right">
                <p className="font-black text-[var(--accent)]">
                  {edu.studyAbroad.location}
                </p>
                <p className="text-xs text-[var(--muted)] font-bold">
                  {edu.studyAbroad.years}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Honors Section */}
          <section>
            <h4 className="flex items-center gap-3 mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--muted)] border-b border-[var(--accent)]/10 pb-2">
              <FaAward className="text-[var(--accent)] text-sm" /> Honors &
              Awards
            </h4>
            <div className="flex flex-wrap gap-2">
              {edu.honors.map((honor, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-white/5 border border-white/10"
                >
                  {honor}
                </span>
              ))}
            </div>
          </section>

          {/* ECs Section */}
          {edu.clubs.length > 0 && (
            <section>
              <h4 className="flex items-center gap-3 mb-6 text-[11px] font-black uppercase tracking-[0.3em] text-[var(--muted)] border-b border-[var(--accent)]/10 pb-2">
                <FaUsers className="text-[var(--accent)] text-sm" /> Leadership
                & Engagement
              </h4>
              <ul className="space-y-5">
                {edu.clubs.map((club, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-1.5 h-6 bg-[var(--accent)] rounded-full opacity-30" />
                    <div>
                      <p className="font-black leading-tight text-sm tracking-tight">
                        {club.role}
                      </p>
                      <p className="text-[var(--muted)] text-[13px] font-medium mt-1">
                        {club.name}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </motion.div>
  );
}
