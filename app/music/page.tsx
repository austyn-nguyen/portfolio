import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Timeline, { TimelineEvent } from "./Timeline";
import PerformanceShowcase from "./PerformanceShowcase";
import Hero from "./Hero";
import ListeningLately from "./ListeningLately";

const timelineEvents: TimelineEvent[] = [
  {
    year: "2016-2017",
    title: "The Beginning",
    description:
      "Began playing the viola in 5th grade at Woodbridge Elementary School in Catonsville, Maryland. What started as curiosity blossomed into a lifelong passion.",
    location: "Woodbridge Elementary, Catonsville, MD",
    affiliations: [{ name: "Woodbridge Elementary", detail: "Where I started", logo: "/images/music/timeline/woodbridge-elementary-logo.png" }],
  },
  {
    year: "2019-2020",
    title: "New Horizons",
    description:
      "Moved to Ellicott City, Maryland in 8th grade and was placed into the Gifted and Talented (G/T) Dunloggin Middle School orchestra.",
    location: "Dunloggin Middle School, Ellicott City, MD",
    affiliations: [{ name: "Dunloggin Middle School", detail: "G/T orchestra", logo: "/images/music/timeline/dunloggin-middle-school.png" }],
  },
  {
    year: "2020",
    title: "High School Entry",
    description:
      "Entered high school in September 2020. Initially considered quitting after one year, but found renewed inspiration.",
    location: "Centennial High School, Ellicott City, MD",
    affiliations: [{ name: "Centennial High School", detail: "School orchestra", logo: "/images/music/timeline/centennial-high-school.png" }],
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
    year: "Sep 2021 – May 2024",
    title: "Youth Orchestra Leadership",
    description:
      "Performed with Peabody Youth Orchestra, Baltimore Symphony Youth Orchestra, and the Howard County Gifted/Talented Orchestra in roles including assistant principal and principal violist. Led viola sectionals, worked through bowing choices, and coordinated musical decisions with other principal chairs and the conductor.",
    location: "Baltimore & Howard County, MD",
    affiliations: [
      { name: "Peabody Youth Orchestra", detail: "Viola", logo: "/images/music/timeline/peabody-institute.png", logoTone: "dark" },
      { name: "Baltimore Symphony Youth Orchestra", detail: "Viola", logo: "/images/music/timeline/baltimore-symphony-youth-orchestras.svg", logoTone: "dark" },
      { name: "Howard County Gifted/Talented Orchestra", detail: "Viola", logo: "/images/music/timeline/howard-county-youth-orchestras.webp" },
    ],
  },
  {
    year: "2021-2024",
    title: "Mentoring and Tutoring Initiatives",
    description:
      "Part of my high school's Music Mentors club to mentor middle school musicians. Served as an online viola tutor through the nonprofit Do Re Mi Project, guiding aspiring musicians into prestigious youth orchestras.",
    location: "Burleigh Manor Middle School & Online, Ellicott City, MD",
    affiliations: [
      { name: "Do Re Mi Project", detail: "Online viola tutor", logo: "/images/music/timeline/do-re-mi-project.png" },
      { name: "Music Mentors", detail: "Student mentor", logo: "/images/music/timeline/music-mentors.png" },
    ],
  },
  {
    year: "2022-2024",
    title: "Community Music Outreach",
    description:
      "Started playing in chamber experiences for retirement centers. Became president of the Centennial Music Outreach Club in my senior year of high school.",
    location:
      "Centennial High School & Local Retirement Centers, Ellicott City, MD",
    affiliations: [{ name: "Centennial Music Outreach", detail: "Club president · senior year", logo: "/images/music/timeline/centennial-music-outreach.png" }],
  },
  {
    year: "2025 and Beyond",
    title: "University of Michigan-Ann Arbor",
    description:
      "Continuing my musical journey at UMich studying under Zoie Hightower. Principal Viola of the UMich Pops Orchestra and substitute violist for Adrian Symphony Orchestra.",
    location: "Ann Arbor, MI",
    affiliations: [
      { name: "Michigan Pops Orchestra", detail: "Principal violist", logo: "/images/music/timeline/michigan-pops-orchestra.png" },
      { name: "Adrian Symphony Orchestra", detail: "Substitute violist", logo: "/images/music/timeline/adrian-symphony-orchestra.png" },
    ],
  },
];

export default function MusicalJourneyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar page="music" />
      </div>

      <a className="skip-link" href="#music-content">Skip to content</a>
      <main id="music-content" className="music-main" tabIndex={-1}>
        <Hero />
        <PerformanceShowcase />
        <ListeningLately />
        <Timeline events={timelineEvents} />
      </main>
      <Footer page="music" />
    </div>
  );
}
