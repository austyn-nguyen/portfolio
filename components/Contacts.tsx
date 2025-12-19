"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-8 text-center bg-[var(--foreground)]/5 backdrop-blur-md"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-6"
      >
        Let's Connect
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-xl text-[var(--muted)] mb-12 max-w-2xl mx-auto"
      >
        Whether you want to talk about viola repertoire, future opportunities,
        or food, I'm always open to connecting!
      </motion.p>

      <div className="flex flex-col items-center gap-10">
        {/* Email Display & Action */}
        <motion.a
          href="mailto:austynan@umich.edu"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="group flex items-center gap-4 px-10 py-4 rounded-full bg-[var(--accent)] text-[var(--background)] font-bold hover:scale-105 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]"
        >
          <FaEnvelope
            size={20}
            className="group-hover:rotate-12 transition-transform"
          />
          <span className="tracking-wide">austynan@umich.edu</span>
        </motion.a>

        {/* Social Links Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center gap-8"
        >
          <a
            href="https://www.linkedin.com/in/austyn-an-nguyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--accent)]/30 text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-all hover:scale-110 hover:border-[var(--accent)]"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={30} />
          </a>
          <a
            href="https://github.com/austyn-nguyen"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--accent)]/30 text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-all hover:scale-110 hover:border-[var(--accent)]"
            aria-label="GitHub"
          >
            <FaGithub size={30} />
          </a>
          <a
            href="https://www.instagram.com/austyn_an_nguyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full border border-[var(--accent)]/30 text-[var(--foreground)] hover:bg-[var(--accent)]/10 transition-all hover:scale-110 hover:border-[var(--accent)]"
            aria-label="Instagram"
          >
            <FaInstagram size={30} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
