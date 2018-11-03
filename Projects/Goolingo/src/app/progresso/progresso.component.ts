import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit, OnChanges {

  @Input() public progresso = 0;

  constructor() {
    console.log('ProgressoComp > construc: progresso: ' + this.progresso)
  }

  ngOnInit() {
  }

  ngOnChanges(): void {
    console.log('ProgressoComp > OnChange: progresso: ' + this.progresso)

  }

}
