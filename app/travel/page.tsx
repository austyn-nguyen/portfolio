"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ArrowDown, ChevronDown, MapPin, Utensils } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TravelGallery from "./TravelGallery";
import { photos, hasCoordinates, featuredPhoto, type TravelPhoto } from "@/src/data/travel";

const TravelMap = dynamic(() => import("./TravelMap"), {
  ssr: false, loading: () => <div className="food-map-status" role="status">Unfolding the map…</div>,
});
const coverPhotos = [
  featuredPhoto("id:7Rn7lAImlWMAAAAAAAAAJw", "A brunch spread with eggs, fruit, and a grilled wrap", 0),
  featuredPhoto("id:7Rn7lAImlWMAAAAAAAAAFw", "A scoop of pink ice cream in a cone", 1),
  featuredPhoto("id:7Rn7lAImlWMAAAAAAAAAIw", "A birthday cake topped with fresh berries", 2),
].filter(photo => photo !== null);

export default function TravelPage() {
  const [focusLocation, setFocusLocation] = useState<TravelPhoto | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const mapSection = useRef<HTMLElement>(null);
  const handleLocationSelect = (photo: TravelPhoto) => {
    setFocusLocation(photo);
    setMapOpen(true);
    // The section already exists, including while the map bundle is loading.
    requestAnimationFrame(() => mapSection.current?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start",
    }));
  };

  return <div className="food-page">
    <a className="skip-link" href="#gallery">Skip to photos</a>
    <div className="fixed top-0 left-0 w-full z-50"><Navbar page="travel" /></div>
    <main className="food-main">
      <section id="hero" className="food-hero" aria-labelledby="food-title">
        <div className="food-hero-copy">
          <span className="food-eyebrow"><Utensils size={17} aria-hidden="true" /> Austyn’s camera roll</span>
          <h1 id="food-title">Food &<br /><span>adventures.</span></h1>
          <p>What I ate. Where I went.</p>
          <a className="food-diary-link" href="#gallery">Open the photo diary <ArrowDown size={18} aria-hidden="true" /></a>
        </div>
        <div className="food-cover" aria-label="A few recent bites">
          {coverPhotos.map((photo, index) => <figure key={photo.src} className={`food-cover-photo food-cover-photo-${index + 1}`}>
            <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 639px) 45vw, 28vw" preload={index === 0} />
          </figure>)}
          <span className="food-cover-note">good food, good company</span>
        </div>
      </section>
      <section id="gallery" className="food-diary" aria-labelledby="diary-title">
        <header className="food-section-heading"><h2 id="diary-title">Photo diary</h2><span>{photos.length} photos · newest first</span></header>
        <TravelGallery onLocationSelect={handleLocationSelect} />
      </section>
      <section id="map" ref={mapSection} className="food-map-paper" aria-labelledby="map-title">
        <button className="food-map-toggle" type="button" aria-expanded={mapOpen} aria-controls="food-map-panel" onClick={() => setMapOpen(open => !open)}>
          <span><MapPin size={24} aria-hidden="true" /><span><span id="map-title" className="food-map-title">Places on the menu</span><span className="food-map-subtitle">{photos.filter(hasCoordinates).length} geotagged photos</span></span></span>
          <span className="food-map-toggle-label">{mapOpen ? "Fold away" : "Unfold the map"}<ChevronDown size={20} aria-hidden="true" /></span>
        </button>
        <div id="food-map-panel" hidden={!mapOpen}>{mapOpen && <TravelMap highlightedLocation={focusLocation} onLocationSelect={setFocusLocation} />}</div>
      </section>
    </main>
    <Footer page="travel" />
  </div>;
}
