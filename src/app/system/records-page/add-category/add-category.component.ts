import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidService} from '../../../shared/services/valid.service';
import {BillLimitValidator} from '../../../shared/validator/bill.limit.validator';

@Component({
  selector: 'redlo-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  constructor(public validService: ValidService,
              public billLimitValidator: BillLimitValidator) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'limit': new FormControl(null, [
        Validators.required
      ], [this.billLimitValidator.checkBillLimit])
    });
  }

  onSubmit() {
    this.billLimitValidator.checkBillLimit(new FormControl());
    console.log(this.form);
  }
}
