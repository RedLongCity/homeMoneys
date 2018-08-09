import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventService} from '../shared/services/event.service';
import {Event} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {CategoryService} from '../shared/services/category.service';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'redlo-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  constructor(private eventService: EventService,
              private categoryService: CategoryService) {
  }

  events: Event[];
  _categories: Category[];
  isLoaded = false;
  balances: {} = {};
  orderdEvents: {} = {};
  subscription: Subscription;

  ngOnInit() {
    this.subscription = combineLatest(this.categoryService.getCategories(),
      this.eventService.getEvents())
      .subscribe(([categories, events]) => {
        this._categories = categories;
        this.events = events;
        this.calculate();
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calculate() {
    this._categories.forEach(c => {
      let income = 0;
      const incomeEvents: Event[] = [];
      const outcomeEvents: Event[] = [];
      this.events.filter(e => e.category.id === c.id).forEach(e => {
        if (e.type === 'income') {
          income += e.amount;
          incomeEvents.push(e);
        } else {
          outcomeEvents.push(e);
        }
      });
      this.balances[c.id] = {income: income, total: c.capacity};
      this.orderdEvents[c.id] = {incomeEvents: incomeEvents, outcomeEvents: outcomeEvents};
    });
  }

}
