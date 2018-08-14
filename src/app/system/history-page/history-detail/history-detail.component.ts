import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {EventService} from '../../shared/services/event.service';
import {Category} from '../../../shared/models/category.model';
import {Event} from '../../../shared/models/event.model';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'redlo-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private eventService: EventService) {
  }

  categories: Category[];
  events: Event[];
  sub: Subscription;
  isLoaded = false;
  event: Event;
  categoryName: string;
  type: string;
  eventId: string;

  ngOnInit() {
    this.sub = combineLatest(this.categoryService.getCategories(),
      this.eventService.getEvents(),
      this.route.params)
      .subscribe(([categories, events, params]) => {
        this.categories = categories;
        this.events = events;
        this.eventId = params['id'];
        this.event = events.find(e => e.id.toString() === this.eventId);
        this.type = this.event.type === 'outcome' ? 'расход' : 'доход';
        this.categoryName = categories.find(c => c.id === this.event.category).name;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
