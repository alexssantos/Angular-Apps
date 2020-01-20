import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MyAuthService } from "src/app/services/my-auth.service";

@Component({
	selector: "app-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
	@Output() public eventLogin: EventEmitter<string> = new EventEmitter();

	public formLogin: FormGroup = new FormGroup({
		email: new FormControl(),
		password: new FormControl()
	});

	constructor(public myAuthService: MyAuthService) {}

	ngOnInit() {}

	public showSignUpPainel(): void {
		this.eventLogin.emit("signup");
	}

	public loginUser(): void {
		let email = this.formLogin.value.email;
		let password = this.formLogin.value.password;

		this.myAuthService.Login(email, password);
	}
}
