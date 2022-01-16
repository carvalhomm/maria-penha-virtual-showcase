import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules  } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login' },
  { path: 'administrativo', loadChildren: () => import('./modules/administrativo/administrativo.module').then(mod => mod.AdministrativoModule) },
  { path: 'analytics', loadChildren: () => import('./modules/analytics/analytics.module').then(mod => mod.AnalyticsModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(mod => mod.LoginModule) },
  { path: 'configuracoes', loadChildren: () => import('./modules/configuracoes/configuracoes.module').then(mod => mod.ConfiguracoesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
