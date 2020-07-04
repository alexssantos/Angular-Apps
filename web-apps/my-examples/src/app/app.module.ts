import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { Sidenav1Component } from './pages/_sidenave/sidenav1/sidenav1.component';
import { Sidenav2Component } from './pages/_sidenave/sidenav2/sidenav2.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Sidenav1Component,
    Sidenav2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	BrowserAnimationsModule,
	MatButtonModule,
	MatIconModule,
	MatToolbarModule,
	MatSidenavModule,
	MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
