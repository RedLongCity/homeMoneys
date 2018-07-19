import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../../shared/models/bill.model';
import {Currency} from '../../../shared/models/currency.model';

@Component({
  selector: 'redlo-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor() {
  }

  @Input() bill: Bill;
  @Input() currencies: Currency[];

  ngOnInit() {
  }
}
