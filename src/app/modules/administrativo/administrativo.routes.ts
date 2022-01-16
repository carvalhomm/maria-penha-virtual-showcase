import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AdministrativoAuthGuard } from './administrativo.guard';
import { AdministrativoComponent } from './administrativo.component';
import { ProcessosComponent } from './processos/processos.component';
import { DecisionMakerComponent } from './decision-maker/decision-maker.component';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard, AdministrativoAuthGuard], component: AdministrativoComponent },
  { path: 'processos', canActivate:[AuthGuard, AdministrativoAuthGuard], component: ProcessosComponent },
  { path: 'processos/:id', canActivate:[AuthGuard, AdministrativoAuthGuard], component: DecisionMakerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
