import {Component, inject, OnInit} from '@angular/core';
import {SongStore} from '../../../core/store/song.store';
import { environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-songs-list',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './songs-list.html',
  styleUrl: './songs-list.css',
})
export class SongsList implements OnInit {

  readonly songStore = inject(SongStore);

  ngOnInit() {
    this.songStore.loadAll();
  }

  onDelete(id: number) {
    if(confirm('Are you sure you want to delete this track? This action cannot be undone.')) {
      this.songStore.deleteSong(id);
    }
  }
}
