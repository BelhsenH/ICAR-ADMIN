import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateChildFn, CanActivateFn, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from "../auth/authentication.service";
import {of, switchMap} from "rxjs";
import {LOGIN_BASE_URL} from "../../shared/constants/urls.constant";

export const AuthenticationGuard: CanActivateFn | CanActivateChildFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router: Router = inject(Router);
  return inject(AuthenticationService).isAuthenticated$.pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate([LOGIN_BASE_URL]);
        return of(false);
      }
      return of(true);
    })
  );
}
