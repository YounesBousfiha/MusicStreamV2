import {Component, effect, inject, OnInit} from '@angular/core';
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
  readonly playerStore = inject(PlayerStore);

  ngOnInit() {
    if(this.songStore.songs().length === 0) {
      this.songStore.loadAll();
    }
  }

  constructor() {
    effect(() => {
      const songs = this.songStore.songs();
      if(songs.length > 0) {
        this.playerStore.setQueue(songs);
        console.log('Queue Updated:', songs.length);
      }
    });
  }

}
