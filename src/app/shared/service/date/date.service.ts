import {Injectable} from '@angular/core';
import {DEFAULT_LOCALE} from "../../constants/date.constant";
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  timeZone: string;
  locale: string = DEFAULT_LOCALE;

  constructor() {
    this.timeZone = moment.tz.guess(true);
  }

  setDateLocaleUsedByMomentJsGlobally(newLocaleValue: string) {
    this.locale = newLocaleValue;
    moment.locale(newLocaleValue);
  }

  getUserTimeZone(): string {
    return this.timeZone;
  }

  displayDateFromUnixEpochAndUserTimeZone(unixEpochTimeInSeconds: number, formatType: string = 'LLL'): string {
    return moment.utc(unixEpochTimeInSeconds * 1000).tz(this.timeZone).format(formatType);
  }

}
