import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Documento } from 'src/app/models/documento.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { ThirdRisco } from './third-risco.interface';

@Component({
  selector: 'mpv-third-risco-page',
  templateUrl: './third-risco-page.component.html',
  styleUrls: ['./third-risco-page.component.scss']
})
export class ThirdRiscoPageComponent implements OnInit {
  @Input() public set setData(data: Documento) {
    if (!data) { return; }
    let risco = null;
    if (data.juiz && data.juiz.medidasDeferidas) {
      risco = data.juiz.medidasDeferidas;
    } else {
      risco = data.usuario;
    }
    this.thirdRisco = {
      afastamentoDomicilio: {marked: risco.afastamentoDomicilio, label: 'Afastamento do domicílio de convivência'},
      educacaoRecuperacao: {marked: risco.educacaoRecuperacao, label: 'Comparecimento do(a) agressor(a) a programas de recuperação e reeducação'},
      pensao: {marked: risco.pensao, label: 'Pensão alimentícia'},
      proibicaoDeContato: {marked: risco.proibicaoDeContato, label: 'Proibição de contato ou proximidade com a vítima, seus familiares e testemunhas'},
      suspensaoPorteArma: {marked: risco.suspensaoPorteArma, label: 'Suspensão ou restrição do porte de armas'},
      suspensaoVisitaFilhos: {marked: risco.suspensaoVisitaFilhos, label: 'Suspensão ou restrição de visitas aos seus filhos'},
      outrasMedidasDeferidas: risco.outrasMedidasDeferidas ? risco.outrasMedidasDeferidas : {}
    };
    this.initFormGroup();
  }
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }
  private disableForm: boolean = false;
  public formGroup: FormGroup;
  public thirdRisco: ThirdRisco;
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {}

  private initFormGroup() {
    this.formGroup = this.fb.group({
      afastamentoDomicilio: [{value: this.thirdRisco.afastamentoDomicilio.marked, disabled: this.disableForm}],
      educacaoRecuperacao: [{value: this.thirdRisco.educacaoRecuperacao.marked, disabled: this.disableForm}],
      pensao: [{value: this.thirdRisco.pensao.marked, disabled: this.disableForm}],
      proibicaoDeContato: [{value: this.thirdRisco.proibicaoDeContato.marked, disabled: this.disableForm}],
      suspensaoPorteArma: [{value: this.thirdRisco.suspensaoPorteArma.marked, disabled: this.disableForm}],
      suspensaoVisitaFilhos: [{value: this.thirdRisco.suspensaoVisitaFilhos.marked, disabled: this.disableForm}],
      adicionarOutraMedida: [{value: null, disabled: this.disableForm}]
    });
  }

  private createMedidaProtetiva(label: string, key: string) {
    this.formGroup.addControl(key, this.fb.control([true]));
    this.thirdRisco.outrasMedidasDeferidas[key] = {label: label, marked: true};
  }

  private getUpdateChanges(): {[key: string]: ThirdRisco} {
    const thirdRisco = Object.assign({}, this.thirdRisco);
    return { medidasDeferidas: thirdRisco };
  }

  private createFormKey(value: string, key: string): string {
    if (!value) { return key; }
    const spaceIndex = value.indexOf(' ');
    if (!spaceIndex || spaceIndex <= 0) { return key; }
    key += value.substring(0, spaceIndex).trim();
    return this.createFormKey(value.substring(spaceIndex + 1).trim(), key);
  }

  public addMedidaProtetiva() {
    const novaMedida = this.formGroup.get('adicionarOutraMedida').value;
    if (!novaMedida) { return; }
    const medida = novaMedida.trim();
    this.createMedidaProtetiva(medida, this.createFormKey(medida, ''))
    this.formGroup.get('adicionarOutraMedida').reset();
  }

  public checkChanged(event: MatCheckboxChange, key: string, outrasMedidas: boolean) {
    if (outrasMedidas) {
      this.thirdRisco.outrasMedidasDeferidas[key].marked = event.checked;
    } else {
      this.thirdRisco[key].marked = event.checked;
    }
  }

  public previousPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: this.getUpdateChanges()});
    this.previousSlide.emit({previous: 1, changeStepper: true, stepper: {page: 3, tipo: 'Decisão'}});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: this.getUpdateChanges()});
    this.nextSlide.emit({next: 1, changeStepper: true, stepper: {page: 3, tipo: 'Decisão/Medidas'}});
  }

}
