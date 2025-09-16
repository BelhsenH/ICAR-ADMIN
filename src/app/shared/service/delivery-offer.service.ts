import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {IPageableData} from '../models/utils/pageable-data.model';
import {IDeliveryOffer} from "../models/booking/delivery-offer.model";
import {Pagination} from "../models/api-request/pagination/pagination.model";
import {createRequestOption} from "./utils/request-util";
import {IFilterOffer} from "../models/api-request/booking/filter-offer.model";

type EntityResponseType = HttpResponse<IDeliveryOffer>;
export type EntityPageResponseType = HttpResponse<IPageableData<IDeliveryOffer>>;
type EntityArrayResponseType = HttpResponse<IDeliveryOffer[]>;

@Injectable({
  providedIn: 'root'
})
export class DeliveryOfferService {

  private resourceUrl = BASE_URL + API_VERSION + '/delivery-offers';

  constructor(protected http: HttpClient) {
  }

  getOfferById(id: string): Observable<EntityResponseType> {
    return this.http.get<IDeliveryOffer>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getOffers(pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<IDeliveryOffer>>(`${this.resourceUrl}/`, {observe: 'response', params});
  }

  getActiveOffers(pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<IDeliveryOffer>>(`${this.resourceUrl}/active/`, {observe: 'response', params});
  }

  getFilteredOffers(filterOffer: IFilterOffer, pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<IDeliveryOffer>>(`${this.resourceUrl}/filter`, filterOffer, {
      observe: 'response',
      params
    });
  }

  getFilteredActiveOffers(filterOffer: IFilterOffer, pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<IDeliveryOffer>>(`${this.resourceUrl}/active/filter`, filterOffer, {
      observe: 'response',
      params
    });
  }

  getAllFilteredOffers(filterOffer: IFilterOffer): Observable<EntityArrayResponseType> {
    return this.http.post<IDeliveryOffer[]>(`${this.resourceUrl}/filter/list`, filterOffer, {observe: 'response'});
  }

  getAllFilteredActiveOffers(filterOffer: IFilterOffer): Observable<EntityArrayResponseType> {
    return this.http.post<IDeliveryOffer[]>(`${this.resourceUrl}/active/filter/list`, filterOffer, {observe: 'response'});
  }

}
