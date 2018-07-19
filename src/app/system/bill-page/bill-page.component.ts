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
        this.bill = bill;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
