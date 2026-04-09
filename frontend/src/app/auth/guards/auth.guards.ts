import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../services/auth.service';

function redirectToLogin(stateUrl: string) {
  return inject(Router).createUrlTree(['/login'], {
    queryParams: { redirect: stateUrl }
  });
}

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const evaluate = () => authService.isAuthenticatedSnapshot() ? true : redirectToLogin(state.url);

  if (authService.isInitialized()) {
    return evaluate();
  }

  return authService.bootstrapSession().pipe(map(() => evaluate()));
};

export const guestOnlyGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const evaluate = () => authService.isAuthenticatedSnapshot()
    ? router.createUrlTree(['/workspace'])
    : true;

  if (authService.isInitialized()) {
    return evaluate();
  }

  return authService.bootstrapSession().pipe(map(() => evaluate()));
};

export const activeTenantGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const evaluate = () => {
    if (!authService.isAuthenticatedSnapshot()) {
      return router.createUrlTree(['/login']);
    }

    if (authService.isTenantSuspendedSnapshot()) {
      return router.createUrlTree(['/tenant-suspended']);
    }

    return true;
  };

  if (authService.isInitialized()) {
    return evaluate();
  }

  return authService.bootstrapSession().pipe(map(() => evaluate()));
};

export const permissionGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const permission = route.data?.['permission'] as string | undefined;
  const evaluate = () => {
    if (!authService.isAuthenticatedSnapshot()) {
      return redirectToLogin(state.url);
    }

    if (authService.isTenantSuspendedSnapshot()) {
      return router.createUrlTree(['/tenant-suspended']);
    }

    if (permission && !authService.hasPermission(permission)) {
      return router.createUrlTree(['/access-denied'], {
        queryParams: {
          permission,
          redirect: state.url,
        }
      });
    }

    return true;
  };

  if (authService.isInitialized()) {
    return evaluate();
  }

  return authService.bootstrapSession().pipe(map(() => evaluate()));
};
