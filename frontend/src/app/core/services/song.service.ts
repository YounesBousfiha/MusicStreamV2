import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Observable} from 'rxjs';
import {Song} from '../models/song.model';

@Injectable({
  providedIn: 'root',
})
export class SongService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/songs`;

    getAll(): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.apiUrl}`);
    }

    save() {}

    deleteSong() {}

    updateSong() {}

}
