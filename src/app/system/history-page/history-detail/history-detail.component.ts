import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../shared/services/category.service';
import {EventService} from '../../shared/services/event.service';
import {Event} from '../../../shared/models/event.model';
import {Subscription} from 'rxjs';

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

  sub: Subscription;
  isLoaded = false;
  event: Event;
  categoryName: string;
  type: string;
  eventId: number;

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        this.eventId = params['id'];
        if (this.eventId) {
          this.eventService.getEvent(this.eventId)
            .subscribe(event => {
              this.event = event;
              this.type = event.type === 'income' ? 'Доход' : 'Расход';
              this.categoryService.getCategory(event.category)
                .subscribe(category => {
                  this.categoryName = category.name;
                  this.isLoaded = true;
                });
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
