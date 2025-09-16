import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";
import {LOGIN_BASE_URL} from "../constants/urls.constant";
import {KeycloakService} from "../../core/auth/keycloak.service";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  authJwtToken: string | undefined;

  constructor(
    private router: Router,
    private keycloakService: KeycloakService
  ) {
    this.keycloakService.token$.subscribe(token => this.authJwtToken = token);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authJwtToken) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${this.authJwtToken}`}
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigateByUrl(LOGIN_BASE_URL);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
