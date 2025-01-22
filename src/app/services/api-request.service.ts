import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../classes/beer';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  private baseUrl = 'https://ipaland-api.onrender.com';

  constructor(private http: HttpClient) {}

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>(`${this.baseUrl}/beers`);
  }

  login(username: string, password: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.baseUrl}/users`, {
      username,
      password,
    });
  }
}