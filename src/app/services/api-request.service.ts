import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer } from '../classes/beer';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient ) { }

  getBeers(): Observable<Beer[]> {
    return this.http.get<Beer[]>("https://ipaland-api.onrender.com/beers");
  }
}
