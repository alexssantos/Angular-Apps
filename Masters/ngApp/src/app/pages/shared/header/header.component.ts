import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyAuthService } from 'src/app/services/my-auth.service';

@Component({
	selector: 'app-layout-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	isNavbarCollapsed = true;
	public isAccessPage: boolean = true;

	title = 'app';
	navLinks: any[];
	activeLinkIndex = 1;

	public logoImg = '../../../../assets/ico/ms-icon-70x70.png';

	constructor(
		private router: Router,
		private myAuthService: MyAuthService
	) { 
		this.navLinks = [
			{
				label: 'Home',
				link: '/home',
				icon: 'fa-trophy',
				index: 0
			}, {
				label: 'Users List',
				link: '/compare',
				icon: 'fa-user-friends',
				index: 1
			}, {
				label: 'Project Details',
				link: '/project',
				icon: 'fa-chart-pie',
				index: 2
			}, {
				label: 'Hall of Fame',
				link: '/hall',
				icon: 'fa-star',
				index: 3
			}
		]
	}

	ngOnInit() {
		this.router.events.subscribe((res) => {
			this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === this.router.url));
			this.isAccessPage = (("/" === this.router.url) || ("/access" === this.router.url));
		});		
	}

	public goToHome(): void {
		this.router.navigate(['/home']);
	}

	public logout(): void {
		this.myAuthService.logout();
	}
}