import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from "../models/shared/currency-enum.model";

@Pipe({
  name: 'currencyTransform'
})
export class CurrencyTransformPipe implements PipeTransform {

  constructor() {
  }

  transform(currency: Currency, args?: any): string {
    switch (currency) {
      case Currency.USD:
        return '$';
      case Currency.EUR:
        return '€';
      case Currency.GBP:
        return '£';
      case Currency.TND:
        return 'TND';
      case Currency.DZD:
        return 'DZD';
      case Currency.MAD:
        return 'MAD';
      default:
        return '';
    }
  }

}
