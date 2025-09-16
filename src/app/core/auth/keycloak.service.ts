import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {StorageKeys} from "../config/app.config";
import {map} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LocalStorageService} from "../../shared/service/storage/local-storage.service";
// @ts-ignore
import Keycloak from "keycloak-js";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService implements OnDestroy {

  private keycloakLogoutUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/logout`;

  private keycloak!: Keycloak;
  private keycloakSubject = new BehaviorSubject<Keycloak>(this.keycloak);
  private keycloakIntervalId: any;

  constructor(
    private http: HttpClient,
    private storageService: LocalStorageService
  ) {
  }

  async initKeycloak(config: any) {
    try {
      this.keycloak = new Keycloak(config);
      await this.keycloak.init({checkLoginIframe: false}).then(() => console.log('Keycloak initialized'));
      this.keycloakSubject.next(this.keycloak);
      return true;
    } catch (err) {
      console.error('Keycloak initialization error:', err);
      return Promise.reject(err);
    }
  }

  ngOnDestroy(): void {
    if (this.keycloakIntervalId)
      clearInterval(this.keycloakIntervalId);
  }

  get token$(): Observable<string | undefined> {
    return this.keycloakSubject.asObservable().pipe(map((kc) => kc?.token));
  }

  get isAuthenticated$(): Observable<boolean> {
    return this.keycloakSubject.asObservable().pipe(map(kc => !!(kc?.authenticated)));
  }

  setKeycloakAuth(accessToken: string, refreshToken: string) {
    this.keycloak.token = accessToken;
    this.keycloak.refreshToken = refreshToken;
    this.keycloak.authenticated = true;
    this.keycloakSubject.next(this.keycloak);
    this.storageService.saveData(StorageKeys.AUTH_REFRESH_TOKEN, refreshToken);
    if (this.keycloakIntervalId) return;
    this.keycloakIntervalId = setInterval(async () => {
      try {
        const refreshed: boolean = await this.keycloak.updateToken(10 * 60); // 10 minutes in seconds
        if (refreshed) {
          this.keycloakSubject.next(this.keycloak);
          this.storageService.saveData(StorageKeys.AUTH_REFRESH_TOKEN, this.keycloak.refreshToken);
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
      }
    }, 10 * 60 * 1000); // 10 minutes in milliseconds
  }

  clearKeycloakAuth() {
    if (this.keycloak.refreshToken) this.endKeycloakSession();
    this.keycloak.clearToken();
    this.keycloak.authenticated = false;
    this.keycloakSubject.next(this.keycloak);
    this.storageService.removeData(StorageKeys.AUTH_REFRESH_TOKEN);
    if (this.keycloakIntervalId) {
      clearInterval(this.keycloakIntervalId);
      this.keycloakIntervalId = null;
    }
  }

  endKeycloakSession(refreshToken?: string) {
    const headers: HttpHeaders = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body: URLSearchParams = new URLSearchParams();
    body.set('client_id', environment.keycloak.client_id);
    body.set('grant_type', 'refresh_token');
    body.set('refresh_token', refreshToken ?? this.keycloak.refreshToken);
    this.http.post<any>(this.keycloakLogoutUrl, body, {observe: 'response', headers: headers}).subscribe();
  }

}
