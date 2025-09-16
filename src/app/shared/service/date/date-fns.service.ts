import {Injectable} from '@angular/core';
import {availableLanguages} from "../../data/available-languages";
import {enGB, fr} from "date-fns/locale";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DateFnsService {

  locale: Locale = fr;
  private localeSubject = new BehaviorSubject<Locale>(this.locale);

  private languagesLocales: string[] = [...availableLanguages].map(language => language.value);

  constructor() {
  }

  setDateLocaleUsedByDateFnsGlobally(newLocaleValue: string) {
    this.locale = (this.languagesLocales.includes(newLocaleValue) && newLocaleValue === 'en') ? enGB : fr;
    this.localeSubject.next(this.locale);
  }

  get locale$(): Observable<Locale> {
    return this.localeSubject.asObservable();
  }

}
