import {Component, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../../shared/models/bill.model';
import {Currency} from '../../../shared/models/currency.model';

@Component({
  selector: 'redlo-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  bill: Bill;
  currencies: Currency[];
  date: Date;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.date = new Date();
    this.billService.getBill()
      .subscribe((bill: Bill) => {
        this.bill = bill;
        this.initCurrencies();
      });
  }

  initCurrencies() {
    this.billService.getCurrencies()
      .subscribe((currencies: Currency[]) => {
        this.currencies = [];
        currencies.forEach((cur: Currency) => {
          if (this.bill.currency === cur.name) {
            this.currencies.push({'name': cur.name, 'value': this.bill.value});
          } else {
            const mul = cur.value * this.bill.value;
            this.currencies.push({'name': cur.name, 'value': mul});
          }
        });
      });
  }

}
