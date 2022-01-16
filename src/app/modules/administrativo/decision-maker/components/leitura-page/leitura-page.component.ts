import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LeituraPage } from './leitura-page.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { FileReaderComponent } from 'src/app/shared/file-reader/file-reader.component';
import { Attachment } from 'src/app/models/usuario.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { Documento } from 'src/app/models/documento.interface';

@Component({
  selector: 'mpv-leitura-page',
  templateUrl: './leitura-page.component.html',
  styleUrls: ['./leitura-page.component.scss']
})
export class LeituraPageComponent implements OnInit {
  @Input() set setData(documentoDenuncia: Documento) {
    if (!documentoDenuncia) { return; }
    const midias = documentoDenuncia.usuario.midias;
    if (!midias) { return; }
    this.data = {
      pedidoMPU: null,
      provasAnexadas: [],
      relatoVitima: []
    };
    if (documentoDenuncia.usuario.relatoViolencia) {
      this.data.relatoVitima.push({originalName: documentoDenuncia.usuario.relatoViolencia, path: null});
    }
    this.createFormGroup(documentoDenuncia.numeroProcesso);
    this.midias = midias;
    this.parseMidias(midias);
    this.createDecisionBox(documentoDenuncia.pedidoAnalisado);
  }

  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }

  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  private disableForm: boolean = false;
  public midias: Attachment[];
  public data: LeituraPage;
  public decisionMade: {juiz: string; data: Date} = null;
  public formGroup: FormGroup;
  constructor(private matDialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {}

  private createFormGroup(processo: number) {
    this.formGroup = this.fb.group({
      numeroProcesso: [{value: processo ? processo : null, disabled: this.disableForm}, [Validators.required]]
    });
  }

  private createDecisionBox(decision: { juizResponsavel: string; nomeJuizResponsavel: string; data: Date; }) {
    if (this.disableForm) {
      this.decisionMade = {
        juiz: decision.nomeJuizResponsavel,
        data: decision.data
      };
    }
  }

  private parseMidias(midias: Attachment[]) {
    for (const midia of midias) {
      if (midia.path.includes('audios/relatos')) {
        this.data.relatoVitima.push(midia);
      } else if (midia.path.includes('imagensAnexo') || midia.path.includes('arquivosAnexo')) {
        this.data.provasAnexadas.push(midia);
      } else if (midia.path.includes('medida-protetiva')) {
        this.data.pedidoMPU = midia;
      }
    }
  }

  private getModalTitle(midia: string): string {
    return midia.includes('relatos') ? 'Relato da Vítima' : (midia.includes('medida-protetiva') ? 'Pedido de Medida Protetiva' : 'Arquivos anexados pela vítima');
  }

  public openMidia(midias: Attachment[], relatosTitle?: string) {
    if (!midias[0]) { return; }
    this.matDialog.open(FileReaderComponent, {data: {midias, title: relatosTitle ? relatosTitle : this.getModalTitle(midias[0].path)}});
  }

  public previousPage() {
    this.previousSlide.emit({previous: 0, changeStepper: false});
  }

  public nextPage() {
    if (this.formGroup.get('numeroProcesso').invalid) {
      this.formGroup.get('numeroProcesso').markAsTouched();
      return;
    }
    this.updateDenuncia.emit({innerKey: 'numeroProcesso', update: this.formGroup.getRawValue().numeroProcesso});
    this.nextSlide.emit({next: 1, changeStepper: true, stepper: {page: 2, tipo: 'Tipos de Violência'}});
  }

}
