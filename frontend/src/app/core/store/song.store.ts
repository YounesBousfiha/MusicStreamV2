import { SongService} from '../services/song.service';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {Song} from '../models/song.model';


type SongState = {
  songs: Song[];
  isLoading: boolean;
  error: string | null;
}

const initialState: SongState = {
  songs: [],
  isLoading: false,
  error: null,
}

export const SongStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),

  withMethods((store, songService = inject(SongService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true})),
        switchMap(() =>
          songService.getAll().pipe(
            tapResponse({
              next: (songs) => patchState(store, { songs, isLoading: false}),
              error: (err: any) => patchState( store, { isLoading: false, error: 'Failed to load songs'})
            })
          )
        )
      )
    )
    })),

    withHooks({
      onInit(store) {
        store.loadAll();
      }
    })
)
