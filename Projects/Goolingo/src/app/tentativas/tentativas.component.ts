import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
	selector: 'app-tentativas',
	templateUrl: './tentativas.component.html',
	styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

	@Input() public tentativas: number;

	private max_tentativas: number = 3;
	public arrayCoracoes: Coracao[] = [];

	constructor() {
		console.log('tentativasComp > constructor: Corações[] ' + this.arrayCoracoes);
		this.setTentativas();
	}

	ngOnInit() {
	}

	ngOnChanges() {
		console.log('tentativasComp > OnChange: tentativas : ', this.tentativas);

		const diff = this.arrayCoracoes.length - this.tentativas;
		if (diff > 0) {

			let ix = 0;
			this.arrayCoracoes.forEach(coracao => {
				if (ix < diff) {
					coracao.cheio = false;
				}
				ix++;
			});
		}
	}

	private setTentativas(): void {
		for (let i = 0; i < this.max_tentativas; i++) {
			this.arrayCoracoes[i] = new Coracao(true);
		}
	}
}
