"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";

interface GalleryProps {
  imagesUrl: string;
  onToggle?: (isOpen: boolean) => void;
}

export default function Gallery({ imagesUrl, onToggle }: GalleryProps) {
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);

  const swipeConfidenceThreshold = 100;

  useEffect(() => {
    fetch(imagesUrl)
      .then((res) => res.json())
      .then((data) => setGalleryImages(data))
      .catch(console.error);
  }, [imagesUrl]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex]);

  useEffect(() => {
    if (onToggle) {
      onToggle(selectedIndex !== null);
    }
  }, [selectedIndex, onToggle]);

  const paginate = (newDirection: 1 | -1) => {
    if (selectedIndex === null) return;
    setDirection(newDirection);
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      const next = prev + newDirection;
      if (next < 0) return galleryImages.length - 1;
      if (next >= galleryImages.length) return 0;
      return next;
    });
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <>
      <section id="gallery" className="py-10">
        <h2 className="text-5xl font-bold text-center mb-8">
          Photo <span className="text-[var(--accent)]">Gallery</span>
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              onClick={() => {
                setDirection(1);
                setSelectedIndex(idx);
              }}
              className="cursor-pointer"
            >
              <Image
                src={img}
                alt={`Gallery ${idx + 1}`}
                width={400}
                height={300}
                className="rounded-lg shadow object-cover h-32 w-full"
              />
            </motion.div>
          ))}
        </div>
        <AnimatePresence initial={false} custom={direction}>
          {selectedIndex !== null && (
            <motion.div
              className="fixed inset-0 z-50 bg-[var(--background)]/80 backdrop-blur flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIndex(null)}
            >
              <motion.button
                className="absolute top-6 right-6 text-[var(--foreground)]/80 hover:text-[var(--foreground)] z-50 p-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedIndex(null);
                }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes size={40} />
              </motion.button>

              <div
                className="absolute left-0 top-0 w-1/4 h-full cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
              />
              <div
                className="absolute right-0 top-0 w-1/4 h-full cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
              />

              <motion.button
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/80 hover:text-[var(--foreground)] z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(-1);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowLeft size={36} />
              </motion.button>
              <motion.button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground)]/80 hover:text-[var(--foreground)] z-30"
                onClick={(e) => {
                  e.stopPropagation();
                  paginate(1);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaArrowRight size={36} />
              </motion.button>

              <motion.div
                className="relative z-20"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -swipeConfidenceThreshold) paginate(1);
                  if (info.offset.x > swipeConfidenceThreshold) paginate(-1);
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[selectedIndex]}
                  alt="Full image"
                  width={1600}
                  height={1000}
                  className="max-h-[85vh] w-auto rounded-xl shadow-2xl select-none"
                  draggable={false}
                />
                <div className="absolute -bottom-10 w-full text-center text-[var(--foreground)]/70 text-sm">
                  {selectedIndex + 1} / {galleryImages.length}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
