import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Timeline, { TimelineEvent } from "./Timeline";
import PerformanceShowcase from "./PerformanceShowcase";
import Hero from "./Hero";

const timelineEvents: TimelineEvent[] = [
  {
    year: "2016-2017",
    title: "The Beginning",
    description:
      "Began playing the viola in 5th grade at Woodbridge Elementary School in Catonsville, Maryland. What started as curiosity blossomed into a lifelong passion.",
    location: "Woodbridge Elementary, Catonsville, MD",
    images: ["/images/music/timeline/woodbridge-elementary.jpg"],
  },
  {
    year: "2019-2020",
    title: "New Horizons",
    description:
      "Moved to Ellicott City, Maryland in 8th grade and was placed into the Gifted and Talented (G/T) Dunloggin Middle School orchestra.",
    location: "Dunloggin Middle School, Ellicott City, MD",
    images: ["/images/music/timeline/dunloggin-middle-school.png"],
  },
  {
    year: "2020",
    title: "High School Entry",
    description:
      "Entered high school in September 2020. Initially considered quitting after one year, but found renewed inspiration.",
    location: "Centennial High School, Ellicott City, MD",
    images: ["/images/music/timeline/centennial-high-school.png"],
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
    images: ["/images/music/timeline/do-re-mi-project.png", "/images/music/timeline/music-mentors.png"],
  },
  {
    year: "2022-2024",
    title: "Community Music Outreach",
    description:
      "Started playing in chamber experiences for retirement centers. Became president of the Centennial Music Outreach Club in my senior year of high school.",
    location:
      "Centennial High School & Local Retirement Centers, Ellicott City, MD",
    images: ["/images/music/timeline/centennial-music-outreach.png"],
  },
  {
    year: "2025 and Beyond",
    title: "University of Michigan-Ann Arbor",
    description:
      "Continuing my musical journey at UMich studying under Zoie Hightower. Principal Viola of the UMich Pops Orchestra and substitute violist for Adrian Symphony Orchestra.",
    location: "Ann Arbor, MI",
    images: ["/images/music/timeline/michigan-pops-orchestra.png", "/images/music/timeline/adrian-symphony-orchestra.png"],
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
        <Timeline events={timelineEvents} />
      </main>
      <Footer page="music" />
    </div>
  );
}
