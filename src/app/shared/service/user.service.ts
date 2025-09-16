import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {IApiResponse} from '../models/api-response/api-response.model';
import {User} from "../models/user/user.model";
import {IPageableData} from "../models/utils/pageable-data.model";
import {DisableUserAccount} from "../models/api-request/user/activation/disable-user-account.model";
import {EnableUserAccount} from "../models/api-request/user/activation/enable-user-account.model";
import {NewUser} from "../models/api-request/user/new-user/new-user.model";
import {NewRelayPointAgentUser} from "../models/api-request/user/new-user/new-relay-point-agent-user.model";
import {NewAdminUser} from "../models/api-request/user/new-user/new-admin-user.model";
import {IdentityVerificationReview} from "../models/api-request/user/verification/identity-verification-review.model";
import {FilterUsers} from "../models/api-request/user/filter/filter-users.model";

type EntityType = HttpResponse<IApiResponse<User>>;
export type EntityPageResponseType = HttpResponse<IApiResponse<IPageableData<User>>>;
type Pageable = { page: number; size: number };

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private resourceUrl = BASE_URL + API_VERSION;

  public constructor(
    private http: HttpClient
  ) {
  }

  getAllUsers(pageable: Pageable): Observable<EntityPageResponseType> {
    const params: HttpParams = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());
    return this.http
      .get<IApiResponse<IPageableData<User>>>(`${this.resourceUrl}/users/`, {observe: 'response', params});
  }

  filterUsers(filterUsers: FilterUsers, pageable: Pageable): Observable<EntityPageResponseType> {
    const params: HttpParams = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());
    return this.http
      .post<IApiResponse<IPageableData<User>>>(`${this.resourceUrl}/users/filter/`, filterUsers, {
        observe: 'response',
        params
      });
  }

  getUserById(userID: string): Observable<EntityType> {
    return this.http
      .get<IApiResponse<User>>(`${this.resourceUrl}/users/${userID}`, {observe: 'response'});
  }

  enableUserAccount(enableUserAccount: EnableUserAccount): Observable<EntityType> {
    return this.http
      .post<IApiResponse<User>>(`${this.resourceUrl}/accounts/status`, enableUserAccount, {observe: 'response'});
  }

  disableUserAccount(disableUserAccount: DisableUserAccount): Observable<EntityType> {
    return this.http
      .post<IApiResponse<User>>(`${this.resourceUrl}/accounts/status`, disableUserAccount, {observe: 'response'});
  }

  addNewUser(newUser: NewUser): Observable<EntityType> {
    return this.http
      .post<IApiResponse<User>>(`${this.resourceUrl}/users/`, newUser, {observe: 'response'});
  }

  addNewRelayPointAgentUser(newRelayPointAgentUser: NewRelayPointAgentUser): Observable<EntityType> {
    return this.http
      .post<IApiResponse<User>>(`${this.resourceUrl}/users/relayPointsAgents/`, newRelayPointAgentUser, {observe: 'response'});
  }

  addNewAdminUser(newAdminUser: NewAdminUser): Observable<EntityType> {
    return this.http
      .post<IApiResponse<User>>(`${this.resourceUrl}/users/admins/`, newAdminUser, {observe: 'response'});
  }

  setIdentityVerificationReview(userID: string, identityVerificationReview: IdentityVerificationReview): Observable<HttpResponse<void>> {
    return this.http
      .put<void>(`${this.resourceUrl}/users/${userID}/review/identity`, identityVerificationReview, {observe: 'response'});
  }


}
