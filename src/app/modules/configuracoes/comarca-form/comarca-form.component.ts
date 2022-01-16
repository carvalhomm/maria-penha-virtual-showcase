import { Component, OnInit } from '@angular/core';
import { Juizado } from '../../../models/juizado.interface';
import { ComarcaFormService } from './comarca-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mpv-comarca-form',
  templateUrl: './comarca-form.component.html',
  styleUrls: ['./comarca-form.component.scss'],
  providers: [ComarcaFormService]
})
export class ComarcaFormComponent implements OnInit {
  @Input() mode(mode: boolean) {
    this.createMode = mode;
  }
  @Input() set setLocations(locations: ILocation) {
    this.locations = locations;
    if (this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initFormGroup(null);
    } else if (!this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initJuizadoSelect();
    }
  }

  @Input() set setJuizados(juizados: Juizado[]) {
    this.juizados = juizados;
    if (this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initFormGroup(null);
    } else if (!this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initJuizadoSelect();
    }
  }
  public abrangenciaLabel: string = '';
  public createMode: boolean;
  public locations: ILocation;
  public juizados: Juizado[];
  public juizado: Juizado;
  public locais: string[] = [];
  public locaisFilter: string[] = [];
  public locaisAbrangidos: string[] = [];
  public selectJuizadoForm: FormGroup;
  public formGroup: FormGroup;
  public loading: boolean = true;

  constructor(private comarcaService: ComarcaFormService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {}

  private initJuizadoSelect() {
    this.selectJuizadoForm = this.fb.group({
      juizadoSelection: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  private initFormGroup(juizado: Juizado) {
    let tipoAbrangencia = null;
    if (juizado) {
      tipoAbrangencia = juizado.cidadesAbrangidas ? 'cidadesAbrangidas' : 'bairrosAbrangidos';
    }
    this.formGroup = this.fb.group({
      nome: [juizado ? juizado.nome : null, [Validators.required]],
      email: [juizado ? juizado.email : null, [Validators.email]],
      juizTitular: [juizado ? juizado.juizTitular : null],
      tipoAbrangencia: [tipoAbrangencia, [Validators.required]],
    });
  }

  private initLocais() {
    if (this.abrangenciaLabel === 'cidadesAbrangidas') {
      const estados = Object.keys(this.locations);
      for (const estado of estados) {
        const cidades = Object.keys(this.locations[estado]);
        this.locais.concat(cidades);
      }
    } else {
      const estados = Object.keys(this.locations);
      for (const estado of estados) {
        const cidades = Object.keys(this.locations[estado]);
        for (const cidade of cidades) {
          const bairros: string[] = this.locations[estado][cidade];
          this.locais.concat(bairros);
        }
      }
    }
    this.locaisFilter = this.locais;
  }

  private createJuizadoKey(value: string, key: string): string {
    if (!value) { return key; }
    const spaceIndex = value.indexOf(' ');
    if (!spaceIndex || spaceIndex <= 0) { return key; }
    key += value.substring(0, spaceIndex).trim();
    return this.createJuizadoKey(value.substring(spaceIndex + 1).trim(), key);
  }

  private constructJuizado(): Juizado {
    const juizado = this.formGroup.getRawValue();
    juizado.key = this.createJuizadoKey(juizado.nome, '');
    if (juizado.tipoAbrangencia === 'cidadesAbrangidas') {
      juizado.cidadesAbrangidas = this.locaisAbrangidos;
    } else {
      juizado.bairrosAbrangidos = this.locaisAbrangidos;
    }
    delete juizado.tipoAbrangencia;
    return juizado;
  }

  public abrangenciaSelected() {
    this.abrangenciaLabel = this.formGroup.get('tipoAbrangencia').value === 'cidadesAbrangidas' ? 'Cidades' : 'Bairros';
    this.initLocais();
  }

  public juizadoSelected(juizado: Juizado) {
    this.juizado = juizado;
    this.initFormGroup(juizado);
  }

  public filterLocais(filter: string) {
    if (!filter || filter === '') { this.locaisFilter = this.locais; return; }
    this.locaisFilter.filter(local => local.includes(filter));
  }

  public selectLocal(local: string, del?: boolean) {
    if (!del) { this.locaisAbrangidos.push(local); return; }
    const indexDel = this.locaisAbrangidos.findIndex(loc => loc === local);
    this.locaisAbrangidos.splice(indexDel, 1);    
  }

  public saveJuizado() {
    if (this.formGroup.invalid) { return; }
    const juizado = this.constructJuizado();
    this.comarcaService.saveComarca(juizado).then(() => this.snackBar.open('Juizado salvo com sucesso', null, {duration: 5000}));
  }

  public deleteJuizado() {
    if (this.createMode) { return; }
    if (this.formGroup.invalid) { return; }
    const juizado = this.constructJuizado();
    this.comarcaService.deleteComarca(juizado).then(() => this.snackBar.open('Juizado deletado com sucesso', null, {duration: 5000}));
  }

}
