import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
	selector: 'app-banner',
	templateUrl: './banner.component.html',
	styleUrls: ['./banner.component.scss'],
	animations: [
		trigger('bannerTrigger', [
			state('escondido',
				style({ opacity: 0 })),
			state('visivel',
				style({ opacity: 1 })),
			transition('escondido <=> visivel', [
				animate('1s ease-in')
			])
		])
	]

})
export class BannerComponent implements OnInit {


	public stateStr: string = 'escondido';

	constructor() { }

	ngOnInit() {
	}

	private switchImage(): void {
		this.stateStr = (this.stateStr === 'escondido') ? 'visivel' : 'escondido';
		console.log(this.stateStr);
	}

}
