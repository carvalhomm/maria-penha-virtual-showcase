import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalyticsComponent } from './analytics.component';
import { AnalyticsAuthGuard } from './analytics.guard';
import { AnalyticsRoutingModule } from './analytics.routes';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { GlobalHttpInterceptor } from 'src/app/core/interceptors/GlobalHttpInterceptor.service';

@NgModule({
  declarations: [
    AnalyticsComponent,
    ChartComponent
  ],
  imports: [
    SharedModule,
    NgxChartsModule,
    AnalyticsRoutingModule
  ],
  providers: [
    AnalyticsAuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
  ]
})
export class AnalyticsModule { }
