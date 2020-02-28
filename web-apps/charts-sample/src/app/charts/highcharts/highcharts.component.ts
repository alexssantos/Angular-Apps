import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-highcharts',
	templateUrl: './highcharts.component.html',
	styleUrls: ['./highcharts.component.css']
})
export class HighchartsComponent implements AfterViewInit {

	@ViewChild('highChartItem') chartTarget: ElementRef;
	private chartObj: Highcharts.ChartObject;

	title = 'charts-sample';

	constructor() { }

	ngAfterViewInit(): void {

		// MOCK
		const optsMock: Highcharts.Options = {
			chart: {
				type: 'bar',
				backgroundColor: '#f3f3f3'
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

		this.chartObj = chart(this.chartTarget.nativeElement, optsMock);
	}


	addSeries() {
		this.chartObj.addSeries({
			name: 'NameTeste',
			data: [2, 5, 9]
		});
	}

	private removeSeries(): void {
	}
}
