"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollThreshold } from "@/hooks/useScrollThreshold";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  page: "portfolio" | "music";
}

export default function Navbar({ page }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const showNamePortfolio = useScrollThreshold(300);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const leftLinks =
    page === "portfolio"
      ? [
          { name: "Home", id: "hero" },
          { name: "About", id: "about" },
          { name: "Education", id: "education" }, // Moved here
          { name: "Experience", id: "experiences" },
          { name: "Projects", id: "projects" },
          { name: "Roadmap", id: "roadmap" },
          { name: "Skills", id: "skills" },
          { name: "Contact", id: "contact" },
        ]
      : [
          { name: "Home", id: "hero" },
          { name: "Showcase", id: "performances" },
          { name: "Timeline", id: "timeline" },
          { name: "Gallery", id: "gallery" },
        ];

  const rightLink =
    page === "portfolio"
      ? { name: "Musical Journey", href: "/musical-journey" }
      : { name: "Portfolio", href: "/" };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-md border-b border-[var(--foreground)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center">
              {page === "portfolio" && (
                <AnimatePresence>
                  {showNamePortfolio && (
                    <motion.button
                      initial={{ x: 200, opacity: 0, scale: 0.8 }}
                      animate={{ x: 0, opacity: 1, scale: 1 }}
                      exit={{
                        x: 200,
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.4 },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                      onClick={() => scrollToSection("hero")}
                      className="mr-6 pr-6 border-r border-[var(--foreground)]/10 text-xl font-bold tracking-tight text-[var(--foreground)] hidden md:block"
                    >
                      Austyn{" "}
                      <span className="text-[var(--accent)]">Nguyen</span>
                    </motion.button>
                  )}
                </AnimatePresence>
              )}
              {page === "music" && (
                <button
                  onClick={() => scrollToSection("hero")}
                  className="mr-6 pr-6 border-r border-[var(--foreground)]/10 text-xl font-bold tracking-tight text-[var(--foreground)] hidden md:block"
                >
                  Austyn <span className="text-[var(--accent)]">Nguyen</span>
                </button>
              )}
            </div>

            <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
              {leftLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="text-[var(--foreground)] text-sm lg:text-base font-medium hover:text-[var(--accent)] hover:scale-105 transition-all duration-300 whitespace-nowrap"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href={rightLink.href}
              className="px-4 py-2 border-2 border-[var(--accent)] rounded-lg text-[var(--accent)] text-sm md:text-base font-semibold hover:bg-[var(--accent)]/10 transition whitespace-nowrap"
            >
              {rightLink.name}
            </Link>
            <ThemeToggle />
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-[var(--foreground)]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 bg-[var(--background)]/90 backdrop-blur-xl">
            <div className="flex flex-col space-y-2 px-2">
              {leftLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-left px-3 py-3 text-[var(--foreground)] hover:bg-[var(--foreground)]/10 rounded-md transition-all"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-[var(--accent)]/20 my-2 pt-2">
                <Link
                  href={rightLink.href}
                  className="block px-3 py-3 text-[var(--accent)] border-2 border-[var(--accent)] rounded-md text-center font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  {rightLink.name}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
