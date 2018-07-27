import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() onCategoryChanged = new EventEmitter<Category>();

  form: FormGroup;
  category: Category = new Category('Название', 1);

  ngOnInit() {
    // if (this.categories.length > 0) {
    //   this.category = this.categories[0];
    // }
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
    this.onCategoryChanged.emit(this.category);
  }

  onSelect(category: Category) {
    this.category = category;
  }

}
