import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(UserService);  // Injecter AuthService
  const router = inject(Router);  // Injecter Router

  return authService.currentUser$.pipe(
    map(user => {
      // Vérifie si l'utilisateur est authentifié et a le rôle 'ADMIN'
      if (user && user.roles && user.roles.includes('ADMIN')) {
        return true;  // L'utilisateur peut accéder à la route
      } else {
        router.navigate(['/login']);  // Rediriger si l'utilisateur n'est pas admin
        return false;  // L'accès est refusé
      }
    })
  );
};
