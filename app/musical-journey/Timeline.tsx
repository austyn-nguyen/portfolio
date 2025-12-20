"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  location: string;
  images?: string[];
}

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  return (
    <div id="timeline" className="relative mb-20">
      {/* Vertical Line - Added -translate-x-1/2 to center accurately */}
      <div className="absolute left-8 md:left-1/2 w-0.5 h-full bg-[var(--accent)] z-0 -translate-x-1/2" />

      {events.map((event, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          viewport={{ once: true }}
          className={`relative flex items-center mb-12 ${
            index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
          }`}
        >
          {/* Timeline Dot - Added -translate-x-1/2 to align center of dot with line */}
          <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-[var(--accent)] rounded-full border-4 border-[var(--background)] z-10 -translate-x-1/2" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            className={`ml-16 md:ml-0 md:w-5/12 bg-[var(--background)]/70 backdrop-blur rounded-xl p-6 shadow-lg ${
              index % 2 === 0 ? "md:mr-8" : "md:ml-8"
            }`}
          >
            <div className="flex">
              <div className="flex-1">
                <div className="text-sm font-semibold mb-2">{event.year}</div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="mb-3 text-[var(--foreground)]/80">
                  {event.description}
                </p>
                <div className="text-sm italic text-[var(--muted)]">
                  {event.location}
                </div>
              </div>
              {event.images && (
                <div className="ml-4 space-y-2">
                  {event.images.map((img, i) => (
                    <Image
                      key={i}
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-full border-2 border-[var(--accent)] object-cover h-20 w-20"
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
