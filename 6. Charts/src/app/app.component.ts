import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	public currentTab: number;

	constructor() { }
}
