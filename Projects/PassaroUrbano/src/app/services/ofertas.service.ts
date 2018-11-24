import { Injectable } from '@angular/core';
import { Oferta } from '../shared/models/oferta';
import { resolve } from 'dns';
import { reject } from 'q';

@Injectable({
    providedIn: 'root'
})
export class OfertasService {

    ofertas: Array<Oferta> = [
        {
            id: 1,
            categoria: 'restaurante',
            titulo: 'Super Burger',
            descricao_oferta: 'Rodízio de Mini-hambúrger com opção de entrada.',
            anunciante: 'Original Burger',
            valor: 29.90,
            destaque: true,
            imagens: [
                { url: '/assets/ofertas/1/img1.jpg' },
                { url: '/assets/ofertas/1/img2.jpg' },
                { url: '/assets/ofertas/1/img3.jpg' },
                { url: '/assets/ofertas/1/img4.jpg' }
            ]
        },
        {
            id: 2,
            categoria: 'restaurante',
            titulo: 'Cozinha Mexicana',
            descricao_oferta: 'Almoço ou Jantar com Rodízio Mexicano delicioso.',
            anunciante: 'Mexicana',
            valor: 32.90,
            destaque: true,
            imagens: [
                { url: '/assets/ofertas/2/img1.jpg' },
                { url: '/assets/ofertas/2/img2.jpg' },
                { url: '/assets/ofertas/2/img3.jpg' },
                { url: '/assets/ofertas/2/img4.jpg' }
            ]

        },
        {
            id: 4,
            categoria: 'diversao',
            titulo: 'Estância das águas',
            descricao_oferta: 'Diversão garantida com piscinas, trilhas e muito mais.',
            anunciante: 'Estância das águas',
            valor: 31.90,
            destaque: true,
            imagens: [
                { url: '/assets/ofertas/3/img1.jpg' },
                { url: '/assets/ofertas/3/img2.jpg' },
                { url: '/assets/ofertas/3/img3.jpg' },
                { url: '/assets/ofertas/3/img4.jpg' },
                { url: '/assets/ofertas/3/img5.jpg' },
                { url: '/assets/ofertas/3/img6.jpg' }
            ]
        }
    ];

    constructor() { }

    public getOfertas2() {
        return this.getOfertas2;
    }

    public getOfertas(): Promise<Oferta[]> {

        return new Promise(( resolve , reject) => {
            console.log('Passou no Promise');
            let flag = true;
            if (flag) {
                setTimeout(() => resolve(this.ofertas), 3000);

            } else {
                reject({ erroCode: 404, erroMessage: 'Not Found' });
            }
        })
        .then(( ofertas: Oferta[]) => {
            // fazer alguma tratativa
            console.log('primeiro then');
            return ofertas;
        })
        .then(( ofertas: Oferta[]) => {
            // fazer uma outra tratativa
            console.log('segundo then');
            return new Promise((resolve2, reject2) => {
                setTimeout(() => { resolve2( ofertas );
                }, 3000);
            });
        })
        .then(( ofertas: Oferta[] ) => {
            console.log('terceiro then executado após 3 segundos porque estava aguardando uma promisse ser resolvida');
            return ofertas;
        });
        // .then
        // .then
    }
}
