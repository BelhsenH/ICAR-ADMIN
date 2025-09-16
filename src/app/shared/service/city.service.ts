import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IReferentialCity} from "../models/referential/referential-city.model";
import {ReferentialCityFilter} from "../models/api-request/referential/referential-city-filter.model";

type EntityResponseType = HttpResponse<IReferentialCity>;
type EntityArrayResponseType = HttpResponse<IReferentialCity[]>;

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private resourceUrl = BASE_URL + API_VERSION + '/cities';

  constructor(private http: HttpClient) {
  }

  getAllFilteredCities(filter: ReferentialCityFilter): Observable<EntityArrayResponseType> {
    return this.http.post<IReferentialCity[]>(`${this.resourceUrl}/filter/list`, filter, {observe: 'response'});
  }

}
