import { NgModule } from '@angular/core';
import { DecisionMakerComponent } from './decision-maker.component';
import { DecisionMakerRoutingModule } from './decision-maker.routes';
import { LeituraPageComponent } from './components/leitura-page/leitura-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DecisionMakerService } from './decision-maker.service';
import { FirstAnalysisPageComponent } from './components/analise/first-analysis-page/first-analysis-page.component';
import { SecondAnalysisPageComponent } from './components/analise/second-analysis-page/second-analysis-page.component';
import { ThirdAnalysisPageComponent } from './components/analise/third-analysis-page/third-analysis-page.component';
import { FirstJuizoValorPageComponent } from './components/juizo-valor/first-juizo-valor-page/first-juizo-valor-page.component';
import { FirstRiscoPageComponent } from './components/juizo-valor/first-risco-page/first-risco-page.component';
import { SecondRiscoPageComponent } from './components/juizo-valor/second-risco-page/second-risco-page.component';
import { ThirdRiscoPageComponent } from './components/juizo-valor/third-risco-page/third-risco-page.component';
import { FourthRiscoPageComponent } from './components/juizo-valor/fourth-risco-page/fourth-risco-page.component';
import { DecisionMadePageComponent } from './components/juizo-valor/decision-made-page/decision-made-page.component';
import { AdministrativoAuthGuard } from '../administrativo.guard';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [
    DecisionMakerComponent,
    LeituraPageComponent,
    FirstAnalysisPageComponent,
    SecondAnalysisPageComponent,
    ThirdAnalysisPageComponent,
    FirstJuizoValorPageComponent,
    FirstRiscoPageComponent,
    SecondRiscoPageComponent,
    ThirdRiscoPageComponent,
    FourthRiscoPageComponent,
    DecisionMadePageComponent
  ],
  imports: [
    CKEditorModule,
    SharedModule,
    DecisionMakerRoutingModule
  ],
  providers: [DecisionMakerService, AdministrativoAuthGuard]
})
export class DecisionMakerModule { }
