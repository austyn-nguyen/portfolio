"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import locations from "@/src/data/locations.json";

interface TravelGalleryProps {
  onLocationSelect: (location: any) => void;
}

export default function TravelGallery({ onLocationSelect }: TravelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // 1. Sort Logic: Newest Date First
  // Using metadata from the JSON file
  const sortedLocations = [...locations.features].sort((a, b) => {
    return new Date(b.properties.date).getTime() - new Date(a.properties.date).getTime();
  });

  const handleShowOnMap = () => {
    if (selectedImage) {
      // Trigger the parent function
      onLocationSelect(selectedImage);
      setSelectedImage(null); // Close the modal
    }
  };

  return (
    <div className="w-full">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sortedLocations.map((location, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-[var(--foreground)]/10 bg-[var(--foreground)]/5"
            onClick={() => setSelectedImage(location)}
          >
            <Image
              src={location.properties.src}
              alt={location.properties.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
              unoptimized
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
              <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                {location.properties.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div 
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
              {/* Main Image */}
              <div className="relative w-full h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedImage.properties.src}
                  alt={selectedImage.properties.name}
                  fill
                  className="object-contain bg-black"
                  unoptimized
                />
              </div>

              {/* Controls / Details */}
              <div className="mt-4 w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-[var(--background)]/80 backdrop-blur-md p-4 rounded-xl border border-[var(--foreground)]/10">
                <div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">
                    {selectedImage.properties.name}
                  </h3>
                  <p className="text-[var(--muted)] text-sm">
                    {new Date(selectedImage.properties.date).toLocaleDateString(undefined, {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </p>
                </div>

                {/* UX Feature: The "Connect" Button */}
                <button
                  onClick={handleShowOnMap}
                  className="px-6 py-2 bg-[var(--accent)] text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors shadow-lg shadow-yellow-500/20 flex items-center gap-2"
                >
                  <span>Show on Map</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-[-40px] right-0 text-white/70 hover:text-white"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}