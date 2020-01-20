import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MyAuthService } from '../services/my-auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-access',
	templateUrl: './access.component.html',
	styleUrls: ['./access.component.scss'],
	animations: [
		trigger('animation-banner', [
			state('criado', style({
				opacity: 1
			})),
			transition('void => criado', [
				style({ opacity: 0, transform: 'translate(-50px,0)' }),
				animate('500ms 0s ease-in-out') //duration, delay, acceleration
			])
		]),
		trigger('animation-painel', [
			state('criado', style({
				opacity: 1
			})),
			transition('void => criado', [
				style({ opacity: 0, transform: 'translate(50px,0)' }),
				animate('500ms 0s ease-in-out') //duration, delay, acceleration
			])
		])
	]
})
export class AccessComponent implements OnInit {

	public stateBanner: string = 'criado';
	public statePainel: string = 'criado';
	public signUpPage: boolean = false;

	constructor(
		private myAuthService: MyAuthService,
		private router: Router
	) { }

	ngOnInit() {
		if (this.myAuthService.isAuthenticated()) {
			this.router.navigate(['/home']);
		}
	}

	public changeForm(event: string): void {
		this.signUpPage = (event === 'signup') ? true : false;
		console.log(event)
	}

}
