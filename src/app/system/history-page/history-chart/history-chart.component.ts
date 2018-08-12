import {Component, Input, OnDestroy, OnInit} from '@angular/core';


@Component({
  selector: 'redlo-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit, OnDestroy {

  @Input() data: { name: string, value: number }[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }
}
