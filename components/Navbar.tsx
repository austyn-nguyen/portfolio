"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  page: "portfolio" | "music";
}

export default function Navbar({ page }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  // Chronological order: Home -> About -> Experience -> Projects -> Skills -> Contact
  const leftLinks =
    page === "portfolio"
      ? [
          { name: "Home", id: "hero" },
          { name: "About", id: "about" },
          { name: "Experience", id: "experiences" },
          { name: "Projects", id: "projects" },
          { name: "Skills", id: "skills" },
          { name: "Contact", id: "contact" },
        ]
      : [
          { name: "Timeline", id: "timeline" },
          { name: "Photo Gallery", id: "gallery" },
        ];

  const rightLink =
    page === "portfolio"
      ? { name: "Musical Journey", href: "/musical-journey" }
      : { name: "Portfolio", href: "/" };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-transparent backdrop-blur-md border-b border-[var(--foreground)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Links - Updated chronological order */}
          <div className="hidden md:flex items-center space-x-5 lg:space-x-8">
            {leftLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-[var(--foreground)] text-sm lg:text-base font-medium hover:text-[var(--accent)] hover:scale-105 hover:font-bold transition-all duration-300 whitespace-nowrap"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right Page Link + Theme Toggle */}
          <div className="flex items-center space-x-4">
            <Link
              href={rightLink.href}
              className="px-4 py-2 border-2 border-[var(--accent)] rounded-lg text-[var(--accent)] text-sm md:text-base font-semibold hover:bg-[var(--accent)]/10 transition whitespace-nowrap"
            >
              {rightLink.name}
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-[var(--foreground)] hover:bg-[var(--foreground)]/10"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 bg-[var(--background)]/90 backdrop-blur-xl">
            <div className="flex flex-col space-y-2 px-2">
              {leftLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-left px-3 py-3 text-[var(--foreground)] hover:bg-[var(--foreground)]/10 hover:text-[var(--accent)] rounded-md transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}
              <div className="border-t border-[var(--accent)]/20 my-2 pt-2">
                <Link
                  href={rightLink.href}
                  className="block px-3 py-3 text-[var(--accent)] border-2 border-[var(--accent)] rounded-md text-center font-semibold hover:bg-[var(--accent)]/10 transition"
                  onClick={() => setIsOpen(false)}
                >
                  {rightLink.name}
                </Link>
              </div>
              <div className="flex justify-center py-4">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
