import {Component, computed, inject, signal} from '@angular/core';
import {AuthStore} from '../../core/store/auth.store';
import {RouterLink} from '@angular/router';
import {SongStore} from '../../core/store/song.store';

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
  songStore = inject(SongStore);
  isDropdownOpen = signal(false);
  readonly isAdmin = computed(() => this.authStore.user()?.role === 'ADMIN');


  toggleDropdown() {
    this.isDropdownOpen.update(value => !value);
  }

  logout() {
    this.authStore.logout();
    this.isDropdownOpen.set(false);
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.songStore.updateFilter(query);
  }
}
