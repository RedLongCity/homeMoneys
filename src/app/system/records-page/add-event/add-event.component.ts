import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/models/category.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidService} from '../../../shared/services/valid.service';
import {Event} from '../../../shared/models/event.model';
import {BillLimitValidator} from '../../../shared/validator/bill.limit.validator';

@Component({
  selector: 'redlo-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(public validService: ValidService,
              public billLimitValidator: BillLimitValidator) {
  }

  @Input() categories: Category[];
  @Output() onEventAdded = new EventEmitter<Event>();
  category: Category;
  form: FormGroup;
  amount = 0;
  descr: string;
  type = 'income';
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  ngOnInit() {
    this.category = this.categories[0];
    this.form = new FormGroup({
      'amount': new FormControl(null, [
          Validators.required
        ],
        [
          this.billLimitValidator.checkBillLimit
        ]),
      'descr': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ])
    });
  }

  onSubmit() {
    this.onEventAdded.emit(new Event(
      this.type,
      this.amount,
      this.category,
      new Date(),
      this.descr
    ));
  }
}
