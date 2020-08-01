import { Injectable } from '@angular/core';


@Injectable({
    //using in all project
    providedIn: 'root'
})
export class MathUtils {

    public static getRandom(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
	}

	public static getRandomChoice(): number {
		let ran = (Math.random() * 2 -1);
		return (ran < -0.3) ? -1 
						: (ran > 0.3) ? 1
						: 0;
	}
	
	public static getlistRandom(min: number, max: number, qtd: number): number[] {
        return Array.from(Array(qtd).keys()).map(numb => this.getRandom(min, max));
    }

    //static doSomething(val: string) { return val; }

    //static doSomethingElse(val: string) { return val; }
}