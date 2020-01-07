import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Frase } from "../shared/Frase";
import { FRASES } from './frases-mock';

@Component({
	selector: 'app-painel',
	templateUrl: './painel.component.html',
	styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit, OnDestroy {

	public frases: Frase[] = FRASES;
	public rodadaFrase: Frase;

	public instrucao = 'Traduza a frase:';
	public resposta = '';

	public rodada = 0;
	public progresso = 0;
	public tentativas = 3;

	// exposição para componentes pai
	@Output() public endGame = new EventEmitter();

	constructor() {
		console.log('PainelComp > constructor: rodada ' + this.rodada);
	}

	ngOnInit() {
		this.rodadaFrase = this.frases[this.rodada];
		// console.log('PainelComp > OnInit: rodadaFrase ' + this.rodadaFrase);
	}

	ngOnDestroy(): void {
		console.log('PainelComp > OnDestroy ');
	}

	checkAnswer(answer: string): void {
		this.resposta = answer;

		// ACERTOU!
		if (this.rodadaFrase.frasePtBr === this.resposta) {
			alert('A tradução está correta');
			this.rodada++;
			this.progresso = this.progresso + (100 / this.frases.length);

			if (this.rodada === 4) {
				this.endGame.emit('Vitoria!');
			} else {
				this.UpdateRound();
			}// else

			// ERROU
		} else {
			this.tentativas--;

			if (this.tentativas < 0) {
				alert('Você perdeu todas as tentativas');
				this.endGame.emit('Derrota!');
			} else {
				alert('A resposta está Errada.');
			}// else
		}// else

		this.resposta = '';
	}// func

	UpdateRound() {
		this.rodadaFrase = this.frases[this.rodada];
	}
}
