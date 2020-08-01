import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	@ViewChild('drawer') drawer: MatDrawer;
	
	public today: number = Date.now();	
	public navLinks: any[];

	constructor() {	
		this.generateNavlinks();
	}	

	public generateNavlinks(): void {
		this.navLinks = [
			{
				label: 'Home',
				link: '/home',
				icon: 'home',
				//index: 0
			}, {
				label: 'Forms',
				link: '/forms',
				icon: 'assignment',
				//index: 1
			}, {
				label: 'Sidnavs',
				link: '/sidenavs',
				icon: 'menu',
				//index: 2
			},{
				label: 'Animations',
				link: '/',
				icon: 'widgets',
				//index: 2
			},{
				label: 'Configs',
				link: '/',
				icon: 'settings',
				//index: 2
			},
		]

		this.navLinks.forEach((val, i) => val.index = i);
		console.log(this.navLinks);
	}
}
