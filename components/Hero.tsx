"use client";

import { motion } from "framer-motion";
import { FaChevronDown, FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-8 relative"
    >
      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
        Austyn <span className="text-[var(--accent)]">Nguyen</span>
      </h1>

      {/* Bio */}
      <h2 className="mt-4 text-lg md:text-xl font-medium text-[var(--foreground)]/70">
        Computer Science student at the University of Michigan – Ann Arbor
      </h2>

      {/* Updates */}
      <p className="mt-6 max-w-xl text-[var(--muted)] font-normal leading-relaxed">
        Passionate about technology, music, and food.
      </p>

      {/* Resume Download Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <a
          href="/Austyn_Nguyen_Resume.pdf" // Ensure this file is in your /public folder
          download
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold tracking-wide transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]"
        >
          <FaDownload className="text-sm transition-transform group-hover:-translate-y-1" />
          Download Resume
        </a>
      </motion.div>

      {/* Animated Scroll Prompt */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 cursor-pointer group"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-[var(--muted)] animate-[pulse_2s_infinite]">
          Scroll Down
        </span>

        <div className="animate-bounce">
          <FaChevronDown
            className="text-[var(--accent)] group-hover:text-[var(--foreground)] transition-colors"
            size={24}
          />
        </div>
      </motion.a>

      <style jsx global>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}
