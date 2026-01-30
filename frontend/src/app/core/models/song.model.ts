export interface Song {
  id: number;
  title: string;
  artist: string;
  songUrl: string;
  coverUrl?: string | null;
  duration: number;
  createdAt: string;
}
