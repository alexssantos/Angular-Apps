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

	public erroMsgLogin: string = "";
	public tryingLogin: boolean = false;

	public formLogin: FormGroup = new FormGroup({
		email: new FormControl(),
		password: new FormControl()
	});

	constructor(
		public myAuthService: MyAuthService
	) {}

	ngOnInit() {}

	public showSignUpPainel(): void {
		this.eventLogin.emit("signup");
	}

	public loginUser(): void {
		this.tryingLogin = true;
		let email = this.formLogin.value.email;
		let password = this.formLogin.value.password;

		this.myAuthService.Login(email, password)
			.then((isOk: boolean) => {
				this.validateLoginResponse(isOk);
			})
			.catch((isOk: boolean) => {
				this.validateLoginResponse(isOk);
			})		
	}

	public validateLoginResponse(isOk: boolean):void {
		if (!isOk) {			
			setTimeout(() => {
				this.erroMsgLogin = "";
			}, 4000);
			this.erroMsgLogin = "O nome de usuário inserido não pertence a uma conta. Verifique seu	email e/ou senha e tente novamente.";
		}
		this.tryingLogin = false;
	}
}
