import { NgModule } from '@angular/core';
import { AdministrativoComponent } from './administrativo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdministrativoRoutingModule } from './administrativo.routes';
import { AdministrativoAuthGuard } from './administrativo.guard';
import { ProcessosComponent } from './processos/processos.component';

@NgModule({
  declarations: [AdministrativoComponent, ProcessosComponent],
  imports: [
    SharedModule,
    AdministrativoRoutingModule
  ],
  providers: [
    AdministrativoAuthGuard
  ]
})
export class AdministrativoModule { }
