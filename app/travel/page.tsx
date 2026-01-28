"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import dynamic from "next/dynamic"; 
import TravelGallery from "./TravelGallery";

// Dynamic import for Map (No SSR)
const TravelMap = dynamic(() => import("./TravelMap"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-[70vh] rounded-xl bg-[#0b1020] animate-pulse flex items-center justify-center border border-white/10">
      <span className="text-white/50">Loading Map...</span>
    </div>
  ) 
});

export default function TravelPage() {
  // STATE LIFTED UP: This controls the map's focus
  const [focusLocation, setFocusLocation] = useState<any>(null);

  const handleLocationSelect = (location: any) => {
    // 1. Set the location data to pass to the map
    setFocusLocation(location);

    // 2. Smooth scroll up to the map section
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar page="travel" />
      </div>

      <main className="pt-28 container mx-auto px-4 max-w-7xl pb-20">
        <div className="flex flex-col gap-12">
          
          <div 
            id="hero" 
            className="text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)]">
              Travel <span className="text-[var(--accent)]">Map</span>
            </h1>
            <p className="text-[var(--muted)] max-w-2xl mx-auto text-lg md:text-xl">
              From local bites to global sights. Exploring the world through food and adventure!
            </p>
          </div>

          <div 
            id="map" 
            className="w-full animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200"
          >
             {/* Pass the focus state down to the map */}
             <TravelMap highlightedLocation={focusLocation} />
          </div>

          {/* Gallery Section replacing the placeholder */}
          <div id="gallery" className="min-h-[200px] pt-10">
             <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-[var(--foreground)]/10 pb-4">
               <div>
                  <h2 className="text-3xl font-bold text-[var(--foreground)]">Gallery</h2>
                  <p className="text-[var(--muted)] mt-2">
                    A visual timeline of my journeys.
                  </p>
               </div>
               <span className="text-sm text-[var(--accent)] font-mono hidden md:block">
                  Sorted by Date (Newest)
               </span>
             </div>
             
             {/* Pass the handler down to the gallery */}
             <TravelGallery onLocationSelect={handleLocationSelect} />
          </div>

          {/* Trips Placeholder (Optional: You can move this below Gallery if preferred) */}
          <div id="trips" className="min-h-[200px] pt-10 opacity-50">
             <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Trips Journals</h2>
             <div className="p-8 border border-[var(--foreground)]/10 rounded-xl text-center text-[var(--muted)] bg-[var(--foreground)]/5 text-sm">
                Detailed blog posts coming soon...
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}