import {Component, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {SongStore} from '../../../core/store/song.store';

@Component({
  selector: 'app-song-upload',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './song-upload.html',
  styleUrl: './song-upload.css',
})
export class SongUpload {
    private fb = inject(FormBuilder);
    readonly songStore = inject(SongStore);

    imagePreview = signal<string | null>(null);

    selectedCoverFile: File | null = null;
    selectedSongFile: File | null = null;

    uploadForm = this.fb.group({
      title: ['', [Validators.required]],
      artist: ['', Validators.required]
    });

    onCoverSelected(event: any) {
      const file = event.target.files[0];
      if(file) {
        this.selectedCoverFile = file;


        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview.set(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }

    onSongSelected(event: any) {
      const file = event.target.files[0];
      if(file) {
        this.selectedSongFile = file;
      }
    }

    onSubmit() {
      if(this.uploadForm.invalid || !this.selectedCoverFile || !this.selectedSongFile) {
        this.uploadForm.markAllAsTouched();
        return;
      }

      const formData = new FormData();

      formData.append('title', this.uploadForm.get('title')?.value!);
      formData.append('artist', this.uploadForm.get('artist')?.value!);
      formData.append('coverFile', this.selectedCoverFile);
      formData.append('songFile', this.selectedSongFile);

      this.songStore.addSong(formData);
    }
}
