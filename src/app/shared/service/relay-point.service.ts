import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPageableData} from "../models/utils/pageable-data.model";
import {DataConverterService} from './data-converter/data-converter.service';
import {NewRelayPoint} from "../models/api-request/referential/new-relay-point.model";
import {EnableRelayPoint} from "../models/api-request/referential/enable-relay-point.model";
import {DisableRelayPoint} from "../models/api-request/referential/disable-relay-point.model";
import {RelayPoint} from "../models/relay-point/relay-point.model";
import {RelayPointFilter} from "../models/api-request/referential/relay-point-filter.model";

type EntityResponseType = HttpResponse<RelayPoint>;
type EntityArrayResponseType = HttpResponse<RelayPoint[]>;
type EntityPageResponseType = HttpResponse<IPageableData<RelayPoint>>;

@Injectable({
  providedIn: 'root'
})
export class RelayPointService {

  private resourceUrl = BASE_URL + API_VERSION + '/relay-points';

  constructor(
    private http: HttpClient,
    private dataConverterService: DataConverterService
  ) {
  }

  addRelayPoint(newRelayPoint: NewRelayPoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(newRelayPoint);
    return this.http
      .post<RelayPoint>(`${this.resourceUrl}/`, newRelayPoint, {observe: 'response'});
  }

  updateRelayPoint(relayPointId: string, updatedRelayPoint: NewRelayPoint): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(updatedRelayPoint);
    return this.http
      .put<RelayPoint>(`${this.resourceUrl}/${relayPointId}`, updatedRelayPoint, {observe: 'response'});
  }

  getRelayPointById(id: string): Observable<EntityResponseType> {
    return this.http.get<RelayPoint>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }


  getRelayPoints(pageable: { page: number; size: number }): Observable<EntityPageResponseType> {
    const params: HttpParams = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());
    return this.http.get<IPageableData<RelayPoint>>(`${this.resourceUrl}/`, {observe: 'response', params});
  }

  getAllFilteredRelayPoints(relayPointsFilter: RelayPointFilter): Observable<EntityArrayResponseType> {
    return this.http.post<RelayPoint[]>(`${this.resourceUrl}/filter/list`, relayPointsFilter, {observe: 'response'});
  }

  enableRelayPoint(id: string, enableRelayPoint: EnableRelayPoint): Observable<EntityResponseType> {
    return this.http.post<RelayPoint>(`${this.resourceUrl}/${id}/status`, enableRelayPoint, {observe: 'response'});
  }

  disableRelayPoint(id: string, disableRelayPoint: DisableRelayPoint): Observable<EntityResponseType> {
    return this.http.post<RelayPoint>(`${this.resourceUrl}/${id}/status`, disableRelayPoint, {observe: 'response'});
  }

  /**
   * UTILS
   */

  protected convertDateFromClient(newRelayPoint: NewRelayPoint): NewRelayPoint {
    return this.dataConverterService.convertDatesFromClientForNewRelayPoint(newRelayPoint);
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      const formattedObject = this.dataConverterService.convertDatesFromServerForRelayPoint({...res.body});
      res.body.hoursOfOperation = formattedObject.hoursOfOperation;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((relayPoint: RelayPoint) => {
        const formattedObject = this.dataConverterService.convertDatesFromServerForRelayPoint({...relayPoint});
        relayPoint.hoursOfOperation = formattedObject.hoursOfOperation;
      });
    }
    return res;
  }

  protected convertDatePageFromServer(res: EntityPageResponseType): EntityPageResponseType {
    if (res.body?.content) {
      res.body.content = this.dataConverterService.convertDatesFromServerForRelayPoints(res.body.content);
    }
    return res;
  }
}
