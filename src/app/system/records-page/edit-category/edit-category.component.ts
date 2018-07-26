import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../shared/models/category.model';
import {ValidService} from '../../../shared/services/valid.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BillLimitValidator} from '../../../shared/validator/bill.limit.validator';

@Component({
  selector: 'redlo-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  constructor(public validService: ValidService,
              public billLimitValidator: BillLimitValidator) {
  }

  @Input() categories: Category[];

  form: FormGroup;

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
  }

}
