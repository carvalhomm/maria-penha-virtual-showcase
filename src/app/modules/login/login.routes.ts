import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoAuthGuard } from './noauth.guard';
import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: '', canActivate:[NoAuthGuard], component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
