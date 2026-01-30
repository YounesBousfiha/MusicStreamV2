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
      return this.http.get<Song[]>(`${this.apiUrl}/all`);
    }

    create(songData: FormData): Observable<any> {
      return this.http.post(`${this.apiUrl}/create`, songData);
    }

    delete(id: number) {
      return this.http.delete(`${this.apiUrl}/${id}`);
    }

    update(id: number, songData: FormData) {
      return this.http.put(`${this.apiUrl}/${id}`, songData);
    }

}
