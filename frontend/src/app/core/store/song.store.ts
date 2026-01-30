import { SongService} from '../services/song.service';
import {patchState, signalStore, withHooks, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import {pipe, switchMap, tap} from 'rxjs';
import {tapResponse} from '@ngrx/operators';
import {Song} from '../models/song.model';
import {ToastService} from '../services/toast.service';
import {routes} from '../../app.routes';
import {Router} from '@angular/router';
import {removeEntity} from '@ngrx/signals/entities';


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

  withMethods((store, router = inject(Router) ,songService = inject(SongService), toast = inject(ToastService)) => ({
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true})),
        switchMap(() =>
          songService.getAll().pipe(
            tap((data) => console.log('Data Received', data)),
            tapResponse({
              next: (songs) => patchState(store, { songs, isLoading: false}),
              error: (err: any) => patchState( store, { isLoading: false, error: 'Failed to load songs'})
            })
          )
        )
      )
    ),
    addSong: rxMethod<FormData>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null})),
        switchMap((songData) =>
          songService.create(songData).pipe(
            tapResponse({
              next: (newSong) => {

                patchState(store, { isLoading: false, songs: [...store.songs(), newSong]});

                toast.show('Track uploaded successfully', 'success');

                router.navigate(['/admin/songs']);

              },
              error: (err: any) => {
                const errorMsg = err.error?.detail || 'Something went wrong !';
                toast.show(errorMsg, 'error');
              }
            })
          )
        )
      )
    ),
    deleteSong: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null})),
        switchMap((id) =>
          songService.delete(id).pipe(
            tapResponse({
              next: () => {
                patchState(store,
                  {
                    songs: store.songs().filter(s => s.id !== id),
                    isLoading: false,
                    error: null
                  }
                );

                toast.show('the Song has Been Deleted', 'success');

                router.navigate(['/admin/songs']);
              },
              error: (err: any) => {
                const errorMsg = err.error?.detail || 'Something went wrong !';
                toast.show(errorMsg, 'error');
              }
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
