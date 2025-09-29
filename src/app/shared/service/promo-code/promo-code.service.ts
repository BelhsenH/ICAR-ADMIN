import { HttpClient } from "@angular/common/http";
import {BASE_LOCAL_URL, BASE_URL} from "../../constants/microservices.urls.constatnt";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {PromoCode} from "../../models/promo-code/promo-code.model";

@Injectable({
  providedIn: 'root'
})
export class PromoCodeService {
  private baseUrl = `${BASE_LOCAL_URL}/api/promo-codes`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<PromoCode[]> {
    return this.http.get<PromoCode[]>(this.baseUrl);
  }

  create(code: PromoCode): Observable<PromoCode> {
    return this.http.post<PromoCode>(this.baseUrl, code);
  }

  update(id: string, code: PromoCode): Observable<PromoCode> {
    return this.http.patch<PromoCode>(`${this.baseUrl}/${id}`, code);
  }

  toggleActive(id: string): Observable<PromoCode> {
    return this.http.patch<PromoCode>(`${this.baseUrl}/${id}/activate`, {});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
