import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AdministrativoModule } from './modules/administrativo/administrativo.module';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginModule } from './modules/login/login.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ConfiguracoesModule } from './modules/configuracoes/configuracoes.module';
import { DecisionMakerModule } from './modules/administrativo/decision-maker/decision-maker.module';
import { CoreModule } from './core/core.module';
import { AngularSvgIconModule } from 'angular-svg-icon';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularSvgIconModule.forRoot(),
    CoreModule,
    SharedModule,
    LoginModule,
    AdministrativoModule,
    DecisionMakerModule,
    AnalyticsModule,
    ConfiguracoesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
