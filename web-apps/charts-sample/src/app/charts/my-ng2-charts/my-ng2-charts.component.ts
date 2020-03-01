import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets, RadialChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';


@Component({
	selector: 'app-my-ng2-charts',
	templateUrl: './my-ng2-charts.component.html',
	styleUrls: ['./my-ng2-charts.component.css']
})
export class MyNg2ChartsComponent implements OnInit {

	// ===================
	// Pie
	// ===================
	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
	public pieChartData: SingleDataSet = [300, 500, 100];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];

	// ===================
	// bar
	// ===================
	public barChartOptions: ChartOptions = {
		responsive: true,
	};
	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];

	public barChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
	];

	// ===================
	// line
	// ===================
	public lineChartData: ChartDataSets[] = [
		{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
	];
	public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

	public lineChartOptions: ChartOptions = {
		responsive: true,
	};
	public lineChartColors: Color[] = [
		{
			borderColor: 'black',
			backgroundColor: 'rgba(255,0,0,0.3)',
		},
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];

	// ===================
	// radar
	// ===================
	public radarChartOptions: RadialChartOptions = {
		responsive: true,
	};
	public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

	public radarChartData: ChartDataSets[] = [
		{ data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
		{ data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
	];
	public radarChartType: ChartType = 'radar';


	constructor() {
		monkeyPatchChartJsTooltip();
		monkeyPatchChartJsLegend();
	}

	ngOnInit(): void {
	}

}
