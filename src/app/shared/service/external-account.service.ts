import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPageableData} from "../models/utils/pageable-data.model";
import {createRequestOption} from "./utils/request-util";
import {BankAccount} from "../models/user/external-account.model";
import {API_VERSION, BASE_URL} from "../constants/microservices.urls.constatnt";
import {
  NewBankAccountRequest,
  UpdateBankAccountRequest
} from "../models/api-request/user/external-account/external-bank-account-request.model";
import {FilterExternalAccountRequest} from "../models/api-request/user/external-account/external-account-request.model";
import {Pagination} from "../models/api-request/pagination/pagination.model";
import {
  BankAccountVerificationReview
} from "../models/api-request/user/external-account/bank-account-verification-review.model";

type BankAccountEntityResponseType = HttpResponse<BankAccount>;
type BankAccountEntityPageResponseType = HttpResponse<IPageableData<BankAccount>>;
type BankAccountEntityArrayResponseType = HttpResponse<BankAccount[]>;

@Injectable({
  providedIn: 'root'
})
export class ExternalAccountService {

  private resourceUrl = BASE_URL + API_VERSION + '/external-accounts';

  constructor(
    private http: HttpClient
  ) {
  }

  createExternalBankAccount(requestBody: NewBankAccountRequest): Observable<BankAccountEntityResponseType> {
    return this.http.post<BankAccount>(`${this.resourceUrl}/bank-accounts/`, requestBody, {observe: 'response'});
  }

  updateExternalBankAccount(id: string, requestBody: UpdateBankAccountRequest): Observable<BankAccountEntityResponseType> {
    return this.http.put<BankAccount>(`${this.resourceUrl}/bank-accounts/${id}`, requestBody, {observe: 'response'});
  }

  deleteExternalBankAccount(id: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/bank-accounts/${id}`, {observe: 'response'});
  }

  getExternalBankAccountById(id: string): Observable<BankAccountEntityResponseType> {
    return this.http.get<BankAccount>(`${this.resourceUrl}/${id}`, {observe: 'response'});
  }

  getFilteredExternalAccounts(bodyRequest: FilterExternalAccountRequest, pagination: Pagination): Observable<BankAccountEntityPageResponseType> {
    const params: HttpParams = createRequestOption(pagination);
    return this.http.post<IPageableData<BankAccount>>(`${this.resourceUrl}/filter`, bodyRequest, {
      observe: 'response',
      params
    });
  }

  getAllFilteredExternalAccounts(bodyRequest: FilterExternalAccountRequest): Observable<BankAccountEntityArrayResponseType> {
    return this.http.post<BankAccount[]>(`${this.resourceUrl}/filter/list`, bodyRequest, {observe: 'response'});
  }

  setBankAccountVerificationReview(id: string, bankAccountVerificationReview: BankAccountVerificationReview): Observable<BankAccountEntityResponseType> {
    return this.http
      .post<BankAccount>(`${this.resourceUrl}/bank-accounts/${id}/review`, bankAccountVerificationReview, {observe: 'response'});
  }

}
