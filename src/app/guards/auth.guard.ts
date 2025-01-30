import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return true
  const authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isUserLoggedIn()) {
    console.log("Usuario no autenticado, redirigiendo al login.");
    router.navigate(['/login']);

    return false;
  }

  return true;
};
