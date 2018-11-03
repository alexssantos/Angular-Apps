import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Frase } from '../shared/frase.model';
import { FRASES } from './frases-mock';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

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
    this.rodadaFrase = this.frases[this.rodada];
    console.log(this.rodadaFrase);
  }

  ngOnInit() {
  }

  updateAnswer(answer: Event): void {
    this.resposta = ((<HTMLInputElement>answer.target).value);
  }

  checkAnswer(): void {
    // </> console.log(this.tentativas);

    if (this.rodadaFrase.frasePtBr === this.resposta) {
      alert('A tradução está correta');

      this.rodada++;
      this.progresso = this.progresso + (100 / this.frases.length);

      if (this.rodada === 4) {
        this.endGame.emit('Vitoria!');
      }
      this.UpdateRound();

    } else {
      this.tentativas--;

      if (this.tentativas < 0) {
        alert('Você perdeu todas as tentativas');
        this.endGame.emit('Derrota!');

      } else {
        alert('A resposta está Errada.');
      }

    }

    console.log(this.tentativas);
  }

  UpdateRound() {
    this.rodadaFrase = this.frases[this.rodada];
    this.resposta = '';

  }
}
