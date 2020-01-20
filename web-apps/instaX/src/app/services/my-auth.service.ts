import { User } from "../models/user.model";
import * as firebase from "firebase";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class MyAuthService {
	private idToken: string;

	constructor(private router: Router) { }

	public CreateUser(user: User): void {
		console.log(user);

		firebase
			.auth()
			.createUserWithEmailAndPassword(user.Email, user.Password)
			.then((res: any) => {
				console.log("USUARIO CRIADO");

				//remover a senha para nao armazenar no banco
				delete user.Password;

				//salvando usuario no banco no path email na base64
				let base64Email = btoa(user.Email);
				firebase
					.database()
					.ref(`user_detail/${base64Email}`)
					.set(user)
					.then(res2 => {
						console.log("USUARIO SALVO", res2);
					})
					.catch((error2: Error) => {
						console.log("ERRO - USUARIO SALVO");
						console.log(error2);
					});
			})
			.catch((error: Error) => {
				console.log("ERRO - USUARIO CRIADO");
				console.log(error);
			});
	}

	public Login(email: string, password: string): boolean {
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user: any) => {
				if (!user) return false;

				firebase.auth().currentUser.getIdToken()
					.then((tokenId: string) => {
						this.idToken = tokenId;
						localStorage.setItem("idToken", this.idToken);
						this.router.navigate(["/home"]);
						return true;
					});
			})
			.catch((error: Error) => {
				console.log(error);
				return false;
			});
		return false;
	}

	public isAuthenticated(): boolean {
		let token: string = localStorage.getItem("idToken");
		return (token) ? true : false;
	}
}
