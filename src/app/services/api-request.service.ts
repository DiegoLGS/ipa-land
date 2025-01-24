import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  createBeer(beer: Beer, securityWord: string) {
    const url = `${this.baseUrl}/beers`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${securityWord}`,
    });

    return this.http.post(url, beer,{ headers });
  }

  deleteBeer(id: string, securityWord: string) {
    const url = `${this.baseUrl}/beers/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${securityWord}`,
    });

    return this.http.delete(url, { headers });
  }

  login(username: string, password: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.baseUrl}/users`, {
      username,
      password,
    });
  }
}