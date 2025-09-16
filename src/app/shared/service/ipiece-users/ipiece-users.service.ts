import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL } from '../../constants/microservices.urls.constatnt';
import {IPieceUsers} from "../../models/ipiece-users/ipiece-user.model";

export type EntityPageResponseType = HttpResponse<IPieceUsers[]>;

@Injectable({
  providedIn: 'root',
})
export class IPieceUsersService {

  private resourceUrl = BASE_URL;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<EntityPageResponseType> {
    return this.http.get<IPieceUsers[]>(`${this.resourceUrl}/api/user/ipieces`, { observe: 'response' });
  }
}
