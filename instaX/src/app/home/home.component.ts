import { Component, OnInit, ViewChild } from '@angular/core';
import { MyAuthService } from '../services/my-auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	@ViewChild('posts', null) public postsView: any;

	constructor(
		private myAuthService: MyAuthService
	) { }

	ngOnInit() {
	}

	public logout(): void {
		this.myAuthService.logout();
	}

	public getTimeline(): void {
		this.postsView.updateTimeline();
	}

}
