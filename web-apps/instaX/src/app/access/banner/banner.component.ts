import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Imagem } from './imagem.model';

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
	public Imagens: Array<Imagem> = [
		{ state: 'visivel', url: '/assets/banner-acesso/img_1.png' },
		{ state: 'escondido', url: '/assets/banner-acesso/img_2.png' },
		{ state: 'escondido', url: '/assets/banner-acesso/img_3.png' },
		{ state: 'escondido', url: '/assets/banner-acesso/img_4.png' },
		{ state: 'escondido', url: '/assets/banner-acesso/img_5.png' },
	]

	constructor() { }

	ngOnInit() {
		setTimeout(() => {
			this.nextSlide();
		}, 2000);
	}

	public nextSlide(): void {
		var iNext = 0;

		for (let i = 0; i < this.Imagens.length; i++) {
			if (this.Imagens[i].state === 'visivel') {
				this.Imagens[i].state = 'escondido';
				iNext = (i === (this.Imagens.length - 1)) ? 0 : i + 1;
			}
		}
		this.Imagens[iNext].state = 'visivel';

		setTimeout(() => {
			//RECURSAO
			this.nextSlide();
		}, 2000);
	}

}
