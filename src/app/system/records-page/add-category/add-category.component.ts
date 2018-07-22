import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoryValid} from '../../../shared/models/categoryValid.model';

@Component({
  selector: 'redlo-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'title': new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      'limit': new FormControl(null, [
        Validators.required
      ])
    });
  }

  onSubmit() {
  }

}
