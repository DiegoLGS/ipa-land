import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;

  logUser(): void {
    this.isLoggedIn = true;
    console.log("El usuario se logeó");
  }
  
  logout(): void {
    this.isLoggedIn = false;
    console.log("El usuario se deslogeó");
  }
  
  isUserLoggedIn(): boolean {
    console.log("El usuario está logeado");
    return this.isLoggedIn;
  }
}