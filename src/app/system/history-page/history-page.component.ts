import {Component, OnDestroy, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {combineLatest, Subscription} from 'rxjs';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {Event} from '../../shared/models/event.model';

@Component({
  selector: 'redlo-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  constructor(private categoryService: CategoryService,
              private eventService: EventService) {
  }

  categories: Category[];
  events: Event[];
  sub: Subscription;
  data: { name: string, value: number }[] = [];
  isDataInit = false;
  isFilterVisible = false;

  ngOnInit() {
    this.sub = combineLatest(this.categoryService.getCategories(),
      this.eventService.getEvents())
      .subscribe(([categories, events]) => {
        this.categories = categories;
        this.events = events;
        this.initChartData(categories, events);
        this.isDataInit = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  initChartData(categories: Category[], events: Event[]) {
    categories.forEach((c) => {
        let capacity = c.capacity;
        events.filter((event) => event.category === c.id)
          .forEach((e) => e.type === 'income' ? capacity += e.amount : capacity -= e.amount);
        this.data.push({name: c.name, value: capacity});
      }
    );
  }

  private toggleFilterVisibility(flag: boolean) {
    this.isFilterVisible = flag;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply() {
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
  }
}
