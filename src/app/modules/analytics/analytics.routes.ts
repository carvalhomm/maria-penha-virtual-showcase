import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsAuthGuard } from './analytics.guard';

const routes: Routes = [
  { path: '', canActivate:[AuthGuard, AnalyticsAuthGuard], component: AnalyticsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyticsRoutingModule { }
