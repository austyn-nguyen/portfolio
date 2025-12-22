"use client";

import { motion } from "framer-motion";
import { FaYoutube } from "react-icons/fa";

interface Performance {
  title: string;
  videoId: string;
  startTime?: number;
  description: string;
}

const performances: Performance[] = [
  {
    title: "High School Senior Recital",
    videoId: "F4PH74bNHCI",
    startTime: 3062, // 51:02
    description:
      "A culminating senior performance featuring advanced solo viola repertoire and select chamber works.",
  },
  {
    title: "Mozart: Horn Quintet in Eb Major",
    videoId: "6mMmBHn5pJ8",
    startTime: 595, // 9:55
    description:
      "A collaborative chamber performance of Mozart's K. 407, highlighting the intricate dialogue between strings and horn.",
  },
  {
    title: "Schubert: 'Trout' Quintet",
    videoId: "6mMmBHn5pJ8",
    startTime: 2862, // 47:42
    description:
      "A lively performance of Schubert's iconic Piano Quintet in A major, specifically the fourth movement themes and variations.",
  },
  {
    title: "College Fall 2025 Recital",
    videoId: "ZiDo4a7Z8Zs",
    description:
      "University of Michigan Fall recital highlight, showcasing growth in technical mastery and musical interpretation.",
  },
];

export default function PerformanceShowcase() {
  return (
    <section className="mb-20">
      {/* Added Header */}
      <h2 className="text-5xl font-bold text-center mb-12">
        Featured <span className="text-[var(--accent)]">Performances</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {performances.map((perf, index) => {
          const embedUrl = `https://www.youtube.com/embed/${perf.videoId}${
            perf.startTime ? `?start=${perf.startTime}` : ""
          }`;

          const watchUrl = `https://www.youtube.com/watch?v=${perf.videoId}${
            perf.startTime ? `&t=${perf.startTime}s` : ""
          }`;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group bg-[var(--foreground)]/5 backdrop-blur-md border border-[var(--accent)]/10 rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={embedUrl}
                  title={perf.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {perf.title}
                </h3>
                <p className="text-[var(--muted)] text-sm mb-6 leading-relaxed">
                  {perf.description}
                </p>

                <a
                  href={watchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#FF0000] text-white font-bold hover:scale-105 transition-transform shadow-md text-sm"
                >
                  Watch Full Video on <FaYoutube size={18} />
                </a>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
