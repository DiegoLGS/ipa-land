import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  constructor(private http: HttpClient ) { }

  getBeers() {
    return this.http.get("https://ipaland-api.onrender.com/beers");
  }
}
