import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthResponse, LoginRequest, RegisterRequest, RegisterResponse} from '../models/auth.models';
import { environment} from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private http = inject(HttpClient);



  login(request: LoginRequest) {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, request)
  }

  register(request: RegisterRequest) {
    return this.http.post<RegisterResponse>(`${environment.apiUrl}/auth/register`, request)
  }
}
