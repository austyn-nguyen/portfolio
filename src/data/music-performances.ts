interface Performance {
  title: string;
  videoId: string;
  startTime?: number;
  description: string;
  programNote: string;
}

export const performances: Performance[] = [
  {
    title: "High School Senior Recital",
    programNote: "Solo & chamber music",
    videoId: "F4PH74bNHCI",
    startTime: 3062, // 51:02
    description:
      "A culminating senior performance featuring advanced solo viola repertoire and select chamber works.",
  },
  {
    title: "Mozart: Horn Quintet in Eb Major",
    programNote: "Chamber music · K. 407",
    videoId: "6mMmBHn5pJ8",
    startTime: 595, // 9:55
    description:
      "A collaborative chamber performance of Mozart's K. 407, highlighting the intricate dialogue between strings and horn.",
  },
  {
    title: "Schubert: 'Trout' Quintet",
    programNote: "Chamber music · Fourth movement",
    videoId: "6mMmBHn5pJ8",
    startTime: 2862, // 47:42
    description:
      "A lively performance of Schubert's iconic Piano Quintet in A major, specifically the fourth movement themes and variations.",
  },
  {
    title: "College Fall 2025 Recital",
    programNote: "University of Michigan · Fall 2025",
    videoId: "ZiDo4a7Z8Zs",
    description:
      "University of Michigan Fall recital highlight, showcasing growth in technical mastery and musical interpretation.",
  },
  {
    title: "Beethoven: Trio B flat Major, op. 11 \“Gassenhauer-Trio\”",
    programNote: "Chamber music · Op. 11",
    videoId: "GdOosos4a8s",
    startTime: 3091, // 51:31
    description:
      "A collaborative chamber performance of Beethoven's Clarinet Trio with two besties.",
  },
];

