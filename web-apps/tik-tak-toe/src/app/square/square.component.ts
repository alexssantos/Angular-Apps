import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-square',
    templateUrl: './square.component.html',
    styles: [
        `button {
            width: 100%;
            height: 100%;
            font-size: 5em !important;
        }`
    ]
})
export class SquareComponent implements OnInit {

    @Input() value: 'X' | 'O';

    constructor() { }

    ngOnInit() {
    }

}
