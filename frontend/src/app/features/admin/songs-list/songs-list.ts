import {Component, inject, OnInit, signal} from '@angular/core';
import {SongStore} from '../../../core/store/song.store';
import { environment} from '../../../../environments/environment.development';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {DatePipe} from '@angular/common';
import {ImgUrlPipe} from '../../../core/pipes/img-url-pipe';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {single} from 'rxjs';
import {Song} from '../../../core/models/song.model';
import {Events} from '@ngrx/signals/events';

@Component({
  selector: 'app-songs-list',
  imports: [
    RouterLink,
    DatePipe,
    ImgUrlPipe,
    ReactiveFormsModule
  ],
  templateUrl: './songs-list.html',
  styleUrl: './songs-list.css',
})
export class SongsList implements OnInit {

  readonly songStore = inject(SongStore);
  private fb = inject(FormBuilder);


  editingSong = signal<Song | null>(null);

  editForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    artist: ['', Validators.required]
  });

  newCover: File | null = null;

  onEdit(song: Song) {
    this.editingSong.set(song);
    this.editForm.patchValue({
      title: song.title,
      artist: song.artist
    });
    this.newCover = null;
  }

  closeEdit() {
    this.editingSong.set(null);
  }

  onFileChange(event: any, type: 'cover' | 'song') {
    const file = event.target.files[0];
    if(file) {
      if (type === 'cover') this.newCover = file;
    }
  }

  onUpdateSubmit() {
    if ( this.editForm.invalid) return;
    const  currentSong = this.editingSong();
    if(!currentSong) return;

    const id = currentSong.id;
    const formData = new FormData();

    formData.append('title', this.editForm.get('title')?.value);
    formData.append('artist', this.editForm.get('artist')?.value);

    if(this.newCover) formData.append('coverFile', this.newCover);

    this.songStore.updateSong({ id, data: formData});
    this.closeEdit();

  }

  ngOnInit() {
    this.songStore.loadAll();
  }

  onDelete(id: number) {
    if(confirm('Are you sure you want to delete this track? This action cannot be undone.')) {
      this.songStore.deleteSong(id);
    }
  }
}
