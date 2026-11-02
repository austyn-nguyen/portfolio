"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, MapPin, Plus } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import PhotoDialog from "@/components/PhotoDialog";
import { photos, hasCoordinates, photoDate, photoDescription, type TravelPhoto } from "@/src/data/travel";

const PAGE_SIZE = 24;
const monthCounts = new Map<string, number>();
for (const photo of photos) {
  const key = photo.properties.date.slice(0, 7);
  monthCounts.set(key, (monthCounts.get(key) || 0) + 1);
}

export default function TravelGallery({ onLocationSelect }: { onLocationSelect: (photo: TravelPhoto) => void }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reduceMotion = useReducedMotion();
  const selected = selectedIndex === null ? null : photos[selectedIndex];
  const groups = new Map<string, TravelPhoto[]>();
  for (const photo of photos.slice(0, visibleCount)) {
    const key = photo.properties.date.slice(0, 7);
    groups.set(key, [...(groups.get(key) || []), photo]);
  }
  const previous = () => setSelectedIndex(index => index === null ? null : (index - 1 + photos.length) % photos.length);
  const next = () => setSelectedIndex(index => index === null ? null : (index + 1) % photos.length);

  return <>
    <div className="food-months">
      {[...groups].map(([key, group]) => <section className="food-month" key={key} aria-labelledby={`month-${key}`}>
        <motion.header className="food-month-label" initial={reduceMotion ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .5 }} transition={{ duration: .35 }}>
          <span aria-hidden="true">{key.slice(5)} / {key.slice(0, 4)}</span>
          <h3 id={`month-${key}`}>{photoDate(group[0], true)}</h3>
          <p>{monthCounts.get(key)} photos</p>
        </motion.header>
        <div className="food-photo-columns">
          {group.map(photo => <button type="button" className="food-photo" key={photo.properties.src}
            onClick={() => setSelectedIndex(photos.indexOf(photo))} aria-label={`Open photo: ${photoDescription(photo)}`}>
            <Image src={photo.properties.src} alt={photoDescription(photo)} width={photo.properties.width || 1024} height={photo.properties.height || 768}
              sizes="(max-width: 639px) 46vw, (max-width: 1023px) 44vw, 28vw" />
            <span className="food-photo-date">{photoDate(photo)}</span>
          </button>)}
        </div>
      </section>)}
    </div>
    {visibleCount < photos.length && <div className="food-load-more">
      <button type="button" onClick={() => setVisibleCount(count => count + PAGE_SIZE)}><Plus size={18} aria-hidden="true" /> More photos</button>
      <span aria-live="polite">Showing {Math.min(visibleCount, photos.length)} of {photos.length}</span>
    </div>}
    <PhotoDialog open={selected !== null} onClose={() => setSelectedIndex(null)} label="Food & adventures" onPrevious={previous} onNext={next}>
      {selected && <>
        <div className="photo-dialog-image food-viewer-image" onTouchStart={event => {
          const point = event.touches[0]; touch.current = { x: point.clientX, y: point.clientY };
        }} onTouchEnd={event => {
          if (!touch.current) return;
          const dx = event.changedTouches[0].clientX - touch.current.x;
          const dy = event.changedTouches[0].clientY - touch.current.y;
          if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) { if (dx > 0) previous(); else next(); }
          touch.current = null;
        }} onTouchCancel={() => { touch.current = null; }}>
          <Image src={selected.properties.src} alt={photoDescription(selected)} fill className="object-contain" sizes="(max-width: 767px) 95vw, 1100px" />
        </div>
        <div className="food-viewer-caption">
          <div aria-live="polite"><p>{photoDate(selected)}</p>{selected.properties.caption && <h3>{selected.properties.caption}</h3>}</div>
          {hasCoordinates(selected) && <button type="button" onClick={() => { onLocationSelect(selected); setSelectedIndex(null); }}><MapPin size={16} aria-hidden="true" /> Show on map</button>}
        </div>
        <div className="photo-dialog-pagination">
          <button type="button" onClick={previous} aria-label="Previous photo"><ArrowLeft size={18} aria-hidden="true" /> Previous</button>
          <span aria-live="polite">{(selectedIndex ?? 0) + 1} / {photos.length}</span>
          <button type="button" onClick={next} aria-label="Next photo">Next <ArrowRight size={18} aria-hidden="true" /></button>
        </div>
      </>}
    </PhotoDialog>
  </>;
}
