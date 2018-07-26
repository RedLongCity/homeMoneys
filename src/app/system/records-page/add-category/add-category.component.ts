import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidService} from '../../../shared/services/valid.service';
import {BillLimitValidator} from '../../../shared/validator/bill.limit.validator';
import {Category} from '../../../shared/models/category.model';

@Component({
  selector: 'redlo-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  @Output() onCategoryAdded = new EventEmitter<Category>();

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
    const name = this.form.value['title'];
    const capacity = this.form.value['limit'];
    this.onCategoryAdded.emit(new Category(name, capacity));
    this.form.reset();
  }
}
