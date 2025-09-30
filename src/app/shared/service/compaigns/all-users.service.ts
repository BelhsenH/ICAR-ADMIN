// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AllUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  application: 'icar' | 'irepair' | 'ipiece'; // d’après ce que tu m’as dit
}

@Injectable({
  providedIn: 'root'
})
export class AllUserService {
  private baseUrl = 'http://162.19.66.250:6892/api/user';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<AllUser[]> {
    return this.http.get<AllUser[]>(`${this.baseUrl}/all-users`);
  }
}
