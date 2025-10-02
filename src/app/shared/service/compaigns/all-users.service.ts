import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AllUserResponse} from "./all-users-response";

@Injectable({
  providedIn: 'root'
})
export class AllUserService {
  private apiUrl = 'http://162.19.66.250:6892/api/user/all-users';

  constructor(private http: HttpClient) {}

  // Ici le type de retour doit être AllUserResponse, pas AllUser[]
  getUsers(): Observable<AllUserResponse> {
    return this.http.get<AllUserResponse>(this.apiUrl);
  }
}
