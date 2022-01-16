import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { Documento } from 'src/app/models/documento.interface';


@Component({
  selector: 'mpv-first-juizo-valor-page',
  templateUrl: './first-juizo-valor-page.component.html',
  styleUrls: ['./first-juizo-valor-page.component.scss']
})
export class FirstJuizoValorPageComponent implements OnInit {
  @Input() set setData(data: Documento) {
    if (!data) { return; }
    if (data?.pedidoAnalisado && data?.juiz?.decisaoJuiz) {
      this.decisaoJuiz = data.juiz.decisaoJuiz;
    }
  }
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  public decisaoJuiz: {decideNow: boolean, waitForContraditory: boolean} = {decideNow: true, waitForContraditory: true};
  constructor() { }

  ngOnInit(): void {}

  public previousPage() {
    this.previousSlide.emit({previous: 1, changeStepper: true, stepper: {page: 2, tipo: 'Perfil do Requerido'}});
  }

  public decideNow() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {decisaoJuiz: {decideNow: true, waitForContraditory: false}}});
    this.nextSlide.emit({next: 1, changeStepper: false});
  }

  public waitForContraditory() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {decisaoJuiz: {decideNow: false, waitForContraditory: true}}});
    this.nextSlide.emit({next: 1, changeStepper: true, stepper: {page: 3, tipo: 'Esperar Contraditório'}});
  }

}
