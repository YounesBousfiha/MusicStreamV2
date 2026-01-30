import { Injectable, signal} from '@angular/core';
import {routes} from '../../app.routes';


export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}


@Injectable({
  providedIn: "root"
})
export class ToastService {
  readonly toasts = signal<Toast[]>([]);

  show(message: string, type: 'success' | 'error' | 'info' = 'info') {
    const id = Date.now();
    const newToast: Toast = { id, message, type}

    this.toasts.update(current => [...current, newToast]);

    setTimeout(() => this.remove(id), 3000);
  }

  remove(id: number) {
    this.toasts.update(current => current.filter(t => t.id !== id));
  }
}
