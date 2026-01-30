export interface Song {
  id: number;
  title: string;
  artist: string;
  audioUrl: string;
  coverUrl?: string | null;
  duration: number;
  createdAt: string;
}
