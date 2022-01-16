import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AdministrativoAuthGuard } from '../administrativo.guard';
import { DecisionMakerComponent } from './decision-maker.component';

const routes: Routes = [
  { path: ':id', canActivate:[AuthGuard, AdministrativoAuthGuard], component: DecisionMakerComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionMakerRoutingModule { }
