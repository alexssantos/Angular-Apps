import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Coracao } from '../shared/coracao.model';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent implements OnInit, OnChanges {

  @Input() public tentativas: number;

  public arrayCoracoes: Coracao[] = [
    new Coracao(true), new Coracao(true), new Coracao(true)
  ];

  constructor() {
    console.log(this.arrayCoracoes);

  }

  ngOnChanges() {
    console.log('OnChange: tentativas recebidas do painel: ', this.tentativas);

    if ( this.tentativas !== this.arrayCoracoes.length ) {

      this.arrayCoracoes.forEach(coracao => {
        let tirouCoracao = false;
        if (coracao.cheio !== tirouCoracao) {
          coracao.cheio = false;
          tirouCoracao = false;
        }
      });
      this.arrayCoracoes[0].cheio = false;
    }
  }

  ngOnInit() {
    console.log('OnInit: tentativas recebidas do painel: ', this.tentativas);
  }

}
