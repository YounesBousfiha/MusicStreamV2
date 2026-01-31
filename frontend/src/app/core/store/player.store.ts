import { Song } from "../models/song.model";
import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {environment} from '../../../environments/environment.development';

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

    seek(time: number) {
      audio.currentTime = time;
      patchState(store, { currentTime: time});
    },
    initAudioEvents() {
      audio.addEventListener('timeupdate', () => {
        patchState(store, { currentTime: audio.currentTime})
      });

      audio.addEventListener('loadedmetadata', () => {
        patchState(store, { duration: audio.duration});
      });

      audio.addEventListener('ended', () => {
        patchState(store, { isPlaying: false});
      });
    },
    play(song: Song) {
      if(store.currentSong()?.id === song.id) {
        audio.play();
        patchState(store, { isPlaying: true});
        return;
      }

      let streamUrl = song.songUrl;

      if(!streamUrl.startsWith('http')) {
        streamUrl = `${environment.apiUrl}/songs/file/${streamUrl}`
      }

      audio.src = streamUrl;
      audio.load();
      audio.play()
        .catch(err  => console.error('Audio Player Error:', err));

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
