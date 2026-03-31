import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // If we are on the server, allow the initial pass-through to hydration
  if (isPlatformServer(platformId)) {
    return true;
  }

  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }

  // Redirect only if we are sure the user is not an admin on the client side
  router.navigate(['/login']);
  return false;
};
