import { Component, OnInit, Input } from '@angular/core';

import { MultiDataSet, Label } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-grafico-donas',
  templateUrl: './grafico-donas.component.html',
  styles: [
  ]
})
export class GraficoDonasComponent implements OnInit {

  @Input('chartLabels') doughnutChartLabels: string[] = [];
  @Input('chartData') doughnutChartData: number[] = [];
  @Input('chartType') doughnutChartType: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
