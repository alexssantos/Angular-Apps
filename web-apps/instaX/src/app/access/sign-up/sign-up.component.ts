import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { MyAuthService } from "src/app/services/my-auth.service";
import { User } from "../../models/user.model";

@Component({
	selector: "app-sign-up",
	templateUrl: "./sign-up.component.html",
	styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
	@Output() public eventSignUp: EventEmitter<string> = new EventEmitter();

	public formSignup: FormGroup = new FormGroup({
		//TODO: incluir Validators
		email: new FormControl(),
		full_name: new FormControl(),
		user_name: new FormControl(),
		password: new FormControl()
	});

	constructor(private myAuthService: MyAuthService) { }

	ngOnInit() { }

	public showLoginPainel(): void {
		this.eventSignUp.emit("login");
	}

	public submitNewUser(): void {
		console.log(this.formSignup);

		let user: User = new User(
			this.formSignup.value.email,
			this.formSignup.value.full_name,
			this.formSignup.value.user_name,
			this.formSignup.value.password
		);

		this.myAuthService.CreateUser(user);
	}
}
