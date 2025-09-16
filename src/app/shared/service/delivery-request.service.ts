import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {IPageableData} from '../models/utils/pageable-data.model';
import {Observable} from 'rxjs';
import {IDeliveryRequest} from "../models/booking/delivery-request.model";
import {Pagination} from "../models/api-request/pagination/pagination.model";
import {createRequestOption} from "./utils/request-util";
import {IFilterRequest} from "../models/api-request/booking/filter-request.model";

type EntityResponseType = HttpResponse<IDeliveryRequest>;
export type EntityPageResponseType = HttpResponse<IPageableData<IDeliveryRequest>>;
type EntityArrayResponseType = HttpResponse<IDeliveryRequest[]>;

@Injectable({
  providedIn: 'root'
})
export class DeliveryRequestService {

  private resourceUrl = BASE_URL + API_VERSION + '/delivery-requests';

  constructor(protected http: HttpClient) {
  }

  getRequestById(requestId: string): Observable<EntityResponseType> {
    return this.http.get<IDeliveryRequest>(`${this.resourceUrl}/${requestId}`, {observe: 'response'});
  }

  getRequests(pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<IDeliveryRequest>>(`${this.resourceUrl}/`, {observe: 'response', params});
  }

  getActiveRequests(pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<IDeliveryRequest>>(`${this.resourceUrl}/active/`, {observe: 'response', params});
  }

  getFilteredRequests(filterRequest: IFilterRequest, pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<IDeliveryRequest>>(`${this.resourceUrl}/filter`, filterRequest, {
      observe: 'response',
      params
    });
  }

  getFilteredActiveRequests(filterRequest: IFilterRequest, pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<IDeliveryRequest>>(`${this.resourceUrl}/active/filter`, filterRequest, {
      observe: 'response',
      params
    });
  }

  getAllFilteredRequests(filterRequest: IFilterRequest): Observable<EntityArrayResponseType> {
    return this.http.post<IDeliveryRequest[]>(`${this.resourceUrl}/filter/list`, filterRequest, {observe: 'response'});
  }

  getAllFilteredActiveRequests(filterRequest: IFilterRequest): Observable<EntityArrayResponseType> {
    return this.http.post<IDeliveryRequest[]>(`${this.resourceUrl}/active/filter/list`, filterRequest, {observe: 'response'});
  }

}
