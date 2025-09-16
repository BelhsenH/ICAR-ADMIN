import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

import {ICarUsers} from "../../models/icar-users/icar-users.model";
import {IPageableData} from "../../models/utils/pageable-data.model";
import {IApiResponse} from "../../models/api-response/api-response.model";
import {API_VERSION, BASE_URL} from "../../constants/microservices.urls.constatnt";
import {User} from "../../models/user/user.model";
import {IRepairUsers} from "../../models/irepair-users/irepair.users.model";

type EntityType = HttpResponse<IRepairUsers>;
export type EntityPageResponseType = HttpResponse<IRepairUsers[]>;
type Pageable = { page: number; size: number };

@Injectable({
  providedIn: 'root',
})
export class IRepairUsersService {

  private resourceUrl = BASE_URL;

  public constructor(
    private http: HttpClient
  ) {
  }

  getAllUsers(): Observable<EntityPageResponseType> {
    /* const params: HttpParams = new HttpParams()
       .set('page', pageable.page.toString())
       .set('size', pageable.size.toString());*/
    return this.http
      .get<IRepairUsers[]>(`${this.resourceUrl}/api/user/irepairs`, {observe: 'response'});
  }

}
