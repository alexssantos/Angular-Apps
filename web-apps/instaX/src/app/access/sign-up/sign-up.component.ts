import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-sign-up',
	templateUrl: './sign-up.component.html',
	styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

	@Output() public eventSignUp: EventEmitter<string> = new EventEmitter();

	constructor() { }

	ngOnInit() {
	}

	public showLoginPainel(): void {
		this.eventSignUp.emit('login');
	}

}
