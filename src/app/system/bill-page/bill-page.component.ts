import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../../shared/models/bill.model';
import {Currency} from '../../shared/models/currency.model';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'redlo-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  constructor(private billService: BillService) {
  }

  bill: Bill;
  currencies: Currency[];
  billInCurrencies: Bill[];
  subscription: Subscription;

  ngOnInit() {
    this.populate();
  }

  onRefresh() {
    this.populate();
  }

  public populate() {
    this.currencies = [];
    this.subscription = combineLatest(this.billService.getBill(),
      this.billService.getCurrencies())
      .subscribe(([bill, currencies]) => {
        this.billInCurrencies = [];
        this.bill = bill;
        this.currencies = currencies;
        currencies.forEach((cur: Currency) => {
          if (this.bill.currency === cur.name) {
            this.billInCurrencies.push({'currency': cur.name, 'value': this.bill.value});
          } else {
            const mul = cur.value * this.bill.value;
            this.billInCurrencies.push({'currency': cur.name, 'value': mul});
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
