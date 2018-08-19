import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../../shared/models/category.model';
import {Event} from '../../../shared/models/event.model';


@Component({
  selector: 'redlo-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();
  @Input() categories: Category[];
  @Input() events: Event[];
  types: { id: number, name: string }[] = [];
  categories_: { id: number, name: string }[] = [];
  selectedTypes: number[];
  selectedCategories: number[];
  selectedDateStart: Date;
  selectedDateFinish: Date;

  constructor() {
  }

  ngOnInit() {
    Array.from(new Set(this.events.map(item => item.type)))
      .map(e => e === 'income' ? 'Доход' : 'Расход')
      .forEach((e, i) => this.types.push({id: i, name: e}));
    this.categories.forEach(c => this.categories_.push({id: c.id, name: c.name}));
  }

  closeFilter() {
    this.onFilterCancel.emit();
  }

  fireFiltering() {
    console.log(this.selectedCategories);
  }

}


