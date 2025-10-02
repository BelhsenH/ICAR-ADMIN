import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Campaign} from "../../models/compains/compaigns.model";

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private baseUrl = 'http://localhost:5000/api/campaigns';

  constructor(private http: HttpClient) {}

  getCampaigns(): Observable<Campaign[]> {
    return this.http.get<Campaign[]>(this.baseUrl);
  }

  createCampaign(campaign: Campaign): Observable<Campaign> {
    return this.http.post<Campaign>(this.baseUrl, campaign);
  }

  sendCampaign(id: string, type: 'email' | 'sms', recipients: string[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/send/${id}`, { type, recipients });
  }

  sendEmailCampaign(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send/${id}`, {});
  }

  // 🔹 Nouvelle méthode pour envoyer une campagne SMS
  sendSMSCampaign(id: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/send-sms/${id}`, {});
  }

  updateCampaign(id: string, data: Partial<Campaign>): Observable<Campaign> {
    return this.http.patch<Campaign>(`${this.baseUrl}/${id}`, data);
  }

  deleteCampaign(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
