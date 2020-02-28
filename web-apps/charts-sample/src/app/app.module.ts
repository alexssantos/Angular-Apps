import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HighchartsComponent } from './charts/highcharts/highcharts.component';
import { AngularHighchartsComponent } from './charts/angular-highcharts/angular-highcharts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
	declarations: [
		AppComponent,
		HighchartsComponent,
		AngularHighchartsComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatTabsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
