import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Documento } from 'src/app/models/documento.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { FirstAnalysis } from './first-analysis.interface';

@Component({
  selector: 'mpv-first-analysis-page',
  templateUrl: './first-analysis-page.component.html',
  styleUrls: ['./first-analysis-page.component.scss']
})
export class FirstAnalysisPageComponent implements OnInit {
  @Input() set setData(documento: Documento) {
    if (!documento) { return; }
    let risco = null;
    if (documento.juiz && documento.juiz.violenciasSofridas) {
      risco = documento.juiz.violenciasSofridas;
    } else {
      risco = documento.usuario;
    }
    this.analysis = {
      violenciaFisica: risco.violenciaFisica,
      violenciaMoral: risco.violenciaMoral,
      violenciaPatrimonial: risco.violenciaPatrimonial,
      violenciaPsicologica: risco.violenciaPsicologica,
      violenciaSexual: risco.violenciaSexual
    };
    this.initFormGroup();
  }

  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }

  private analysis: FirstAnalysis;
  private disableForm: boolean = false;
  public formGroup: FormGroup;
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  private initFormGroup() {
    this.formGroup = this.fb.group({
      violenciaFisica: [{value: this.analysis.violenciaFisica, disabled: this.disableForm}],
      violenciaMoral: [{value: this.analysis.violenciaMoral, disabled: this.disableForm}],
      violenciaPatrimonial: [{value: this.analysis.violenciaPatrimonial, disabled: this.disableForm}],
      violenciaPsicologica: [{value: this.analysis.violenciaPsicologica, disabled: this.disableForm}],
      violenciaSexual: [{value: this.analysis.violenciaSexual, disabled: this.disableForm}]
    });
  }

  private calculateNextStep(): SlideEvent {
    if (this.formGroup.get('violenciaFisica').value) {
      return {next: 1, changeStepper: true, stepper: {page: 2, tipo: 'Violência Física'}};
    } else {
      return {next: 2, changeStepper: true, stepper: {page: 2, tipo: 'perfil do Requerido'}};
    }
  }

  public previousPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {violenciasSofridas: this.formGroup.getRawValue()}});
    this.previousSlide.emit({previous: 1, changeStepper: true, stepper: {page: 1, tipo: 'Requerimento'}});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {violenciasSofridas: this.formGroup.getRawValue()}});
    this.nextSlide.emit(this.calculateNextStep());
  }

}
