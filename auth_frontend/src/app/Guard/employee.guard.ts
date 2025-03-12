import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../Service/user.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const employeeGuard: CanActivateFn = (route, state) => {
const authService = inject(UserService);  
  const router = inject(Router);  

  return authService.currentUser$.pipe(
    map(user => {
      if (user && user.roles && (user.roles.includes('EMPLOYEE') || user.roles.includes('ADMIN')))  {
        return true;  
      } else {
        router.navigate(['/login']);  
        return false;  
      }
    })
  );};
