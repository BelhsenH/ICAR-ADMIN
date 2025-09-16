import {Injectable} from '@angular/core';
import {API_VERSION, BASE_URL} from '../constants/microservices.urls.constatnt';
import {HttpClient, HttpEvent, HttpParams, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private resourceUrl = BASE_URL + API_VERSION + '/files';

  constructor(private http: HttpClient) {
  }

  uploadPayloadImage(image: { name: string, data: Blob }, payloadId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', image.data, image.name);
    formData.append('payloadId', payloadId);
    const req = new HttpRequest('POST', `${this.resourceUrl}/payloads_images/`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  uploadBookingFile(file: { name: string, data: Blob }, bookingId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file.data, file.name);
    formData.append('bookingId', bookingId);
    const req = new HttpRequest('POST', `${this.resourceUrl}/bookings_files/`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  uploadBookingClaimFile(file: { name: string, data: Blob }, claimId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file.data, file.name);
    formData.append('claimId', claimId);
    const req = new HttpRequest('POST', `${this.resourceUrl}/booking_claims_files/`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  uploadDeliveryOfferFile(file: { name: string, data: Blob }, offerId: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file.data, file.name);
    formData.append('offerId', offerId);
    const req = new HttpRequest('POST', `${this.resourceUrl}/delivery_offers_files/`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  uploadUserFile(file: { name: string, data: Blob }, username: string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file.data, file.name);
    formData.append('username', username);
    const req = new HttpRequest('POST', `${this.resourceUrl}/users_files/`, formData, {
      reportProgress: true,
      responseType: 'json',
    });
    return this.http.request(req);
  }

  getPayloadImageUrl(fileName: string): string {
    return `${this.resourceUrl}/payloads_images/${fileName}`;
  }

  getPayloadImageBlob(fileName: string) {
    return this.http.get(`${this.resourceUrl}/payloads_images/${fileName}`, {
      responseType: 'blob'
    });
  }

  getBookingFileUrl(fileName: string): string {
    return `${this.resourceUrl}/bookings_files/${fileName}`;
  }

  getBookingFileBlob(fileName: string) {
    return this.http.get(`${this.resourceUrl}/bookings_files/${fileName}`, {
      responseType: 'blob'
    });
  }

  getBookingClaimFileUrl(fileName: string): string {
    return `${this.resourceUrl}/booking_claims_files/${fileName}`;
  }

  getBookingClaimFileBlob(fileName: string) {
    return this.http.get(`${this.resourceUrl}/booking_claims_files/${fileName}`, {
      responseType: 'blob'
    });
  }

  getDeliveryOfferFileUrl(fileName: string): string {
    return `${this.resourceUrl}/delivery_offers_files/${fileName}`;
  }

  getDeliveryOfferFileBlob(fileName: string) {
    return this.http.get(`${this.resourceUrl}/delivery_offers_files/${fileName}`, {
      responseType: 'blob'
    });
  }

  getUserFileUrl(fileName: string): string {
    return `${this.resourceUrl}/users_files/${fileName}`;
  }

  getUserFileBlob(fileName: string) {
    return this.http.get(`${this.resourceUrl}/users_files/${fileName}`, {
      responseType: 'blob'
    });
  }

  deletePayloadImage(fileName: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/payloads_images/${fileName}`, {observe: 'response'});
  }

  deleteBookingFile(fileName: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/bookings_files/${fileName}`, {observe: 'response'});
  }

  deleteBookingClaimFile(fileName: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/booking_claims_files/${fileName}`, {observe: 'response'});
  }

  deleteDeliveryOfferFile(fileName: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/delivery_offers_files/${fileName}`, {observe: 'response'});
  }

  deleteUserFile(fileName: string): Observable<HttpResponse<void>> {
    return this.http.delete<void>(`${this.resourceUrl}/users_files/${fileName}`, {observe: 'response'});
  }

  deletePayloadImages(payloadId: string): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set('payloadId', payloadId);
    return this.http.delete<void>(`${this.resourceUrl}/payloads_images/`, {observe: 'response', params});
  }

  deleteBookingFiles(bookingId: string): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set('bookingId', bookingId);
    return this.http.delete<void>(`${this.resourceUrl}/bookings_files/`, {observe: 'response', params});
  }

  deleteBookingClaimFiles(claimId: string): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set('claimId', claimId);
    return this.http.delete<void>(`${this.resourceUrl}/booking_claims_files/`, {observe: 'response', params});
  }

  deleteDeliveryOfferFiles(offerId: string): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set('offerId', offerId);
    return this.http.delete<void>(`${this.resourceUrl}/delivery_offers_files/`, {observe: 'response', params});
  }

  deleteUserFiles(username: string): Observable<HttpResponse<void>> {
    const params: HttpParams = new HttpParams().set('username', username);
    return this.http.delete<void>(`${this.resourceUrl}/users_files/`, {observe: 'response', params});
  }

}
