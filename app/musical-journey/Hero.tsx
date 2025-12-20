"use client";

import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center px-8 relative"
    >
      {/* Centered Profile Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-64 h-64 md:w-80 md:h-80 mb-10"
      >
        <div className="absolute inset-0 rounded-full bg-[var(--accent)]/10 animate-pulse" />
        <Image
          src="/me_2.png"
          alt="Musical Journey Portrait"
          fill
          className="rounded-full object-cover object-top border-4 border-[var(--accent)] shadow-2xl"
          priority
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-7xl font-extrabold tracking-tight"
      >
        Musical <span className="text-[var(--accent)]">Journey</span>
      </motion.h1>

      {/* Quote/Bio Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 max-w-2xl mx-auto"
      >
        <p className="text-xl md:text-2xl italic text-[var(--foreground)]/80 leading-relaxed font-serif">
          "In music you can find your own niche. You can do what you want to do.
          There is really no job description. You have to find your own way, and
          that's fun."
        </p>
        <span className="block mt-4 text-lg font-medium tracking-wide text-[var(--accent)]/90">
          — Hilary Hahn
        </span>
      </motion.div>

      {/* Animated Scroll Prompt */}
      <motion.a
        href="#performances"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
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
