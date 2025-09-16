import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAirport} from "../models/referential/airport.model";
import {AirportFilter} from "../models/api-request/referential/airport-filter.model";

type EntityArrayResponseType = HttpResponse<IAirport[]>;

@Injectable({
  providedIn: 'root'
})
export class AirportService {

  private resourceUrl = BASE_URL + API_VERSION + '/airports';

  constructor(private http: HttpClient) {
  }

  getAllFilteredAirports(filter: AirportFilter): Observable<EntityArrayResponseType> {
    return this.http.post<IAirport[]>(`${this.resourceUrl}/filter/list`, filter, {observe: 'response'});
  }

}
