import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-square',
    template: `
    <button> {{ value }} </button>
  `,
    styleUrls: []
})
export class SquareComponent implements OnInit {

    @Input() value: 'X' | 'O';

    constructor() { }

    ngOnInit() {
    }

}
