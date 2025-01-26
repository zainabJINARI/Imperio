import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { jwtDecode } from "jwt-decode";

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (token) {
    const decoded: any = jwtDecode(token);


    if (decoded && decoded.scope === 'ROLE_ADMIN') {
      return true; 
    }
  }

  router.navigateByUrl('/login')
  return false;
};
