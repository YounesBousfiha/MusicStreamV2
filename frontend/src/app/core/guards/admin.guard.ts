import { CanActivateFn, Router } from '@angular/router'
import {inject} from '@angular/core';
import {AuthStore} from '../store/auth.store';
export const adminGuard: CanActivateFn = (route, state) => {

  const store = inject(AuthStore);
  const router = inject(Router);

  if(store.isAuthenticated() && store.user()?.role === 'ADMIN') {
    return true;
  }

  return router.createUrlTree(['/home']);
}
