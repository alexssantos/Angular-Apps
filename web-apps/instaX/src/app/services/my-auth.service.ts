import { User } from "../models/user.model";
import * as firebase from "firebase";

export class MyAuthService {
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
}
