//core angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';


//components
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { Sidenav1Component } from './pages/_sidenave/sidenav1/sidenav1.component';
import { Sidenav2Component } from './pages/_sidenave/sidenav2/sidenav2.component';
import { Form1Component } from './pages/_forms/form1/form1.component';
import { Form2Component } from './pages/_forms/form2/form2.component';


@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		Sidenav1Component,
		Sidenav2Component,
		Form1Component,
		Form2Component
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatSidenavModule,
		MatCardModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
