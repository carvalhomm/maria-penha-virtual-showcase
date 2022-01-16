import { ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { UserService } from '../services/user.service';
import { DomainService } from '../services/domain.service';
import { PdfHeroService } from '../services/pdf-hero.service';
import { SidebarService } from '../shared/sidebar/sidebar.service';
import { GlobalErrorInterceptor } from './interceptors/GlobalErrorInterceptor.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@NgModule({
  imports: [],
  exports: [],
  providers: [
    UserService,
    DomainService,
    PdfHeroService,
    SidebarService,
    AuthGuard,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorInterceptor
    }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`Core Module has already been loaded. Import Core modules in the AppModule only.`);
    }
  }
}