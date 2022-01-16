import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'src/app/models/analytics.interface';

@Component({
  selector: 'mpv-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() chartTitle: string;
  @Input() set setChartData(chartData: ChartData) {
    if (chartData === null || chartData === undefined) { this.loading = true; return; }
    this.createLegends(chartData);
    if (typeof chartData.data === 'number') {
      this.numberData = chartData.data;
    } else {
      this.data = chartData.data;
    }
    this.chartType = chartData.chartType;
    this.loading = false;
  }
  public numberData: number = null;
  public chartType: ChartType = null;
  public data: {name: string, value: number}[];
  public colorScheme: {domain: string[]} = {
    domain: []
  };
  public legends: {name: string, color: string}[] = [];
  public loading: boolean;

  constructor() {}

  ngOnInit(): void {}

  private getRandomColor(): string {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  private createLegends(chart: ChartData) {
    if (typeof chart.data === 'number') { return; }
    const defaultColors = ['#FD6E6E', '#7790CF', '#DF2B6A', '#904AA8'];
    for (const data of chart.data) {
      const color = defaultColors.length > 0 ? defaultColors.pop() : this.getRandomColor();
      this.legends.push({name: data.name, color: color});
      this.colorScheme.domain.push(color);
    }
  }

}
