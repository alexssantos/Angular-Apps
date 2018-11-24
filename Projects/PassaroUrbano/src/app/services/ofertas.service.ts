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
      Console.log('Passou no Primise');

      let flag = true;
      if (flag) {
        resolve(this.ofertas)

      } else {
        reject({ erroCode: 404, erroMessage: 'Not Found'});
      }
    })
  }
}
