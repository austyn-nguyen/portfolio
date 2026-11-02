"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Map, { NavigationControl, Source, Layer, Popup, type MapRef, type MapMouseEvent } from "react-map-gl/mapbox";
import type { CircleLayer, SymbolLayer, GeoJSONSource } from "mapbox-gl";
import type { FeatureCollection, Point } from "geojson";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";
import { photos, hasCoordinates, photoDate, photoDescription, type TravelPhoto } from "@/src/data/travel";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
const mapPhotos = photos.filter(hasCoordinates);
const mapData: FeatureCollection<Point, TravelPhoto["properties"]> = { type: "FeatureCollection", features: mapPhotos };
const clusterLayer: CircleLayer = {
  id: "clusters", type: "circle", source: "locations", filter: ["has", "point_count"],
  paint: { "circle-color": "#d6b558", "circle-radius": ["step", ["get", "point_count"], 19, 20, 25, 100, 32], "circle-stroke-width": 2, "circle-stroke-color": "#75570f" },
};
const clusterCountLayer: SymbolLayer = {
  id: "cluster-count", type: "symbol", source: "locations", filter: ["has", "point_count"],
  layout: { "text-field": "{point_count_abbreviated}", "text-size": 13 }, paint: { "text-color": "#263a35" },
};
const pointLayer: CircleLayer = {
  id: "unclustered-point", type: "circle", source: "locations", filter: ["!", ["has", "point_count"]],
  paint: { "circle-color": "#d6b558", "circle-radius": 7, "circle-stroke-width": 2, "circle-stroke-color": "#75570f" },
};
function subscribeTheme(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
function getTheme() { return document.documentElement.classList.contains("dark"); }
function getServerTheme() { return false; }

export default function TravelMap({ highlightedLocation, onLocationSelect }: {
  highlightedLocation: TravelPhoto | null; onLocationSelect: (photo: TravelPhoto | null) => void;
}) {
  const map = useRef<MapRef>(null);
  const dark = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!ready || !highlightedLocation || !hasCoordinates(highlightedLocation)) return;
    map.current?.flyTo({ center: highlightedLocation.geometry.coordinates, zoom: 12,
      duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 1100 });
  }, [highlightedLocation, ready]);

  const onClick = (event: MapMouseEvent) => {
    const feature = event.features?.[0];
    if (!feature || feature.geometry.type !== "Point") return;
    const center = feature.geometry.coordinates as [number, number];
    if (feature.properties?.cluster_id !== undefined) {
      try {
        const source = map.current?.getSource("locations") as GeoJSONSource | undefined;
        source?.getClusterExpansionZoom(feature.properties.cluster_id, (error, zoom) => {
          if (!error && zoom !== undefined && zoom !== null) map.current?.easeTo({ center, zoom,
            duration: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 450 });
        });
      } catch { /* A style change may replace the source during a click. */ }
    } else {
      onLocationSelect(mapPhotos.find(photo => photo.properties.src === feature.properties?.src) || null);
    }
  };

  if (!MAPBOX_TOKEN || failed) return <div className="food-map-status" role="status">The map is unavailable right now. All photos are still in the diary above.</div>;
  return <div className="food-map-canvas">
    {!ready && <div className="food-map-status food-map-loading" role="status">Unfolding the map…</div>}
    <Map ref={map} initialViewState={{ longitude: -20, latitude: 20, zoom: 1.5 }}
      mapStyle={`mapbox://styles/mapbox/${dark ? "dark" : "light"}-v11`} mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }} onLoad={() => setReady(true)}
      onError={() => setFailed(true)} onClick={onClick} interactiveLayerIds={["clusters", "unclustered-point"]}>
      <NavigationControl position="bottom-right" showCompass={false} />
      <Source id="locations" type="geojson" data={mapData} cluster clusterMaxZoom={14} clusterRadius={45}>
        <Layer {...clusterLayer} /><Layer {...clusterCountLayer} /><Layer {...pointLayer} />
      </Source>
      {highlightedLocation && hasCoordinates(highlightedLocation) && <Popup longitude={highlightedLocation.geometry.coordinates[0]}
        latitude={highlightedLocation.geometry.coordinates[1]} anchor="bottom" onClose={() => onLocationSelect(null)} closeOnClick={false} maxWidth="240px" className="food-map-popup">
        <Image src={highlightedLocation.properties.src} alt={photoDescription(highlightedLocation)} width={220} height={165} sizes="220px" />
        <p>{photoDate(highlightedLocation)}</p>
      </Popup>}
    </Map>
    <p className="food-map-hint">Select a cluster to zoom in, or a dot to see a photo.</p>
  </div>;
}
