import { NgModule } from '@angular/core';
import { ConfiguracoesComponent } from './configuracoes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfiguracoesRoutingModule } from './configuracoes.routes';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from 'src/app/core/interceptors/GlobalHttpInterceptor.service';
import { UserFormComponent } from './user-form/user-form.component';
import { ComarcaFormComponent } from './comarca-form/comarca-form.component';
import { PassFormComponent } from './pass-form/pass-form.component';

@NgModule({
  declarations: [
    ConfiguracoesComponent,
    UserFormComponent,
    ComarcaFormComponent,
    PassFormComponent
  ],
  imports: [
    SharedModule,
    ConfiguracoesRoutingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
  ]
})
export class ConfiguracoesModule { }
