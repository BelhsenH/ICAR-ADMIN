import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ITrainStation} from "../models/referential/train-station.model";
import {TrainStationFilter} from "../models/api-request/referential/train-station-filter.model";

type EntityArrayResponseType = HttpResponse<ITrainStation[]>;

@Injectable({
  providedIn: 'root'
})
export class TrainStationService {

  private resourceUrl = BASE_URL + API_VERSION + '/train-stations';

  constructor(private http: HttpClient) {
  }

  getAllFilteredTrainStations(filter: TrainStationFilter): Observable<EntityArrayResponseType> {
    return this.http.post<ITrainStation[]>(`${this.resourceUrl}/filter/list`, filter, {observe: 'response'});
  }

}
