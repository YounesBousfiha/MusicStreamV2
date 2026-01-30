import {Component, Input} from '@angular/core';
import {Song} from '../../../core/models/song.model';

@Component({
  selector: 'app-song-card',
  imports: [],
  templateUrl: './song-card.html',
  styleUrl: './song-card.css',
})
export class SongCard {
  @Input({ required: true}) data!: Song;
}
