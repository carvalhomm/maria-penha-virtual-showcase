import { NgModule } from '@angular/core';
import { FileReaderComponent } from './file-reader/file-reader.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HeaderComponent } from './header/header.component';
import { StepperComponent } from './stepper/stepper.component';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from '../core/angular-material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { GlobalHttpInterceptor } from '../core/interceptors/GlobalHttpInterceptor.service';
import { DatePipe } from './pipes/date.pipe';

@NgModule({
  declarations: [
    FileReaderComponent,
    HeaderComponent,
    StepperComponent,
    WarningDialogComponent,
    SidebarComponent,
    DatePipe
  ],
  imports: [
    PdfViewerModule,
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularSvgIconModule,
  ],
  exports: [
    FileReaderComponent,
    HeaderComponent,
    StepperComponent,
    SidebarComponent,
    DatePipe,
    PdfViewerModule,
    CommonModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularSvgIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: GlobalHttpInterceptor,
      multi: true
    }
  ]
})
export class SharedModule {}
