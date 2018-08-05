import {Component, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';
import {Event} from '../../shared/models/event.model';
import {EventService} from '../shared/services/event.service';

@Component({
  selector: 'redlo-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  constructor(private categoryService: CategoryService,
              private eventService: EventService) {
  }

  _categories: Category[];
  event: Event;
  isLoaded = false;

  ngOnInit() {
    this.categoryService.getCategories()
      .subscribe((categories: Category[]) => {
        this._categories = categories;
        this.isLoaded = true;
      });
  }

  onCategoryAdded(category: Category) {
    this.categoryService.addCategory(category)
      .subscribe((cat: Category) => {
        this._categories.push(cat);
      });
  }

  onCategoryChanged(category: Category) {
    this.categoryService.putCategory(category)
      .subscribe((cat: Category) => {
        Object.assign(this._categories.find((c) => c.id === cat.id), cat);
      });
  }

  onEventAdded(event: Event) {
    this.eventService.addEvent(event)
      .subscribe((e: Event) => {
        this.event = e;
      });
  }

}
