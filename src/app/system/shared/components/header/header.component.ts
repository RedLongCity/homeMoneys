import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'redlo-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  date: Date = new Date();

  constructor() {
  }

  ngOnInit() {
  }

  onLogout() {

  }

}
