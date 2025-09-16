import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IApiResponse} from "../models/api-response/api-response.model";
import {IPageableData} from "../models/utils/pageable-data.model";
import {PaymentTransaction} from "../models/billing/payment-transaction.model";
import {DataConverterService} from "./data-converter/data-converter.service";
import {map} from 'rxjs/operators';

type EntityResponseType = HttpResponse<IApiResponse<PaymentTransaction>>;
type EntityPageResponseType = HttpResponse<IApiResponse<IPageableData<PaymentTransaction>>>;
type Pageable = { page: number; size: number };

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private resourceUrl = BASE_URL + API_VERSION + '/payments';

  constructor(
    private http: HttpClient,
    private dataConverterService: DataConverterService
  ) {
  }

  getPaymentTransactionByBooking(bookingId: string): Observable<EntityResponseType> {
    return this.http
      .get<IApiResponse<PaymentTransaction>>(`${this.resourceUrl}/byBooking/${bookingId}`, {observe: 'response'})
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getPaymentTransactionsByUser(userId: string, pageable: Pageable): Observable<EntityPageResponseType> {
    const params: HttpParams = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());
    return this.http.get<IApiResponse<IPageableData<PaymentTransaction>>>(`${this.resourceUrl}/byUser/${userId}`, {
      observe: 'response',
      params
    }).pipe(map((res: EntityPageResponseType) => this.convertDatePageFromServer(res)));
  }

  getPaymentTransactionsByUserAndTransactionDateBetween(userId: string, startDate: number, endDate: number, pageable: Pageable): Observable<EntityPageResponseType> {
    const params: HttpParams = new HttpParams()
      .set('page', pageable.page.toString())
      .set('size', pageable.size.toString());
    return this.http.get<IApiResponse<IPageableData<PaymentTransaction>>>(`${this.resourceUrl}/byUserAndDateBetween/${userId}/${startDate}/${endDate}`, {
      observe: 'response',
      params
    }).pipe(map((res: EntityPageResponseType) => this.convertDatePageFromServer(res)));
  }

  /**
   * UTILS
   */

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body?.data) {
      res.body.data = this.dataConverterService.convertDatesFromServerForPaymentTransaction(res.body.data);
    }
    return res;
  }

  protected convertDatePageFromServer(res: EntityPageResponseType): EntityPageResponseType {
    if (res.body?.data.content) {
      res.body.data.content = this.dataConverterService.convertDatesFromServerForPaymentTransactions(res.body.data.content);
    }
    return res;
  }

}
