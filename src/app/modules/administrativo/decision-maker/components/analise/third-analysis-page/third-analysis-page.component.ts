import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Documento } from 'src/app/models/documento.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { ThirdAnalysisInterface } from './third-analysis.interface';

@Component({
  selector: 'mpv-third-analysis-page',
  templateUrl: './third-analysis-page.component.html',
  styleUrls: ['./third-analysis-page.component.scss']
})
export class ThirdAnalysisPageComponent implements OnInit {
  @Input() set physicViolenceMarked(physicViolence: boolean) {
    this.physicViolence = physicViolence;
  }
  @Input() set setData(data: Documento) {
    if (!data) { return; }
    let risco = null;
    if (data.juiz && data.juiz.comportamentosAgressor) {
      risco = data.juiz.comportamentosAgressor;
    } else {
      risco = data.agressor;
    }
    this.thirdAnalysis = {
      agressivo: risco.agressivo,
      ciumento: risco.ciumento,
      controlador: risco.controlador,
      crimeOrganizado: risco.crimeOrganizado,
      usaAlcool: risco.usaAlcool,
      usaDrogas: risco.usaDrogas
    };
    this.initFormGroup();
  }
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  private disableForm: boolean = false;
  private physicViolence: boolean;
  private thirdAnalysis: ThirdAnalysisInterface;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      agressivo: [{value: this.thirdAnalysis.agressivo, disabled: this.disableForm}],
      ciumento: [{value: this.thirdAnalysis.ciumento, disabled: this.disableForm}],
      controlador: [{value: this.thirdAnalysis.controlador, disabled: this.disableForm}],
      crimeOrganizado: [{value: this.thirdAnalysis.crimeOrganizado, disabled: this.disableForm}],
      usaAlcool: [{value: this.thirdAnalysis.usaAlcool, disabled: this.disableForm}],
      usaDrogas: [{value: this.thirdAnalysis.usaDrogas, disabled: this.disableForm}]
    });
  }

  private goToPhysicViolencePage(): boolean {
    return this.physicViolence;
  }

  public previousPage() {
    const violence = this.goToPhysicViolencePage();
    const pagesReturn = violence ? 1 : 2;
    const newTipo = violence ? 'Violência Física' : 'Tipos de Violência';
    this.updateDenuncia.emit({innerKey: 'juiz', update: {comportamentosAgressor: this.formGroup.getRawValue()}});
    this.previousSlide.emit({previous:pagesReturn, changeStepper: true, stepper: {page: 2, tipo: newTipo}});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {comportamentosAgressor: this.formGroup.getRawValue()}});
    this.nextSlide.emit({next: 1, changeStepper: true, stepper: {page: 3, tipo: 'Decisão'}});
  }

}
