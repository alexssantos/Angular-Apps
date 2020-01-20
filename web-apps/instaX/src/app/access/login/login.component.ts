import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	@Output() public eventLogin: EventEmitter<string> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	public showSignUpPainel(): void {
		this.eventLogin.emit('signup');
	}

}
