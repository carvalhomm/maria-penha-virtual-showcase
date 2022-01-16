import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { NoAuthGuard } from './noauth.guard';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login.routes';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  providers: [
    NoAuthGuard
  ]
})
export class LoginModule { }
