import { User } from '../models/user.model';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DB_CONSTS } from '../utils/db.consts';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { UserScore } from '../models/user-score.model';
import { UserDetails } from '../models/user-details.model';
import { Kpi } from '../models/kpi.model';

@Injectable()
export class MyAuthService {
	private idToken: string;

	private starIcon = '../../../assets/icons/star.svg'

	constructor(
		private router: Router,
		private userServ: UserService
		) { }

	public CreateUser(user: User): Promise<boolean> {
		console.log("User create: ", user);

		return firebase
			.auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((res: any) => {
				// remover a senha para nao armazenar no banco junto com os detalhes
				
				let userDetails: UserDetails = this.buildUserDetails(user);
				return this.userServ.createUserDetails(userDetails).toPromise()
					.then((res2) => {
						console.log("User details criado", res2);
						return res2;
					})
					.catch((error) => {
						console.log(error);
						return error;
					});
					
			})
			.catch((error: Error) => {
				console.log(error.message);
				console.error(error);
				return false;
			});
	}

	public Login(email: string, password: string): Promise<any> {
		return firebase
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
	}

	public isAuthenticated(): boolean {
		let token: string = localStorage.getItem("idToken");
		return (token) ? true : false;
	}

	public logout(): void {
		localStorage.removeItem('idToken');
		this.idToken = null;
		firebase.auth().signOut()
			.then(() => {
				this.router.navigate(['/']);
			})
	}

	private buildUserDetails(user: User): UserDetails {
		let userDet = new UserDetails();
		
		userDet.email = user.email;
		userDet.userName = user.userName;
		userDet.id = user.userName;

		let nomeArray = user.fullName.split(" ");		
		userDet.firstName = nomeArray.shift();
		userDet.lastName = nomeArray.join(" ");
		
		let kpis: Kpi[] = [
			this.buildKpi("danger", this.starIcon, "KPI-1"),
			this.buildKpi("success",this.starIcon, "KPI-2"),
			this.buildKpi("info",this.starIcon, "KPI-3"),
			this.buildKpi("warning",this.starIcon, "KPI-4")
		]

		userDet.usersKpis = new UserScore();
		userDet.usersKpis.name = userDet.firstName + " " + userDet.lastName;
		userDet.usersKpis.nickName = userDet.userName;
		userDet.usersKpis.id = userDet.userName;
		userDet.usersKpis.scoreKpis = kpis;

		return userDet;
	}

	buildKpi(classWrap, icon, title): Kpi {
		let item = {
			score: 0,
			classWrapperName: classWrap,
			iconUrl: icon,
			title: title
		}
		return Object.assign(new Kpi(), item);
	}
}
