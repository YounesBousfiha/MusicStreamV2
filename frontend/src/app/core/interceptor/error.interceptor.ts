import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastService} from '../services/toast.service';
import {catchError, throwError} from 'rxjs';
import {getErrorMessages} from '../constants/http-errors';
import { Router } from "@angular/router";

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);

  return next(req).pipe(
    catchError((error) => {

      const message = getErrorMessages(error);

      toastService.show(message, 'error');

      if(error.status === 401) {
        inject(Router).navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  )
}
