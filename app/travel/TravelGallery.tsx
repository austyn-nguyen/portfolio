"use client";

import { useState, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import locations from "@/src/data/locations.json";

interface TravelGalleryProps {
  onLocationSelect: (location: any) => void;
}

const ITEMS_PER_PAGE = 24;

// --- OPTIMIZATION 1: MEMOIZED COMPONENT ---
// This prevents every single image from refreshing when you interact with the page
const GalleryItem = memo(({ location, onClick }: { location: any; onClick: () => void }) => (
  <div
    className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-[var(--foreground)]/10 bg-[var(--foreground)]/5"
    onClick={onClick}
  >
    <Image
      src={location.properties.src}
      alt={location.properties.name}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-110"
      sizes="(max-width: 768px) 50vw, 25vw" // Tells Next.js to make small thumbnails
      loading="lazy"
      // removed "unoptimized" so Next.js resizes it
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
      <p className="text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {location.properties.name}
      </p>
    </div>
  </div>
));

GalleryItem.displayName = "GalleryItem";

export default function TravelGallery({ onLocationSelect }: TravelGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const sortedLocations = [...locations.features].sort((a, b) => {
    return new Date(b.properties.date).getTime() - new Date(a.properties.date).getTime();
  });

  const visibleLocations = sortedLocations.slice(0, visibleCount);

  const handleShowOnMap = () => {
    if (selectedImage) {
      onLocationSelect(selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Grid Layout */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleLocations.map((location, idx) => (
          <GalleryItem
            key={`${location.properties.name}-${idx}`}
            location={location}
            onClick={() => setSelectedImage(location)}
          />
        ))}
      </div>

      {/* Load More Button */}
      {visibleCount < sortedLocations.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full font-semibold transition-all"
          >
            Load More Photos ({sortedLocations.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[60vh] md:h-[75vh] rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <Image
                  src={selectedImage.properties.src}
                  alt={selectedImage.properties.name}
                  fill
                  className="object-contain bg-black"
                  sizes="100vw"
                  // Removed unoptimized here too so it loads faster, 
                  // but kept high quality via automatic sizing
                />
              </div>

              <div className="mt-4 w-full flex flex-col md:flex-row justify-between items-center gap-4 bg-[#0b1020] p-4 rounded-xl border border-white/10">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedImage.properties.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {new Date(selectedImage.properties.date).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={handleShowOnMap}
                  className="px-6 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Show on Map
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}