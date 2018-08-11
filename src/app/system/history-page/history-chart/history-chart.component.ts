import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'redlo-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  data = [
    {
      name: 'Germany',
      value: 8940000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7000000
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}