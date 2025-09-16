import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {countries} from '../data/countries';
import {IReferentialCountry} from "../models/referential/referential-country.model";

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor() {
  }

  getAllCountries(): Observable<IReferentialCountry[]> {
    return of(countries);
  }

}
