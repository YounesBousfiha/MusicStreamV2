import {patchState, signalStore, withMethods, withState} from '@ngrx/signals';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';
import {Router} from '@angular/router';
import {rxMethod} from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import {LoginRequest, RegisterRequest} from '../models/auth.models';
import {pipe, switchMap, tap} from 'rxjs';
import {ToastService} from '../services/toast.service';

type AuthState = {
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}


export const AuthStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),

  withMethods((store, authService = inject(Auth), toast = inject(ToastService) ,router = inject(Router)) => ({

      login:rxMethod<LoginRequest>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null})),
          switchMap((credentials) => authService.login(credentials)
            .pipe(
              tapResponse({
                next: res => {
                  const { token, ...user} = res;
                  patchState(store, {user, isAuthenticated: true, isLoading: false, error: null});

                  localStorage.setItem('token', token);
                  localStorage.setItem('user', JSON.stringify(user));

                  toast.show('Welcome Back', 'success');
                  router.navigate(['/home']);
                },
                error: (err: any) => {
                  patchState(store, {
                    isLoading: false,
                    error: 'Email or password incorrect'
                  });
                  toast.show(err.error?.detail ?? 'Email or Password incorrect', 'error');
                }
              })
            ))
        )
      ),

      register: rxMethod<RegisterRequest>(
        pipe(
          tap(() => patchState(store, { isLoading: true, error: null})),
          switchMap((data) => authService.register(data)
            .pipe(
              tapResponse({
                next: (res) => {
                  patchState(store, {isAuthenticated: false, isLoading: false, error: null});
                  toast.show(res?.message ?? 'Registration Successfully', 'success');
                  router.navigate(['/auth/login']);
                },
                error: (err: any) => {
                  patchState(store, { isLoading: false, error: 'Registration failed'})
                  const errorMsg = err.error?.detail || 'Registration Failed. Try again !';

                  toast.show(errorMsg, 'error');
                }
              })
            )
          )
        )
      ),

    logout: () => {
        localStorage.removeItem('token')
      patchState(store, {
        user: null,
        isAuthenticated: false,
        error: null
      });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.navigate(['/auth/login']);
    }


    }))
);
