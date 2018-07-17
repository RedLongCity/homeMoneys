import {Pipe, PipeTransform} from '@angular/core';
import {Currency} from '../models/currency.model';

@Pipe({
  name: 'redloCurrency'
})
export class CurrencyPipe implements PipeTransform {

  relations = [{
    name: 'EUR',
    full: 'euro'
  },
    {
      name: 'UAH',
      full: 'btc'
    },
    {
      name: 'RU',
      full: 'rub'
    }
  ];

  transform(value: string, ...args: any[]): any {
    return this.relations.find((e) => e.name === value).full;
  }
}
