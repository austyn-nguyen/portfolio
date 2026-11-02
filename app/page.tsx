"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Experiences from "@/components/Experiences";
import Education from "@/components/Education"; 
import Contact from "@/components/Contacts";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isLightboxOpen
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Navbar page="portfolio" />
      </div>

      <main id="main-content" className="portfolio-main" tabIndex={-1}>
        <Hero />
        <Projects onToggle={setIsLightboxOpen} />
        <About />
        <Experiences />
        <Education />
        <Skills />
        <Roadmap />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
