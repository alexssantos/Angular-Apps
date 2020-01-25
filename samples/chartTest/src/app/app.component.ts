import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'chartTest';

  @ViewChild('chartTarget') chartTarget: ElementRef;
  chart: Highcharts.ChartObject;

  ngAfterViewInit(): void {

    const opts: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Fruit Consumption'
      },
      xAxis: {
        categories: ['Apples', 'Bananas', 'Oranges']
      },
      yAxis: {
        title: {
          text: 'Fruit eaten'
        }
      },
      series: [{
        name: 'Lu',
        data: [1, 0, 4]
      }, {
        name: 'Alex',
        data: [5, 7, 3]
      }]
    };

    this.chart = chart(this.chartTarget.nativeElement, opts);
  }


  addSeries() {
    this.chart.addSeries({
      name: 'NameTeste',
      data: [2, 5, 9]
    });
  }




  }
