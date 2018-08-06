import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/models/category.model';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidService} from '../../../shared/services/valid.service';
import {Event} from '../../../shared/models/event.model';
import {BillLimitValidator} from '../../../shared/validator/bill.limit.validator';
import {Bill} from '../../../shared/models/bill.model';
import {BillService} from '../../shared/services/bill.service';

@Component({
  selector: 'redlo-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor(public validService: ValidService,
              public billLimitValidator: BillLimitValidator,
              public billService: BillService) {
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
          this.checkBillLimitAndType.bind(this)
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

  onTypeChanged(type: string) {
    this.type = type;
    this.form.get('amount').updateValueAndValidity();
  }

  public checkBillLimitAndType = (control?: AbstractControl): Promise<any> => {
    return new Promise<any>(resolve => {
      console.log(this.type);
      if (this.type === 'income') {
        resolve(null);
      } else {
        this.billService.getBill().subscribe((bill: Bill) => {
          if (control.value <= bill.value && control.value > 0) {
            resolve(null);
          } else {
            if (control.value <= 0) {
              resolve({
                'underLimit': true
              });
            } else {
              resolve({
                'overLimit': true
              });
            }
          }
        });
      }
    });
  };
}
