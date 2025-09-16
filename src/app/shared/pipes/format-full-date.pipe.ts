import {Pipe, PipeTransform} from "@angular/core";
import {formatInTimeZone} from 'date-fns-tz';
import {DATE_TIME_FULL_DISPLAY_FORMAT_FNS} from "../../core/config/date.config";
import {map} from "rxjs";
import {DateFnsService} from "../service/date/date-fns.service";

@Pipe({
  name: 'formatFullDate'
})
export class FormatFullDatePipe implements PipeTransform {

  constructor(private dateFnsService: DateFnsService) {
  }

  transform(value: number | Date) {
    return this.dateFnsService.locale$.pipe(
      map(locale => formatInTimeZone(value, Intl.DateTimeFormat().resolvedOptions().timeZone, DATE_TIME_FULL_DISPLAY_FORMAT_FNS, {locale}))
    );
  }

}
