"use client";

import EducationCard from "./EducationCards";

export interface EducationEntry {
  school: string;
  degree: string;
  years: string;
  location: string;
  logo: string;
  accentColor: string;
  honors: string[];
  clubs: { role: string; name: string }[];
  studyAbroad?: {
    university: string;
    program: string;
    location: string;
    years: string;
    logo?: string;
  };
}

const educationData: EducationEntry[] = [
  {
    school: "University of Michigan - Ann Arbor",
    degree: "B.S.E. in Computer Science",
    years: "Aug 2024 – Dec 2026",
    location: "Ann Arbor, MI",
    logo: "/educations/UM.png",
    accentColor: "rgba(0, 39, 76, 0.4)",
    honors: [
      "Cornelius and Margaret Donovan Scholarship",
      "First-Gen Education Abroad Scholarship",
      "MHacks Category Winner: Best App Built on Groq",
    ],
    clubs: [
      {
        role: "Prof Dev, Recruitment & Membership",
        name: "Zeta Pi Professional Technical Fraternity",
      },
      {
        role: "Principal / Asst-Principal Violist",
        name: "UMich Pops Orchestra",
      },
      { role: "Violist", name: "Chamber Ensemble" },
      {
        role: "Embedded & Business Subteams",
        name: "UMARV (Autonomous Robotic Vehicle)",
      },
    ],
    studyAbroad: {
      university: "Yonsei University",
      program: "Study Abroad",
      location: "Seoul, South Korea",
      years: "Jun 2025 – Aug 2025",
      logo: "/educations/yiss.png",
    },
  },
  {
    school: "Howard Community College",
    degree: "A.A. in Computer Science & General Studies (STEM)",
    years: "May 2021 – May 2024",
    location: "Columbia, MD",
    logo: "/educations/hcc.png",
    accentColor: "rgba(186, 12, 47, 0.3)",
    honors: [
      "Frederick K. Schoenbrodt Scholar",
      "Graduated Summa Cum Laude",
      "Phi Theta Kappa Honor Society",
    ],
    clubs: [
      {
        role: "Undergraduate Researcher (Dr. Gretes)",
        name: "Feeding Inductions on Manduca Sexta",
      },
    ],
  },
  {
    school: "Centennial High School",
    degree: "High School Diploma",
    years: "Sep 2020 – May 2024",
    location: "Ellicott City, MD",
    logo: "/educations/chs.png",
    accentColor: "rgba(157, 34, 53, 0.3)",
    honors: [
      "Director's Award (Matthew Boggs)",
      "Jumpstart Program Certificate (AA Completion)",
      "National Science Honor Society",
      "Spanish National Honor Society",
      "Mu Alpha Theta (Math) Honor Society",
      "Tri-M Music Honor Society",
      "National Technical Honor Society",
    ],
    clubs: [
      { role: "President", name: "Centennial Music Outreach Program (CMOP)" },
      { role: "Attendance Manager", name: "Music Mentors" },
      { role: "Viola Tutor", name: "The Do Re Mi Project" },
      {
        role: "Principal / Asst-Principal",
        name: "BSYO (Youth & Concert levels)",
      },
      { role: "Principal / Asst-Principal", name: "Peabody Youth Orchestra" },
      { role: "Principal / Asst-Principal", name: "G/T Chamber Orchestra" },
    ],
  },
];

export default function Education() {
  return (
    <section id="education" className="mb-20 px-6">
      <h2 className="text-5xl font-bold text-center mb-16">Education</h2>
      <div className="space-y-10 max-w-6xl mx-auto">
        {educationData.map((edu, index) => (
          <EducationCard key={index} edu={edu} index={index} />
        ))}
      </div>
    </section>
  );
}
