import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../shared/models/event.model';
import {Category} from '../../../shared/models/category.model';


@Component({
  selector: 'redlo-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  constructor() {
  }

  @Input() events: Event[];
  @Input() categories: Category[];
  filters: string[] = [];
  exceptions: string[] = ['id', 'description'];
  activeFilter: string;
  searchValue = '';


  ngOnInit() {
    if (this.events) {
      Object.entries(this.events[0]).forEach((f) => {
        if (!this.exceptions.includes(f[0])) {
          this.filters.push(f[0]);
        }
      });
    }
  }

  findCategoryName(id: number): string {
    const cat = this.categories.find(c => c.id === id);
    if (cat) {
      return cat.name;
    } else {
      return 'Категория не существует(';
    }
  }

  onSelectFilter(filter) {
    this.activeFilter = filter;
  }

}
