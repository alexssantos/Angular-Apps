import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { MyAuthService } from './my-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private myAuthService: MyAuthService,
		private router: Router
	) { }

	canActivate(): boolean { //| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 	
		let isAuth: boolean = this.myAuthService.isAuthenticated();
		if (!isAuth) this.router.navigate(['/']);
		return isAuth;
	}

}