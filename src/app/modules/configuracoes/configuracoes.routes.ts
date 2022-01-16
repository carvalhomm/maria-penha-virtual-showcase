import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { ConfiguracoesComponent } from './configuracoes.component';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard], component: ConfiguracoesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracoesRoutingModule { }