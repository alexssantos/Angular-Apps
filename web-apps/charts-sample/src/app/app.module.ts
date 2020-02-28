import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighchartsComponent } from './charts/highcharts/highcharts.component';
import { AngularHighchartsComponent } from './charts/angular-highcharts/angular-highcharts.component';

@NgModule({
	declarations: [
		AppComponent,
		HighchartsComponent,
		AngularHighchartsComponent
	],
	imports: [
		BrowserModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
