import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Documento } from 'src/app/models/documento.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { Stepper } from 'src/app/models/stepper.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { DecisionMakerService } from './decision-maker.service';

@Component({
  selector: 'mpv-decision-maker',
  templateUrl: './decision-maker.component.html',
  styleUrls: ['./decision-maker.component.scss']
})
export class DecisionMakerComponent implements OnInit, OnDestroy {
  public currentPageIndex = 0;
  public mode: 'feitos' | 'completos';
  public hideStepper = false;
  public stepper: Stepper = {
    page: 1,
    processo: '',
    tipo: 'Requerimento'
  };
  private onDestroy = new Subject<void>();
  get getDocumentoDenuncia(): Documento {
    return this.decisionMakerService.getDocumento;
  }
  get getPhysicViolence(): boolean {
    return this.decisionMakerService.getDocumento.usuario.violenciaFisica;
  }
  constructor(private decisionMakerService: DecisionMakerService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.mode = this.router.getCurrentNavigation().extras.state.mode as string;
      decisionMakerService.setDocumento = this.router.getCurrentNavigation().extras.state.process as Documento;
      decisionMakerService.setDocumentoId = this.router.getCurrentNavigation().extras.state.id as string;
    } else {
      router.navigate(['administrativo']);
    }
  }

  ngOnInit(): void {
    this.loadDenuncia();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private loadDenuncia() {
    const documentoDenuncia = this.getDocumentoDenuncia;
    this.stepper.processo = documentoDenuncia.usuario.nomeCompleto;
  }

  private changeStepper(stepper: Stepper) {
    if (!stepper) { return; }
    this.stepper.tipo = stepper.tipo;
    this.stepper.page  = stepper.page;
  }

  public updateDenuncia(data: DenunciaUpdateEvent) {
    if (this.mode === 'completos') { return; }
    this.decisionMakerService.updateDenuncia(data);
  }

  public previousSlide(event: SlideEvent): void {
    if (event.previous === 0) {
      this.router.navigate(['administrativo']);
    }
    this.hideStepper = event.hideStepper ? true : false;
    this.changeStepper(event.changeStepper ? event.stepper : null);
    this.currentPageIndex = this.currentPageIndex - event.previous;
  }

  public nextSlide(event: SlideEvent): void {
    this.hideStepper = event.hideStepper ? true : false;
    this.changeStepper(event.changeStepper ? event.stepper : null);
    this.currentPageIndex = this.currentPageIndex + event.next;
  }
}
