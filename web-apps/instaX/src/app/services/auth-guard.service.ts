import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { MyAuthService } from './my-auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

	constructor(
		private myAuthService: MyAuthService
	) { }

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean //| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
	{
		return this.myAuthService.isAuthenticated();
	}

}