import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
	@Output() public eventSignUp: EventEmitter<string> = new EventEmitter();

	public formSignup: FormGroup = new FormGroup({
		email: new FormControl(),
		full_name: new FormControl(),
		user_name: new FormControl(),
		password: new FormControl()
	});

	constructor() {}

	ngOnInit() {}

	public showLoginPainel(): void {
		this.eventSignUp.emit("login");
	}

	public submitNewUser(): void {
		console.log(this.formSignup);
	}
}
