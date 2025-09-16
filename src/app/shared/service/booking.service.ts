import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {IBooking} from '../models/booking/booking.model';
import {IPageableData} from '../models/utils/pageable-data.model';
import {Observable} from 'rxjs';
import {Pagination} from '../models/api-request/pagination/pagination.model';
import {IFilterBooking} from "../models/api-request/booking/filter-booking.model";
import {BookingClaim} from "../models/booking/booking-claim.model";
import {createRequestOption} from "./utils/request-util";
import {FireBookingEventRequest} from "../models/api-request/booking/fire-booking-event.model";
import {FilterBookingClaim} from "../models/api-request/booking/booking-claim-request.model";

type EntityResponseType = HttpResponse<IBooking>;
export type EntityPageResponseType = HttpResponse<IPageableData<IBooking>>;
type EntityArrayResponseType = HttpResponse<IBooking[]>;

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private resourceUrl = BASE_URL + API_VERSION + '/bookings';

  constructor(protected http: HttpClient) {
  }

  getBookingById(id: string): Observable<EntityResponseType> {
    return this.http.get<IBooking>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getBookings(pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<IBooking>>(`${this.resourceUrl}/`, {observe: 'response', params});
  }

  getFilteredBookings(filterBooking: IFilterBooking, pagination: Pagination): Observable<EntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<IBooking>>(`${this.resourceUrl}/filter`, filterBooking, {
      observe: 'response',
      params
    });
  }

  getAllFilteredBookings(filterBooking: IFilterBooking): Observable<EntityArrayResponseType> {
    return this.http.post<IBooking[]>(`${this.resourceUrl}/filter/list`, filterBooking, {observe: 'response'});
  }

  fireNewBookingEvent(bookingId: string, request: FireBookingEventRequest): Observable<EntityResponseType> {
    return this.http.post<IBooking>(`${this.resourceUrl}/${bookingId}/events/`, request, {observe: 'response'});
  }

  /**
   * CLAIM
   */

  getBookingClaimById(id: string): Observable<HttpResponse<BookingClaim>> {
    return this.http.get<BookingClaim>(`${this.resourceUrl}/claims/${id}`, {observe: 'response'});
  }

  getBookingsClaims(pagination: Pagination): Observable<HttpResponse<IPageableData<BookingClaim>>> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.get<IPageableData<BookingClaim>>(`${this.resourceUrl}/claims/`, {observe: 'response', params});
  }

  getFilteredBookingsClaims(filterBookingClaim: FilterBookingClaim, pagination: Pagination): Observable<HttpResponse<IPageableData<BookingClaim>>> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<BookingClaim>>(`${this.resourceUrl}/claims/filter`, filterBookingClaim, {
      observe: 'response',
      params
    });
  }

  getAllFilteredBookingsClaims(filterBookingClaim: FilterBookingClaim): Observable<HttpResponse<BookingClaim[]>> {
    return this.http.post<BookingClaim[]>(`${this.resourceUrl}/claims/filter/list`, filterBookingClaim, {observe: 'response'});
  }

}
