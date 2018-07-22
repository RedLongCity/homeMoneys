import {Component, Input, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {Currency} from '../../../shared/models/currency.model';

@Component({
  selector: 'redlo-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currencies: Currency[];
  date: Date;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.date = new Date();
  }

}
