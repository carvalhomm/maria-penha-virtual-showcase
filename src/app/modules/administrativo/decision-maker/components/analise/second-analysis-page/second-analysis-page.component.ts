import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Documento } from 'src/app/models/documento.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { SecondAnalysis } from './second-analysis.interface';

@Component({
  selector: 'mpv-second-analysis-page',
  templateUrl: './second-analysis-page.component.html',
  styleUrls: ['./second-analysis-page.component.scss']
})
export class SecondAnalysisPageComponent implements OnInit {
  @Input() set setData(documento: Documento) {
    if (!documento) { return; }
    let risco = null;
    if (documento.juiz && documento.juiz.violenciasFisicasSofridas) {
      risco = documento.juiz.violenciasFisicasSofridas;
    } else {
      risco = documento.usuario.violenciasFisicasSofridas;
    }
    this.violenciasFisicasSofridas = risco;
    this.populateAnalysisObject();
    this.initFormGroup();
  }
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }
  private disableForm: boolean = false;
  private analysis: SecondAnalysis = {};
  private violenciasFisicasSofridas: string[];
  public formGroup: FormGroup;
  public formGroupAuxiliar: {label: string, key: string}[] = [];
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  constructor() { }

  ngOnInit(): void {
  }

  private cleanSpecialCharacters(texto: string): string {
    if (!texto) { return texto; }
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  private createAnalysisKey(violencia: string): string {
    if (!violencia || (!violencia.includes(' ') && !violencia.includes('/'))) { return this.cleanSpecialCharacters(violencia); }
    let violenceSplited = [];
    if (violencia.includes(' ')) {
      violenceSplited = violencia.split(' ');
    }
    if (violencia.includes('/')) {
      violenceSplited = violencia.split('/');
    }
    const newViolence = violenceSplited[0] + (violenceSplited[1].charAt(0).toUpperCase() + violenceSplited[1].slice(1));
    let remainingViolence = '';
    if (violenceSplited.length > 2) {
      remainingViolence = ' ';
      for (let i = 2; i <= violenceSplited.length - 1; i++) {
        remainingViolence += violenceSplited[i] + (i === violenceSplited.length - 1 ? '' : ' ');
      }
    }
    return this.createAnalysisKey(newViolence + remainingViolence);
  }

  private populateAnalysisObject() {
    for (const violencia of this.violenciasFisicasSofridas) {
      const key = this.createAnalysisKey(violencia.trim());
      this.analysis[key] = true;
      this.formGroupAuxiliar.push({label: violencia, key: key});
    }
  }

  private initFormGroup() {
    const formGroup = new FormGroup({});
    for (const violence of Object.keys(this.analysis)) {
      formGroup.addControl(violence, new FormControl({value: this.analysis[violence], disabled: this.disableForm}));
    }
    this.formGroup = formGroup;
  }

  private formToArray(): string[] {
    const violencias = [];
    for (const form of this.formGroupAuxiliar) {
      if (this.formGroup.get(form.key).value) {
        violencias.push(form.label);
      }
    }
    return violencias;
  }

  public parseControlKey(key: string): string {
    for (let i = 0; i <= key.length - 1; i++) {
      const char = key[i];
      if (char === char.toUpperCase()) {
        const splitted = key.split(char, 1);
        key = splitted[0] + ' ' + splitted[1];
        return this.parseControlKey(key);
      }
    }
    return key;
  }

  public checkCheckbox(event: MatCheckboxChange, key: string) {
    this.formGroup.get(key).setValue(event);
  }

  public addViolencia(violencia: string) {
    if (!violencia) { return; }
    const label = violencia.trim();
    const key = this.createAnalysisKey(label);
    if (!this.formGroup.contains(key)) {
      this.formGroup.addControl(key, new FormControl({value: true, disabled: this.disableForm}));
      this.formGroupAuxiliar.push({key: key, label: label});
    }
  }

  public previousPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {violenciasFisicasSofridas: this.formToArray()}});
    this.previousSlide.emit({previous: 1, changeStepper: true, stepper: {page: 2, tipo: 'Tipos de Violência'}});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {violenciasFisicasSofridas: this.formToArray()}});
    this.nextSlide.emit({next: 1, changeStepper: true, stepper: {page: 2, tipo: 'Perfil do Requerido'}});
  }

}
