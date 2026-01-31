import {Component, inject, OnInit} from '@angular/core';
import {SongCard} from '../../shared/components/song-card/song-card';
import {SongStore} from '../../core/store/song.store';
import {AuthStore} from '../../core/store/auth.store';
import {PlayerStore} from '../../core/store/player.store';

@Component({
  selector: 'app-home',
  imports: [
    SongCard
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit{
  readonly songStore = inject(SongStore);
  readonly  authStore = inject(AuthStore);
  readonly playerStore = inject(PlayerStore);
  ngOnInit() {
    if(this.songStore.songs().length === 0) {
      this.songStore.loadAll();
    }
  }

}
