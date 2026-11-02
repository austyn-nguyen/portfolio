import locations from "./locations.json";

export interface TravelPhoto {
  type: "Feature";
  geometry: { type: "Point"; coordinates: [number, number] } | null;
  properties: {
    src: string;
    name: string;
    date: string;
    width?: number;
    height?: number;
    caption?: string;
    dropboxId?: string;
    dropboxRev?: string;
  };
}

export const photos = [...locations.features as TravelPhoto[]].sort(
  (a, b) => Date.parse(b.properties.date) - Date.parse(a.properties.date),
);

// Use UTC consistently so a photo never moves between months during hydration.
export function photoDate(photo: TravelPhoto, monthOnly = false) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "long", ...(monthOnly ? {} : { day: "numeric" }), timeZone: "UTC",
  }).format(new Date(photo.properties.date));
}

export function hasCoordinates(photo: TravelPhoto): photo is TravelPhoto & { geometry: NonNullable<TravelPhoto["geometry"]> } {
  const coordinates = photo.geometry?.coordinates;
  return !!coordinates && coordinates.length === 2 && coordinates.every(Number.isFinite)
    && Math.abs(coordinates[0]) <= 180 && Math.abs(coordinates[1]) <= 90;
}

export function photoDescription(photo: TravelPhoto) {
  return photo.properties.caption || `Food and adventures · ${photoDate(photo)}`;
}
