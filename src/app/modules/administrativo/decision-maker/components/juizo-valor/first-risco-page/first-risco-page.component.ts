import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Juiz } from 'src/app/models/Juiz.interface';
import { SlideEvent } from 'src/app/models/slide-event.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { DecisionMakerService } from '../../../decision-maker.service';

@Component({
  selector: 'mpv-first-risco-page',
  templateUrl: './first-risco-page.component.html',
  styleUrls: ['./first-risco-page.component.scss']
})
export class FirstRiscoPageComponent implements OnInit, AfterViewInit {
  @Input() setMode(mode: 'feitos' | 'completos') {
    this.disableForm = mode === 'feitos' ? false : true;
  }
  @Output() public previousSlide = new EventEmitter<SlideEvent>();
  @Output() public nextSlide = new EventEmitter<SlideEvent>();
  @Output() public updateDenuncia = new EventEmitter<DenunciaUpdateEvent>();
  private disableForm: boolean = false;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder, private decisionService: DecisionMakerService) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  ngAfterViewInit(): void {
    const documento = this.decisionService.getDocumento;
    if (documento.juiz) {
      this.populateFormGroup(documento.juiz);
    }
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      riscoViolencia: [{value: null, disabled: this.disableForm}, [Validators.required]],
      perfilRequerido: [{value: null, disabled: this.disableForm}, [Validators.required]]
    });
  }

  private populateFormGroup(juiz: Juiz) {
    if (juiz.perfilRequerido || juiz.riscoViolencia) {
      this.formGroup.get('riscoViolencia').setValue(juiz.riscoViolencia);
      this.formGroup.get('perfilRequerido').setValue(juiz.perfilRequerido);
    }
  }

  public previousPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: this.formGroup.getRawValue()});
    this.previousSlide.emit({previous: 1, changeStepper: false});
  }

  public nextPage() {
    this.updateDenuncia.emit({innerKey: 'juiz', update: this.formGroup.getRawValue()});
    this.nextSlide.emit({next: 1, changeStepper: false});
  }

}
