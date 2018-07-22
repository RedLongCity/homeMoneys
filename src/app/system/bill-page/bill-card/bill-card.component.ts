import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../../shared/models/bill.model';

@Component({
  selector: 'redlo-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  constructor() {
  }

  @Input() billInCurrencies: Bill[];

  ngOnInit() {
  }
}
