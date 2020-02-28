import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-highcharts',
	templateUrl: './highcharts.component.html',
	styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements AfterViewInit {

	@ViewChild('chartTarget') chartTarget: ElementRef;
	chart: Highcharts.ChartObject;

	title = 'charts-sample';

	constructor() { }

	ngAfterViewInit(): void {

		const opts: Highcharts.Options = {
			chart: {
				renderTo: 'container',
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
