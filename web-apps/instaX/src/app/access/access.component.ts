import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-access',
	templateUrl: './access.component.html',
	styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

	public signUpPage: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	public changeForm(event: string): void {
		this.signUpPage = (event === 'signup') ? true : false;
		console.log(event)
	}

}
