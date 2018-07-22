import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from '../models/currency.model';

@Pipe({
  name: 'redloCurrency'
})
export class CurrencyPipe implements PipeTransform {

  relations = [
    {
      name: 'UAH',
      full: 'btc'
    },
    {
      name: 'RUB',
      full: 'rub'
    },
    {
      name: 'DOL',
      full: 'dollar'
    },
    {
      name: 'EUR',
      full: 'euro'
    }
  ];

  transform(value: string, ...args: any[]): any {
    return this.relations.find((e) => e.name === value).full;
  }
}
