import { Component, OnInit } from '@angular/core';
import { timingSafeEqual } from 'crypto';

@Component({
    selector: 'app-board',
    templateUrl: './board.component.html',
    styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
    squares: any[];
    xIsNext: boolean;
    winner: string;

    constructor() { }

    ngOnInit() {
        this.newGame();
    }

    private newGame(): void {
        this.squares = Array(9).fill(null);
        this.winner = null;
        this.xIsNext = true;
    }

    get player() {
        return this.xIsNext ? 'X' : 'O';
    }

    // event click handler
    private makeMove(idx: number): void {
        if (!this.squares[idx]) {
            this.squares.splice(idx, 1, this.player);

        }
    }

    private calculateWinner(): void {
        const answerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < answerLines.length; i++) {
            const [a, b, c] = answerLines[i];

            if (
                this.squares[a] &&
                this.squares[a] === this.squares[b] &&
                this.squares[a] === this.squares[c]
            ) {
                return this.squares[a];
            }

        }
    }
}
