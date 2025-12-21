"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown, FaDownload } from "react-icons/fa";

export default function Hero() {
  const { scrollY } = useScroll();

  // Transitions: Map 0-300px of scroll to opacity and scale changes
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.5]);
  const y = useTransform(scrollY, [0, 300], [0, -100]); // Moves it upward as it shrinks

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-8 relative"
    >
      <motion.div style={{ opacity, scale, y }} className="z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Austyn <span className="text-[var(--accent)]">Nguyen</span>
        </h1>

        <h2 className="mt-4 text-lg md:text-xl font-medium text-[var(--foreground)]/70">
          Computer Science student at the University of Michigan – Ann Arbor
        </h2>

        <p className="mt-6 max-w-xl text-[var(--muted)] font-normal leading-relaxed">
          Passionate about technology, music, and food.
        </p>
      </motion.div>

      {/* Button and Scroll Prompt remain anchored */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-10"
      >
        <a
          href="/Austyn_Nguyen_Resume.pdf"
          download
          className="group relative inline-flex items-center gap-3 px-8 py-4 bg-[var(--foreground)] text-[var(--background)] rounded-full font-bold tracking-wide transition-all hover:scale-105"
        >
          <FaDownload className="text-sm transition-transform group-hover:-translate-y-1" />
          Download Resume
        </a>
      </motion.div>

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
          <FaChevronDown className="text-[var(--accent)]" size={24} />
        </div>
      </motion.a>
    </section>
  );
}
