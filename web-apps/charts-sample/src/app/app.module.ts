import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighchartsComponent } from './charts/highcharts/highcharts.component';
import { AngularHighchartsComponent } from './charts/angular-highcharts/angular-highcharts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from "ng2-charts";
import { MyNg2ChartsComponent } from './charts/my-ng2-charts/my-ng2-charts.component';


@NgModule({
	declarations: [
		AppComponent,
		HighchartsComponent,
		AngularHighchartsComponent,
		MyNg2ChartsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatTabsModule,
		ChartsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
