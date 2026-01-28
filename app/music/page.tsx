"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Timeline, { TimelineEvent } from "./Timeline";
import Gallery from "./Gallery";
import PerformanceShowcase from "./PerformanceShowcase";
import Hero from "./Hero";

const timelineEvents: TimelineEvent[] = [
  {
    year: "2016-2017",
    title: "The Beginning",
    description:
      "Began playing the viola in 5th grade at Woodbridge Elementary School in Catonsville, Maryland. What started as curiosity blossomed into a lifelong passion.",
    location: "Woodbridge Elementary, Catonsville, MD",
    images: ["/timeline/cms.jpg"],
  },
  {
    year: "2019-2020",
    title: "New Horizons",
    description:
      "Moved to Ellicott City, Maryland in 8th grade and was placed into the Gifted and Talented (G/T) Dunloggin Middle School orchestra.",
    location: "Dunloggin Middle School, Ellicott City, MD",
    images: ["/timeline/dms.png"],
  },
  {
    year: "2020",
    title: "High School Entry",
    description:
      "Entered high school in September 2020. Initially considered quitting after one year, but found renewed inspiration.",
    location: "Centennial High School, Ellicott City, MD",
    images: ["/timeline/chs.png"],
  },
  {
    year: "2021",
    title: "Turning Point",
    description:
      "Inspired by orchestra director Allen Leung to continue my musical journey instead of quitting.",
    location: "Centennial High School, Ellicott City, MD",
  },
  {
    year: "2021-2024",
    title: "Chamber Orchestra Excellence",
    description:
      "Recommended to join the G/T Chamber Orchestra at Centennial for 10th grade (2021-2022) under the direction of Matthew Boggs. Loved it so much I continued through graduation in 2024.",
    location: "Centennial High School, Ellicott City, MD",
  },
  {
    year: "2021-2024",
    title: "Mentoring and Tutoring Initiatives",
    description:
      "Part of my high school's Music Mentors club to mentor middle school musicians. Served as an online viola tutor through the nonprofit Do Re Mi Project, guiding aspiring musicians into prestigious youth orchestras.",
    location: "Burleigh Manor Middle School & Online, Ellicott City, MD",
    images: ["/timeline/doremi.png", "/timeline/music_mentors.png"],
  },
  {
    year: "2022-2024",
    title: "Community Music Outreach",
    description:
      "Started playing in chamber experiences for retirement centers. Became president of the Centennial Music Outreach Club in my senior year of high school.",
    location:
      "Centennial High School & Local Retirement Centers, Ellicott City, MD",
    images: ["/timeline/cmop.png"],
  },
  {
    year: "2025 and Beyond",
    title: "University of Michigan-Ann Arbor",
    description:
      "Continuing my musical journey at UMich studying under Zoie Hightower. Principal Viola of the UMich Pops Orchestra and substitute violist for Adrian Symphony Orchestra.",
    location: "Ann Arbor, MI",
    images: ["/timeline/mpo.png", "/timeline/aso.png"],
  },
];

export default function MusicalJourneyPage() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Navbar fades out when the Gallery Lightbox is open to avoid overlapping */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isLightboxOpen
            ? "opacity-0 -translate-y-full pointer-events-none"
            : "opacity-100 translate-y-0"
        }`}
      >
        <Navbar page="music" />
      </div>

      {/* NEW: Modular Hero Section (Centering your image and title) */}
      <Hero />

      <div className="px-8 py-20 max-w-5xl mx-auto relative z-10">
        {/* Performance Showcase with an ID for smooth-scroll targets */}
        <div id="performances">
          <PerformanceShowcase />
        </div>

        {/* Chronological Journey */}
        <Timeline events={timelineEvents} />

        {/* Photo Gallery Grid */}
        <Gallery
          imagesUrl="/gallery/gallery.json"
          onToggle={(isOpen) => setIsLightboxOpen(isOpen)}
        />
      </div>
    </div>
  );
}
