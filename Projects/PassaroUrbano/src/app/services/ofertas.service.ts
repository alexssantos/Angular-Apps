import { Injectable } from '@angular/core';
import { Oferta } from '../shared/models/oferta';

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    ofertas: Array<Oferta>;

    constructor() { }

    public getOfertas2() {
        return this.getOfertas2;
    }

    public getOfertas(): Promise<Oferta[]> {

        return new Promise((resolve, reject) => {
            console.log('Passou no Promise');
            let flag = true;
            if (flag) {
                setTimeout(() => resolve(this.ofertas), 3000);

            } else {
                reject({ erroCode: 404, erroMessage: 'Not Found' });
            }
        })
        .then((ofertas: Oferta[]) => {  // sincrona
            // logica
            console.log('primeiro then');
            return ofertas;
        });
        // .then
        // .then
    }
}
