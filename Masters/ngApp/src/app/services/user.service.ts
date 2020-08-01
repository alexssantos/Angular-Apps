import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserScore } from '../models/user-score.model';
import { MathUtils } from '../utils/math.utils';
import { UserDetails } from '../models/user-details.model';

@Injectable({
	providedIn: 'root'
})
export class UserService {

	private BASE_API = "http://localhost:3000";
	private PROFILE_IMG_PATH = "../../assets/img/profile_card/";
	private INCLUDE_PARENT = "_embed=";
	private INCLUDE_CHILDREN = "_expand=";

	// endpoint
	private ENDPOINT_USER_DETAILS = "usersDetails";
	private ENDPOINT_USER_KPI = "usersKpis";

	constructor(
		private http: HttpClient
	){}


	public getRankingList(): Observable<Array<UserScore>> {
		let url = this.BASE_API + "/" + this.ENDPOINT_USER_KPI;

		return this.http.get<Array<UserScore>>(url);
	}

	public getUserPhoto(): Observable<any> {
		let url = this.genPhotoUrl();
		return this.http.get(url, { responseType: 'blob' });
	}

	private genPhotoUrl(): string {
		let sex = (MathUtils.getRandom(0,10) > 5) ? "woman" : "man";
		let num = MathUtils.getRandom(1,22);

		let url: string = this.PROFILE_IMG_PATH + sex + "/img_card_" + num + ".jpg";

		return url;
	}

	public updateUserKpi(userKpi: UserScore): Observable<any> {
		let id = userKpi.id;
		let url = this.BASE_API + "/" + this.ENDPOINT_USER_KPI + "/" + id;

		return this.http.patch(url, userKpi);
	}

	public updateUserDetails(usersDetails: UserDetails): Observable<any> {	
		let id = usersDetails.id;	
		var url = this.BASE_API + "/" + this.ENDPOINT_USER_DETAILS +"/" + id;
		
		let userScore = Object.assign(new UserScore(), usersDetails.usersKpis);
		console.log("usersocre antes do patch: ",userScore);
		this.updateUserKpi(userScore).subscribe(
			(res) => {
				console.log("resultado update user kpi",res);
			},
			(error) => {
				console.log(error);
			}
		)		
		
		let body = usersDetails;
		return this.http.patch(url, body);
	}

	public getUserDetails(userId: string, lazyRequest: boolean = true): Observable<UserDetails> {		
		var url = this.BASE_API + "/" + this.ENDPOINT_USER_DETAILS + "?"+ "id=" + userId;
		if (lazyRequest) {
			url = url + "?"+this.INCLUDE_CHILDREN + this.ENDPOINT_USER_KPI;
		}	
		
		return this.http.get<UserDetails>(url);
	}

	public createUserScore(userKpi: UserScore): Observable<any> {		
		let url = this.BASE_API + "/" + this.ENDPOINT_USER_KPI;
		console.log("create user score", url);

		return this.http.post(url, userKpi);
	}

	public createUserDetails(usersDetails: UserDetails): Observable<any> {	
		var url = this.BASE_API + "/" + this.ENDPOINT_USER_DETAILS;
		
		let userScore = Object.assign(new UserScore(), usersDetails.usersKpis);
		console.log("usersocre antes do patch: ",userScore);
		this.createUserScore(userScore).subscribe(
			(res) => {
				console.log("resultado create user detaiils",res);
			},
			(error) => {
				console.log(error);
			}
		)		
		
		let body = usersDetails;
		return this.http.post(url, body);
	}
}