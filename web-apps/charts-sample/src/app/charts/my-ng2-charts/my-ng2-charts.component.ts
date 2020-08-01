import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions, ChartDataSets, RadialChartOptions } from 'chart.js';
import { SingleDataSet, Label, Color } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';

/* 
====================================================
CODUMENTATION - ng2-charts
github: https://github.com/valor-software/ng2-charts
site: https://valor-software.com/ng2-charts/
====================================================
*/

@Component({
	selector: 'app-my-ng2-charts',
	templateUrl: './my-ng2-charts.component.html',
	styleUrls: ['./my-ng2-charts.component.css']
})
export class MyNg2ChartsComponent implements OnInit {

	private API_URL = "http://localhost:5000/api/";
	private loading: boolean;
	private loadingColor: "primary";

	// =========================================================
	// Pie
	// =========================================================

	public pieChartOptions: ChartOptions = {
		responsive: true,
	};
	public pieChartLabels: Label[];
	public pieChartData: SingleDataSet;
	public pieChartType: ChartType;
	public pieChartLegend: boolean;
	public pieChartPlugins: Array<any>;

	public buildPieChart(data: any[] = null): void {
		this.pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
		this.pieChartType = 'pie';
		this.pieChartLegend = true;
		this.pieChartPlugins = [];

		if (data) {
			let chartData = data.map((item) => item.value);
			this.pieChartData = chartData;
			return;
		}
		this.pieChartData = [300, 500, 100];
	}

	// =========================================================
	// bar
	// =========================================================

	public barChartOptions: ChartOptions;
	public barChartType: ChartType;
	public barChartLegend: boolean;
	public barChartPlugins = [];
	public barChartLabels: Label[];
	public barChartData: ChartDataSets[];

	public buildBarChart(data: any[] = null): void {
		this.barChartOptions = {
			responsive: true,
		};
		this.barChartType = 'bar';
		this.barChartLegend = true;
		this.barChartPlugins = [];
		this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
		let MAX_FILDS_BAR = 7;

		if (data && data.length > 0) {
			this.barChartData = data;
			return;
		}

		this.barChartData = [
			{
				data: this.getMockRamdonData(MAX_FILDS_BAR),
				label: 'Series A'
			},
			{
				data: this.getMockRamdonData(MAX_FILDS_BAR),
				label: 'Series B'
			},
			{
				data: this.getMockRamdonData(MAX_FILDS_BAR),
				label: 'Series C'
			},
		];
	}

	// =========================================================
	// line
	// =========================================================

	public lineChartOptions: ChartOptions;
	public lineChartColors: Color[];
	public lineChartLegend: boolean;
	public lineChartType;
	public lineChartPlugins = [];
	public lineChartLabels: Label[];
	public lineChartData: ChartDataSets[];

	public MAX_FILDS_LINE = 7;
	public buildLineChart(data: any[] = null): void {
		this.lineChartOptions = {
			responsive: true,
		};
		this.lineChartColors = [
			{ borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' }
		];
		this.lineChartLegend = true;
		this.lineChartType = 'line';
		this.lineChartPlugins = [];
		this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

		if (data && data.length > 0) {
			this.lineChartData = data;
			return;
		}

		this.lineChartData = [
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
	}


	// =========================================================
	// radar
	// =========================================================

	public radarChartOptions: RadialChartOptions;
	public radarChartType: ChartType;
	public radarChartLabels: Label[];
	public radarChartData: ChartDataSets[];

	public buildRadarChart(data: any[] = null): void {
		this.radarChartOptions = {
			responsive: true,
		};
		let MAX_FILDS_RADAR = 7;
		this.radarChartType = 'radar';
		this.radarChartLabels = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

		if (data && data.length > 0) {
			this.radarChartData = data;
			return;
		}

		this.radarChartData = [
			{
				data: this.getMockRamdonData(MAX_FILDS_RADAR),
				label: 'Series A'
			},
			{
				data: this.getMockRamdonData(MAX_FILDS_RADAR),
				label: 'Series B'
			},
			{
				data: this.getMockRamdonData(MAX_FILDS_RADAR),
				label: 'Series C'
			},
		];
	}

	constructor(
		private http: HttpClient
	) {
		this.buildBarChart();
		this.buildPieChart();
		this.buildLineChart();
		this.buildRadarChart();
	}

	ngOnInit(): void {
	}

	private removeLineChart(): void {
		this.lineChartData.pop();
	}

	private addLineChart(dados: number[], titulo: string): void {
		let MAX_FILDS_LINE = 7;
		dados = this.getMockRamdonData(MAX_FILDS_LINE)
		titulo = `Series ${this.getRamdon()}`;

		let line = {
			data: dados,
			label: titulo
		}
		this.lineChartData.push(line);
	}

	public getChartData() {
		this.loading = true;

		let url = this.API_URL + 'chart';

		return this.http.get(url).subscribe(
			(res) => {
				console.log('response: ', res);

				let chartsType = Object.keys(res);

				if (chartsType != null && chartsType.length > 0) {
					chartsType.forEach(key => {
						this.buildChartByType(res[key], key);
					});
				}
			},
			(error) => {
				console.log(`${error.message}`, error);
			},
			() => {
				this.loading = false;
				console.log('get chart data finished!');
			}
		);
	}

	private buildChartByType(data, typeChart: string): void {

		let chartsSeries = Object.keys(data);

		if (chartsSeries == null || chartsSeries.length == 0) {
			console.log('No item in chart Type: ', typeChart);
			return;
		}

		let newDataSet: any[] = [];
		chartsSeries.forEach(serie => {

			let objDataValues = data[serie];

			newDataSet.push({
				data: objDataValues.map(chartValue => chartValue.value),
				label: serie
			})
		});


		switch (typeChart) {
			case 'BAR':
				this.buildBarChart(newDataSet);
				break;
			case 'LINE':
				this.buildLineChart(newDataSet);
				break;
			case 'RADAR':
				this.buildRadarChart(newDataSet);
				break;
			case 'PIE':
				let seriePie = "";
				this.buildPieChart(data[seriePie]);
				return;
		}
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

