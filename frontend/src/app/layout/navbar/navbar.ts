import {Component, computed, inject, signal} from '@angular/core';
import {AuthStore} from '../../core/store/auth.store';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  authStore = inject(AuthStore);

  isDropdownOpen = signal(false);
  readonly isAdmin = computed(() => this.authStore.user()?.role === 'ADMIN');


  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  logout() {
    this.authStore.logout();
    this.isDropdownOpen.set(false);
  }
}
