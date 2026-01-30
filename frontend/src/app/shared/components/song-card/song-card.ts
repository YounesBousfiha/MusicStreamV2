import {Component, Input} from '@angular/core';
import {Song} from '../../../core/models/song.model';
import {ImgUrlPipe} from '../../../core/pipes/img-url-pipe';

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
}
