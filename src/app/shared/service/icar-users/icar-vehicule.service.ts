import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';


import {BASE_URL} from "../../constants/microservices.urls.constatnt";
import {IcarVehicule} from "../../models/icar-users/icar-vehicule.model";
import {IApiResponse} from "../../models/api-response/api-response.model";
import {map} from "rxjs/operators";

type EntityType = HttpResponse<IcarVehicule>;
export type EntityPageResponseType = HttpResponse<IcarVehicule[]>;
type Pageable = { page: number; size: number };

@Injectable({
  providedIn: 'root',
})
export class ICarVehiculeService {

  private resourceUrl = BASE_URL;

  public constructor(
    private http: HttpClient
  ) {
  }

  getCarsByUser(userId: string): Observable<IApiResponse<IcarVehicule[]>> {
    return this.http.get<any>(`${this.resourceUrl}/api/vehicle/user/${userId}`).pipe(
      map(res => {
        return {
          success: res.success,
          message: res.message,
          error: res.error,
          data: res.cars,   // 👈 ici on mappe cars -> data
        } as IApiResponse<IcarVehicule[]>;
      })
    );
  }


}
