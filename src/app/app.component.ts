import { Component } from '@angular/core';

@Component({
  selector: 'mpv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'maria-penha-administrativo';
  constructor() {
    console.log(this.title + ' [In Development] v0.0.8');
    console.log('########################################################################');
    console.log('Equipe Responsável pelo Projeto Maria da Penha Virtual');
    console.log(' # Hassany Chaves (Product Owner, Prototipação e Jurídico)');
    console.log(' # João Vítor Oliveira Ferreira (Fullstack Developer): https://github.com/JoaovitorFerreira');
    console.log(' # Luisa Costa Rodrigues (UX/UI Analyst): https://github.com/luisacro');
    console.log(' # Matheus Carvalho Gomes Moreira (Software Architect and Software Engineer): https://github.com/carvalhomm');
    console.log(' # Rafael Wanderley (Coordenador, Product Owner, Prototipação e Jurídico)');
    console.log(' # Yuri Arruda Farias (Fullstack Developer): https://github.com/farias-ar');
  }
}
