import {Pipe, PipeTransform} from "@angular/core";
import {formatInTimeZone} from 'date-fns-tz';
import {DATE_TIME_PART_DISPLAY_FORMAT_FNS} from "../../core/config/date.config";
import {map} from "rxjs";
import {DateFnsService} from "../service/date/date-fns.service";

@Pipe({
  name: 'formatPartDate'
})
export class FormatPartDatePipe implements PipeTransform {

  constructor(private dateFnsService: DateFnsService) {
  }

  transform(value: number | Date) {
    return this.dateFnsService.locale$.pipe(
      map(locale => formatInTimeZone(value, Intl.DateTimeFormat().resolvedOptions().timeZone, DATE_TIME_PART_DISPLAY_FORMAT_FNS, {locale}))
    );
  }

}
