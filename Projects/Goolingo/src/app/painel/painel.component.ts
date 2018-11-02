import { Component, OnInit } from '@angular/core';
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

  constructor() {
    this.rodadaFrase = this.frases[this.rodada];
    console.log(this.rodadaFrase);
  }

  ngOnInit() {
  }

  public updateAnswer(answer: Event): void {
    this.resposta = ((<HTMLInputElement>answer.target).value);
  }

  public checkAnswer(): void {
    // </> console.log(this.tentativas);

    if (this.rodadaFrase.frasePtBr === this.resposta) {
      alert('A tradução está correta');

      // trocar pergunta da rodada
      this.rodada++;

      // progresso =   25%,50%,75%    + 25%
      this.progresso = this.progresso + (100 / this.frases.length);

      // atualiza o objeto da frase
      this.rodadaFrase = this.frases[this.rodada];

      // limpar resposta
      this.resposta = '';

    } else {

      this.tentativas--;

      if (this.tentativas < 0) {
        alert('Você perdeu todas as tentativas');

        // ToDo: desabilitar o botão de resposta.


      } else {
        alert('A resposta está Errada.');
      }
    }

    console.log(this.tentativas);
  }
}
