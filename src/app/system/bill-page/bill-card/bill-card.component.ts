import {Component, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../../shared/models/bill.model';
import {Currency} from '../../../shared/models/currency.model';

@Component({
  selector: 'redlo-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor(private billService: BillService) {
  }

  bill: Bill;
  currencies: Currency[];


  ngOnInit() {
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
