import { Song } from "../models/song.model";
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';

type PlayerState = {
  isPlaying: boolean;
  currentSong: Song | null;
  volume: number;
  currentTime: number;
  duration: number;
}

const initialState: PlayerState = {
  isPlaying: false,
  currentSong: null,
  volume: 0.5,
  currentTime: 0,
  duration: 0
}

const audio = new Audio();

export const PlayerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store) => ({

    play(song: Song) {
      if(store.currentSong()?.id === song.id) {
        audio.play();
        patchState(store, { isPlaying: true});
        return;
      }

      audio.src = song.songUrl;
      audio.load();
      audio.play();

      patchState(store, {
        currentSong: song,
        isPlaying: true
      });
    },

    pause() {
      audio.pause();
      patchState(store, { isPlaying: false});
    },

    toggle() {
      if(store.isPlaying()) {
        this.pause();
      } else {
        if(store.currentSong()) {
          audio.play();
          patchState(store, { isPlaying: true});
        }
      }
    },

    setVolume(vol: number) {
      audio.volume = vol;
      patchState(store, { volume: vol});
    },
  }))
)
