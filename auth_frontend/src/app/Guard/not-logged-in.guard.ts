import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const notLoggedInGuard: CanActivateFn = (route, state) => {
const authService = inject(UserService);  // Injecter AuthService
  const router = inject(Router);  // Injecter Router

  return authService.currentUser$.pipe(
    map(user => {
     
      if (user ) {
        router.navigate(['/success']);  

        return false;  
      } else {
        return true;  
      }
    })
  );};
