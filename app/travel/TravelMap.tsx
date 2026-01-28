"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Map, { Marker, Popup, NavigationControl, MapRef } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import locations from "@/src/data/locations.json"; 

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Interface for the prop we are about to add
interface TravelMapProps {
  highlightedLocation?: any | null; // Received from parent
}

export default function TravelMap({ highlightedLocation }: TravelMapProps) {
  const mapRef = useRef<MapRef>(null); // Reference to control the map programmatically
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [viewState, setViewState] = useState({
    longitude: -20,
    latitude: 20,
    zoom: 1.8,
  });

  // UX Feature: Listen for changes from the Gallery
  useEffect(() => {
    if (highlightedLocation && mapRef.current) {
      // 1. Update internal state to show the popup immediately
      setSelectedLocation(highlightedLocation);

      // 2. Smoothly fly the map to the new location
      mapRef.current.flyTo({
        center: [
          highlightedLocation.geometry.coordinates[0],
          highlightedLocation.geometry.coordinates[1]
        ],
        zoom: 5, // Zoom in closer for context
        duration: 2000, // Slow, cinematic flight
        essential: true
      });
    }
  }, [highlightedLocation]);

  const markers = useMemo(() => locations.features.map((location, index) => (
    <Marker
      key={index}
      longitude={location.geometry.coordinates[0]}
      latitude={location.geometry.coordinates[1]}
      anchor="bottom"
      onClick={(e) => {
        e.originalEvent.stopPropagation();
        setSelectedLocation(location);
        // Manual clicks just pan normally
        mapRef.current?.flyTo({
            center: [location.geometry.coordinates[0], location.geometry.coordinates[1]],
            zoom: 4,
            duration: 1000
        });
      }}
    >
      <div className="cursor-pointer hover:scale-125 transition-transform duration-200 group relative">
        <span className="text-2xl drop-shadow-md filter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">📍</span>
      </div>
    </Marker>
  )), []);

  if (!MAPBOX_TOKEN) return null; // Or your error component

  return (
    <section className="relative w-full h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-[var(--foreground)]/10 bg-[#0b1020]">
      
      {/* Overlay Header */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md p-4 rounded-lg text-white border border-white/10 max-w-xs shadow-xl pointer-events-none select-none">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
            Austyn&apos;s Travel Log
        </h3>
        <p className="text-xs text-gray-300 mt-1">
          {locations.features.length} locations visited. <br/>
          <span className="opacity-70">Drag to pan, scroll to zoom.</span>
        </p>
      </div>

      <Map
        ref={mapRef} // Attach ref here
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11" 
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <NavigationControl position="bottom-right" />
        {markers}

        {selectedLocation && (
          <Popup
            longitude={selectedLocation.geometry.coordinates[0]}
            latitude={selectedLocation.geometry.coordinates[1]}
            anchor="top"
            onClose={() => setSelectedLocation(null)}
            closeOnClick={false}
            className="text-black z-50"
            maxWidth="300px"
          >
            <div className="flex flex-col gap-2 min-w-[200px]">
              <div className="relative w-full h-40 rounded-md overflow-hidden bg-gray-100">
                <Image 
                  src={selectedLocation.properties.src} 
                  alt={selectedLocation.properties.name}
                  fill
                  className="object-cover"
                  unoptimized // Keep this for Dropbox
                />
              </div>
              <div className="flex justify-between items-center px-1">
                 <p className="text-sm font-bold text-gray-800 truncate max-w-[160px]">
                    {selectedLocation.properties.name}
                 </p>
                 <p className="text-[10px] text-gray-500 font-mono">
                    {new Date(selectedLocation.properties.date).toLocaleDateString()}
                 </p>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </section>
  );
}