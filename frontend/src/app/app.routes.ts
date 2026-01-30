import { Routes } from '@angular/router';
import {MainLayout} from './layout/main-layout/main-layout';
import {Home} from './features/home/home';
import {AuthLayout} from './layout/auth-layout/auth-layout';
import {Login} from './features/auth/login/login';
import {Register} from './features/auth/register/register';
import {authGuard} from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: Home
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: Login},
      { path: 'register', component: Register},
      { path: '', redirectTo: 'login', pathMatch: 'full'}
    ]
  }

  ];
