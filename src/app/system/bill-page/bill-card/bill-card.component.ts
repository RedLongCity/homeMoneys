import {Component, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../../shared/models/bill.model';

@Component({
  selector: 'redlo-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor(private billService: BillService) {
  }

  bill: Bill;

  ngOnInit() {
    this.billService.getBill()
      .subscribe((bill: Bill) => {
        this.bill = bill;
      });
  }

}
