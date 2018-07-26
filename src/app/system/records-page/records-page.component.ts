import {Component, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'redlo-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoryService: CategoryService) {
  }

  _categories: Category[];

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this._categories = categories;
      });
  }

  onCategoryAdded(category: Category) {
    this.categoryService.addCategory(category)
      .subscribe((cat: Category) => {
        this._categories.push(cat);
      });
  }

}
