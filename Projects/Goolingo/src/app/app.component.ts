import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Goolingo';

  public jogoEmAndamento = true;
  public tipoEncerramento: string;

  public EndGame(tipo: string): void {
    console.log(tipo);
    this.jogoEmAndamento = false;
    this.tipoEncerramento = tipo;
  }
}
