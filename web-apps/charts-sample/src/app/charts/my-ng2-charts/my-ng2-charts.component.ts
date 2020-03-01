import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets, RadialChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';


/* 
====================================================
CODUMENTATION - ng2-charts
https://github.com/valor-software/ng2-charts
====================================================
*/

@Component({
	selector: 'app-my-ng2-charts',
	templateUrl: './my-ng2-charts.component.html',
	styleUrls: ['./my-ng2-charts.component.css']
})
export class MyNg2ChartsComponent implements OnInit {

	// =========================================================
	// Pie
	// =========================================================

	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
	public pieChartData: SingleDataSet = [300, 500, 100];
	public pieChartType: ChartType = 'pie';
	public pieChartLegend = true;
	public pieChartPlugins = [];

	// =========================================================
	// bar
	// =========================================================

	public barChartOptions: ChartOptions = {
		responsive: true,
	};
	public barChartType: ChartType = 'bar';
	public barChartLegend = true;
	public barChartPlugins = [];
	public MAX_FILDS_BAR = 7;
	public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartData: ChartDataSets[] = [
		{
			data: this.getMockRamdonData(this.MAX_FILDS_BAR),
			label: 'Series A'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_BAR),
			label: 'Series B'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_BAR),
			label: 'Series C'
		},
	];

	// =========================================================
	// line
	// =========================================================

	public lineChartOptions: ChartOptions = {
		responsive: true,
	};
	public lineChartColors: Color[] = [
		{ borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' }
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [];
	public MAX_FILDS_LINE = 7;
	public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
	public lineChartData: ChartDataSets[] = [
		{
			data: this.getMockRamdonData(this.MAX_FILDS_LINE),
			label: 'Series A'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_LINE),
			label: 'Series B'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_LINE),
			label: 'Series C'
		},
	];


	// =========================================================
	// radar
	// =========================================================

	public radarChartOptions: RadialChartOptions = {
		responsive: true,
	};
	public MAX_FILDS_RADAR = 7;
	public radarChartType: ChartType = 'radar';
	public radarChartLabels: Label[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];
	public radarChartData: ChartDataSets[] = [
		{
			data: this.getMockRamdonData(this.MAX_FILDS_RADAR),
			label: 'Series A'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_RADAR),
			label: 'Series B'
		},
		{
			data: this.getMockRamdonData(this.MAX_FILDS_RADAR),
			label: 'Series C'
		},
	];


	constructor() { }

	ngOnInit(): void {
	}

	private removeLineChart(): void {
		this.lineChartData.pop();
	}

	private addLineChart(dados: number[], titulo: string): void {
		//dados = this.getMockRamdonData(this.MAX_FILDS_LINE)
		//titulo = `Series ${this.getRamdon()}`;

		let line = {
			data: dados,
			label: titulo
		}
		this.lineChartData.push(line);
	}

	private getLineChartData(): void {

	}


	// ========================================================================
	// MOCK DATA
	// ========================================================================

	private getMockRamdonData(length: number): number[] {
		let data: number[] = [];
		for (let i = 0; i < length; i++) {
			data.push(this.getRamdon());
		}
		return data
	}

	private getRamdon(min: number = 0, max: number = 100): number {
		return Math.round(Math.random() * (max - min) + min);
	}
}

