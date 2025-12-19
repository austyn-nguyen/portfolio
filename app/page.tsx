// app/page.tsx
"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Contact from "@/components/Contacts";

export default function Home() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isLightboxOpen
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Navbar page="portfolio" />
      </div>

      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        {/* Pass the toggle function here */}
        <Projects onToggle={(isOpen) => setIsLightboxOpen(isOpen)} />
        <Contact />
      </main>
    </div>
  );
}
