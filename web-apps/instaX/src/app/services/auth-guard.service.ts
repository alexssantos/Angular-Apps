import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';

export class AuthGuardService implements CanActivate {

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): boolean //| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
	{
		return false;
	}

}