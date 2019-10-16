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
	// @Output() public endGame: EventEmitter<string> = new EventEmitter();

	constructor() {
		console.log('PainelComp > constructor: rodada ' + this.rodada);
	}

	ngOnInit() {
		this.rodadaFrase = this.frases[this.rodada];
		console.log('PainelComp > OnInit: rodadaFrase ' + this.rodadaFrase);
	}

	ngOnDestroy(): void {
		console.log('PainelComp > OnDestroy ');
	}

	updateAnswer(answer: Event): void {
		this.resposta = ((<HTMLInputElement>answer.target).value);
	}

	checkAnswer(): void {
		console.log('PainelComp > CheckAnswer');

		// ACERTOU!
		if (this.rodadaFrase.frasePtBr === this.resposta) {

			console.log('ACERTOU: rodada ' + this.rodada);

			alert('A tradução está correta');

			this.rodada++;
			this.progresso = this.progresso + (100 / this.frases.length);
			console.log('Incrementado: rodada++ ' + this.rodada + ', progresso : ' + this.progresso + '%');

			if (this.rodada === 4) {
				console.log('start ENDGAME: ' + this.rodada);
				this.endGame.emit('Vitoria!');

			} else {
				this.UpdateRound();
			}

			// ERROU!
		} else {
			console.log('CheckAnswer: ERROU!');

			this.tentativas--;

			if (this.tentativas < 0) {
				alert('Você perdeu todas as tentativas');
				this.endGame.emit('Derrota!');

			} else {
				alert('A resposta está Errada.');
			}

		}// else
		this.resposta = '';

	}// metodo

	UpdateRound() {
		this.rodadaFrase = this.frases[this.rodada];

	}
}
