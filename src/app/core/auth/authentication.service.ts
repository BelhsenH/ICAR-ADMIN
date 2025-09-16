import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, from, lastValueFrom, Observable, of, switchMap, throwError} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {StorageKeys} from "../config/app.config";
import {catchError, map, tap} from "rxjs/operators";
import {KeycloakService} from "./keycloak.service";
import {JwtKeycloakTokenService} from "./jwt-keycloak-token.service";
import {IApiResponse} from 'src/app/shared/models/api-response/api-response.model';
import {AdminUser} from "../../shared/models/authentication/admin-user.model";
import {API_VERSION, BASE_URL} from 'src/app/shared/constants/microservices.urls.constatnt';
import {Role} from 'src/app/shared/models/authentication/role-enum.model';
import {LocalStorageService} from "../../shared/service/storage/local-storage.service";
import {KeycloakAuthResponse} from "../../shared/models/authentication/keycloak-auth-response.model";
import {LOGIN_BASE_URL} from "../../shared/constants/urls.constant";

type EntityResponseType = HttpResponse<IApiResponse<AdminUser>>;

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private resourceUrl = BASE_URL + API_VERSION;
  private keycloakLoginUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/token`;
  private AUTHORIZED_ROLE = Role.ADMIN.toString();

  private user: AdminUser | undefined;
  private useSubject = new BehaviorSubject<AdminUser | undefined>(undefined);

  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorageService: LocalStorageService,
    private keycloakService: KeycloakService,
    private jwtKeycloakTokenService: JwtKeycloakTokenService
  ) {
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.keycloakService.isAuthenticated$;
  }

  get isAuthenticated() {
    return lastValueFrom(this.keycloakService.isAuthenticated$);
  }

  get currentUser$(): Observable<AdminUser | undefined> {
    return this.useSubject.asObservable();
  }

  checkAtStarting(): Observable<boolean> {
    return from(this.checkStoredValues()).pipe(
      switchMap(storedRefreshToken => {
        if (!storedRefreshToken) return of(undefined);
        return this.validateRefreshToken(storedRefreshToken);
      }),
      switchMap((keycloakResponse: KeycloakAuthResponse | undefined) => {
        if (!keycloakResponse) return of(undefined);
        this.keycloakService.setKeycloakAuth(keycloakResponse.access_token, keycloakResponse.refresh_token);
        return this.http.get<IApiResponse<AdminUser>>(`${this.resourceUrl}/users/shortDetailsInformation/me`, {observe: 'response'}).pipe(
          map(response => (response.body!.data)),
          catchError(() => of(undefined))
        );
      }),
      switchMap((response: AdminUser | undefined) => {
        if (response) {
          this.updateCurrentUserInformation(response);
          return of(true);
        } else {
          this.keycloakService.clearKeycloakAuth();
          return of(false);
        }
      }),
      catchError(() => of(false))
    );
  }

  async logout() {
    this.user = undefined;
    this.useSubject.next(undefined);
    this.keycloakService.clearKeycloakAuth();
    await this.router.navigateByUrl(LOGIN_BASE_URL);
  }

  login(loginRequest: { email: string; password: string; }): Observable<EntityResponseType> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body: URLSearchParams = new URLSearchParams();
    body.set('client_id', environment.keycloak.client_id);
    body.set('username', loginRequest.email);
    body.set('password', loginRequest.password);
    body.set('grant_type', 'password');
    return this.http.post<KeycloakAuthResponse>(this.keycloakLoginUrl, body, {observe: 'response', headers})
      .pipe(
        catchError((error) => {
          return throwError(() => {
            return {source: 'keycloak', url: 'login', error};
          });
        }),
        switchMap((response) => {
          if (!response.body) return EMPTY;
          if (!this.jwtKeycloakTokenService.hasKeycloakRealmRole(response.body.access_token, this.AUTHORIZED_ROLE)) {
            this.keycloakService.endKeycloakSession(response.body.refresh_token);
            return throwError(() => {
              return {source: 'keycloak', url: 'login', status: 401, message: 'role_not_authorized'};
            });
          }
          this.keycloakService.setKeycloakAuth(response.body.access_token, response.body.refresh_token);
          return this.http.get<IApiResponse<AdminUser>>(`${this.resourceUrl}/users/shortDetailsInformation/me`, {observe: 'response'}).pipe(
            catchError((error) => {
              this.keycloakService.clearKeycloakAuth();
              return throwError(() => {
                return {source: 'backend', url: 'user_information', error};
              });
            }),
            tap(async (response: EntityResponseType) => {
              if (response.body) {
                this.updateCurrentUserInformation(response.body.data);
              }
            })
          );
        }),
        catchError((error) => {
          console.error(error);
          return throwError(() => error);
        }),
      );
  }

  getCurrentUserProfileInformation(): Observable<EntityResponseType> {
    return this.http
      .get<IApiResponse<AdminUser>>(`${this.resourceUrl}/users/me`, {observe: 'response'}).pipe(
        tap(async (response: EntityResponseType) => {
          if (response.body) {
            this.updateCurrentUserInformation(response.body.data);
          }
        })
      );
  }

  forceFetchCurrentUserInformation() {
    this.http.get<IApiResponse<AdminUser>>(`${this.resourceUrl}/users/shortDetailsInformation/me`, {observe: 'response'})
      .subscribe((response) => this.updateCurrentUserInformation(response.body!.data));
  }

  updateCurrentUserInformation(user: AdminUser) {
    this.user = {
      ...this.user,
      ...user
    };
    this.useSubject.next(this.user);
  }

  async checkStoredValues(): Promise<string | undefined> {
    const storedRefreshToken: string | undefined = this.localStorageService.getData(StorageKeys.AUTH_REFRESH_TOKEN);
    return storedRefreshToken || undefined;
  }

  private validateRefreshToken(refreshToken: string): Observable<KeycloakAuthResponse | undefined> {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body: URLSearchParams = new URLSearchParams();
    body.set('client_id', environment.keycloak.client_id);
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken);
    return this.http.post<any>(this.keycloakLoginUrl, body, {observe: 'response', headers: headers}).pipe(
      map(response => {
        const keycloakAuthResponse: KeycloakAuthResponse = response.body!;
        if (!this.jwtKeycloakTokenService.hasKeycloakRealmRole(keycloakAuthResponse.access_token, this.AUTHORIZED_ROLE)) {
          this.keycloakService.endKeycloakSession(keycloakAuthResponse.refresh_token);
          return undefined;
        }
        return keycloakAuthResponse;
      }),
      catchError(() => {
        this.localStorageService.removeData(StorageKeys.AUTH_REFRESH_TOKEN);
        return of(undefined);
      })
    );
  }

}
