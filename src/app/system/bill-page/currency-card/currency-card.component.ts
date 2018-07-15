import {Component, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../../shared/models/bill.model';

@Component({
  selector: 'redlo-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  bill: Bill;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.billService.getBill()
      .subscribe((bill: Bill) => {
        this.bill = bill;
      });
  }

}
