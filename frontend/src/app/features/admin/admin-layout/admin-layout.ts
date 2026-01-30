import {Component, inject} from '@angular/core';
import {AuthStore} from '../../../core/store/auth.store';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  readonly authStore = inject(AuthStore);
}
