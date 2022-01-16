import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { ChangeEvent, CKEditorComponent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { DecisionMakerService } from '../../../decision-maker.service';
import { PdfHeroService } from 'src/app/services/pdf-hero.service';
import { CKEditor5 } from '@ckeditor/ckeditor5-angular';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

@Component({
  selector: 'mpv-fourth-risco-page',
  templateUrl: './fourth-risco-page.component.html',
  styleUrls: ['./fourth-risco-page.component.scss']
})
export class FourthRiscoPageComponent implements OnInit {
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }
  public editor = DecoupledEditor;
  public editorConfig = {
    toolbar: {
      items: [
          'fontfamily', 'fontsize', '|',
          'bold', 'italic', '|',
          'link', '|',
          'outdent', 'indent', 'alignment', '|',
          'bulletedList', 'numberedList', '|',
          'undo', 'redo'
      ],
      shouldNotGroupWhenFull: true
    },
    language: 'pt-br'
  };
  public document: string;
  public disableForm: boolean = false;
  private documentEditor: CKEditor5.Editor;
  @ViewChild('ckeditor') public ckeditor: CKEditorComponent;
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  constructor(private decisionService: DecisionMakerService, private pdfHero: PdfHeroService) { }

  ngOnInit(): void {
    const documento = this.decisionService.getDocumento;
    if (documento.juiz && documento.juiz.minutaDecisao) {
      this.document = documento.juiz.minutaDecisao;
    } else {
      this.document = this.pdfHero.generateDocument(documento);
    }
  }

  public onReady(editor) {
    this.documentEditor = this.ckeditor.editorInstance;
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  public onChange( { editor }: ChangeEvent ) {
    const data = editor.getData();
    this.document = data;
  }

  public previousPage() {
    this.previousSlide.emit({previous: 1, changeStepper: true, stepper: {page: 3, tipo: 'Medidas Deferidas'}});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: {minutaDecisao: this.document}});
    this.nextSlide.emit({next: 1, changeStepper: false, hideStepper: true});
  }

}
