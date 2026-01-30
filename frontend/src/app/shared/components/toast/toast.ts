import {Component, inject} from '@angular/core';
import {NgClass} from '@angular/common';
import {ToastService} from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [
    NgClass
  ],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast {
    toastService = inject(ToastService);
}
