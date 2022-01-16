import { Component, OnInit } from '@angular/core';
import { Documento } from 'src/app/models/documento.interface';
import { ProcessosService } from './processos.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

export interface IdDocumento extends Documento {
  id: string;
}

@Component({
  selector: 'mpv-processos',
  templateUrl: './processos.component.html',
  styleUrls: ['./processos.component.scss'],
  providers: [ProcessosService]
})
export class ProcessosComponent implements OnInit {
  public processos: IdDocumento[];
  public processoMode: string = null;

  constructor(private processosService: ProcessosService, private userService: UserService, private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.processoMode = this.router.getCurrentNavigation().extras.state.mode as string;
    } else {
      router.navigate(['administrativo']);
    }
  }

  ngOnInit(): void {
    this.getProcessos();
  }

  public getProcessos() {
    this.processosService.getProcessos(this.processoMode, this.userService.getUserClaims.juizadoResponsavel).then(processos => this.processos = processos)
      .catch(error => {
        console.log('error geting lista processos --> ', error);
        this.processos = null;
      });
  }

  public judgeProcess(process: IdDocumento): void  {
    const id = process.id;
    const formatProcess = { ...process };
    delete formatProcess.id;
    this.router.navigate(['/administrativo/processos', id], {state: {process: formatProcess, id: id, mode: this.processoMode}});
  }
}
