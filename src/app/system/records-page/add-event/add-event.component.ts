import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../../shared/models/category.model';

@Component({
  selector: 'redlo-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  constructor() {
  }

  @Input() categories: Category[];

  ngOnInit() {
  }

}
