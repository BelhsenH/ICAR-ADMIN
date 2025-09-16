import {Pipe, PipeTransform} from "@angular/core";
import {formatInTimeZone} from 'date-fns-tz';
import {TIME_DISPLAY_FORMAT_FNS} from "../../core/config/date.config";
import {map} from "rxjs/operators";
import {DateFnsService} from "../service/date/date-fns.service";

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  constructor(private dateFnsService: DateFnsService) {
  }

  transform(value: string | number | Date) {
    return this.dateFnsService.locale$.pipe(
      map(locale => formatInTimeZone(value, Intl.DateTimeFormat().resolvedOptions().timeZone, TIME_DISPLAY_FORMAT_FNS, {locale}))
    );
  }

}
