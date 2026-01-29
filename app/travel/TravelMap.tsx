"use client";

import { useState, useEffect, useRef } from "react";
import Map, { NavigationControl, MapRef, Source, Layer, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import Image from "next/image";
import locations from "@/src/data/locations.json"; 
import type { FeatureCollection } from 'geojson';
import { CircleLayer, SymbolLayer } from "mapbox-gl";

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Layer Styles
const clusterLayer: CircleLayer = {
  id: 'clusters',
  type: 'circle',
  filter: ['has', 'point_count'],
  paint: {
    'circle-color': ['step', ['get', 'point_count'], '#51bbd6', 10, '#f1f075', 50, '#f28cb1'],
    'circle-radius': ['step', ['get', 'point_count'], 20, 100, 30, 750, 40]
  }
};

const clusterCountLayer: SymbolLayer = {
  id: 'cluster-count',
  type: 'symbol',
  filter: ['has', 'point_count'],
  layout: {
    'text-field': '{point_count_abbreviated}',
    'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
    'text-size': 12
  }
};

const unclusteredPointLayer: CircleLayer = {
  id: 'unclustered-point',
  type: 'circle',
  filter: ['!', ['has', 'point_count']],
  paint: {
    'circle-color': '#ffc107',
    'circle-radius': 6,
    'circle-stroke-width': 1,
    'circle-stroke-color': '#fff'
  }
};

interface TravelMapProps {
  highlightedLocation?: any | null;
}

export default function TravelMap({ highlightedLocation }: TravelMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const [viewState, setViewState] = useState({
    longitude: -20,
    latitude: 20,
    zoom: 1.5,
  });

  useEffect(() => {
    if (highlightedLocation && mapRef.current) {
      setSelectedLocation(highlightedLocation);
      mapRef.current.flyTo({
        center: [
          highlightedLocation.geometry.coordinates[0],
          highlightedLocation.geometry.coordinates[1]
        ],
        zoom: 10,
        duration: 2000
      });
    }
  }, [highlightedLocation]);

  const onClick = (event: any) => {
    if(!event.features || event.features.length === 0) return;

    const feature = event.features[0];
    const clusterId = feature.properties.cluster_id;

    if (clusterId) {
      const mapboxSource = mapRef.current?.getSource('locations') as any;
      mapboxSource.getClusterExpansionZoom(clusterId, (err: any, zoom: number) => {
        if (err) return;
        mapRef.current?.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500
        });
      });
      return;
    }

    setSelectedLocation({
        geometry: feature.geometry,
        properties: feature.properties
    });
  };

  if (!MAPBOX_TOKEN) return null;

  return (
    <section className="relative w-full h-[60vh] md:h-[70vh] rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0b1020]">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        interactiveLayerIds={['clusters', 'unclustered-point']}
        onClick={onClick}
      >
        <NavigationControl position="bottom-right" />

        <Source
          id="locations"
          type="geojson"
          data={locations as FeatureCollection}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>

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
                {/* --- OPTIMIZATION 2: POPUP IMAGE --- */}
                <Image 
                  src={selectedLocation.properties.src} 
                  alt={selectedLocation.properties.name}
                  fill
                  className="object-cover"
                  sizes="200px" // Tells Next.js this is a tiny image
                  // unoptimized <-- REMOVED
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