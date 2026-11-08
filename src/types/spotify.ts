export interface ListeningTrack {
  id: string;
  name: string;
  artists: string;
  album: string;
  artwork: string | null;
  url: string;
  explicit: boolean;
}

export interface ListeningData {
  status: "ready" | "empty" | "pending" | "unavailable";
  tracks: ListeningTrack[];
  profileUrl: string | null;
  updatedAt?: string;
}
