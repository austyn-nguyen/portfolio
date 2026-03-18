"use client";

import Image from "next/image";
import { SiRiotgames, SiRoblox } from "react-icons/si";
import { motion } from "framer-motion";

export default function About() {
  // Animation variants for staggering the text elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="about"
      className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-16 px-8 max-w-6xl mx-auto py-20"
    >
      {/* Headshot Section with Floating Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-64 h-64 md:w-80 md:h-80 lg:w-[400px] lg:h-[400px] relative flex-shrink-0"
      >
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[var(--accent)] to-transparent opacity-20 blur-2xl" />
          <Image
            src="/me.png"
            alt="Photo of Austyn Nguyen"
            fill
            className="rounded-full object-cover shadow-2xl ring-4 ring-[var(--accent)]/40 transition-transform duration-500 hover:scale-[1.02]"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Text Section with Staggered Fade-in */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-xl text-center md:text-left"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-black tracking-tight mb-8"
        >
          About <span className="text-[var(--accent)]">Me</span>
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-[var(--foreground)]/90 text-lg leading-relaxed mb-6"
        >
          Hi! I'm Austyn, a{" "}
          <span className="font-bold text-[var(--accent)]">
            Computer Science
          </span>{" "}
          student at the{" "}
          <span className="font-bold text-[var(--accent)]">
            University of Michigan
          </span>{" "}
          with a deep passion for{" "}
          <span className="font-bold text-[var(--accent)]">
            Product Management
          </span>{" "}
          and{" "}
          <span className="font-bold text-[var(--accent)]">
            Operational Strategy
          </span>
          . I thrive at the intersection of user needs and systems optimization—turning complex clinical and technical bottlenecks into streamlined, impactful experiences.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-[var(--foreground)]/90 text-lg leading-relaxed mb-6"
        >
          Whether I'm modeling ED throughput or analyzing market trends, I’m driven by{" "}
          <span className="font-semibold text-[var(--foreground)] border-b-2 border-[var(--accent)]/50 pb-0.5">
            high-stakes problem solving
          </span>
          . I'm excited to pursue roles where I can leverage my analytical mindset to drive meaningful innovation. 
        </motion.p>
        
        <motion.p 
          variants={itemVariants}
          className="text-[var(--foreground)]/90 text-lg leading-relaxed mb-10"
        >
          I also love playing the viola—dive into my{" "}
          <a
            href="/musical-journey"
            className="font-bold text-[var(--accent)] hover:text-[var(--accent)]/80 transition-colors underline decoration-2 underline-offset-4"
          >
            Musical Journey
          </a>{" "}
          to hear more!
        </motion.p>

        {/* Hobbies/Links styled as interactive pills */}
        <motion.div variants={itemVariants} className="mt-8">
          <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)] mb-5">
            When I'm offline...
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="https://op.gg/lol/summoners/na/Cubaaash-NA1"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[var(--foreground)]/5 border border-[var(--accent)]/20 px-5 py-3 rounded-xl hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <SiRiotgames size={22} className="text-[#D3A755] group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">League of Legends</span>
            </a>
            
            <a
              href="https://www.roblox.com/user.aspx?username=GamerBoy321"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-[var(--foreground)]/5 border border-[var(--accent)]/20 px-5 py-3 rounded-xl hover:bg-[var(--accent)]/10 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-1"
            >
              <SiRoblox size={22} className="text-white group-hover:scale-110 transition-transform" />
              <span className="font-medium text-sm">Roblox Profile</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}