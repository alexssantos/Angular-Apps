import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';


@Component({
	selector: 'app-my-ng2-charts',
	templateUrl: './my-ng2-charts.component.html',
	styleUrls: ['./my-ng2-charts.component.css']
})
export class MyNg2ChartsComponent implements OnInit {

	// Pie
	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
	public pieChartData: SingleDataSet = [300, 500, 100];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];
	constructor() { }

	ngOnInit(): void {
	}

}
