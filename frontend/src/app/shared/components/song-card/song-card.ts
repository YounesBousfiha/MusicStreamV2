import {Component, inject, Input} from '@angular/core';
import {Song} from '../../../core/models/song.model';
import {ImgUrlPipe} from '../../../core/pipes/img-url-pipe';
import {PlayerStore} from '../../../core/store/player.store';
import {Events} from '@ngrx/signals/events';

@Component({
  selector: 'app-song-card',
  imports: [
    ImgUrlPipe
  ],
  templateUrl: './song-card.html',
  styleUrl: './song-card.css',
})
export class SongCard {
  @Input({ required: true}) data!: Song;

  readonly playerStore = inject(PlayerStore);

  onPlay(event: Event) {
    event.stopPropagation();

    this.playerStore.play(this.data);
  }
}
