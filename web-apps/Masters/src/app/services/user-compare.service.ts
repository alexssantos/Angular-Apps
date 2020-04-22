import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { MathUtils } from '../utils/math.utils'


@Injectable({
	//inject singleton instance
	providedIn: 'root'
})
export class UserCompareService {

	private url = "http://i.pravatar.cc/250";

	private urlLocalBase = "../assets/img/profile_card/"
	private NAME_IMG_LOCAL = "img_card_"
	private TYPE_IMG_LOCAL = ".jpg";


	constructor(
		private http: HttpClient
	) { }

	public getPhotoCard(url: string = null, isMan: boolean = true): Observable<any> {
		if (!url) {
			let genre = isMan ? 'man/' : 'woman/';
			url = this.urlLocalBase
				+ genre
				+ this.NAME_IMG_LOCAL
				+ MathUtils.getRandom(1, 20)
				+ this.TYPE_IMG_LOCAL;
		}
		return this.http.get(url, { responseType: 'blob' });
	}
}
