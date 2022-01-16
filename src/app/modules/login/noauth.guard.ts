import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomainService } from 'src/app/services/domain.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private domainService: DomainService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn()
      .pipe(
        map(res => {
          if (!res) {
            return true;
          } else {
            const modulePermissions = this.domainService.getModulePermissions;
            if (modulePermissions) {
              if (modulePermissions.administrativo) {
                this.router.navigateByUrl('/administrativo');
              } else if (modulePermissions.analytics) {
                this.router.navigateByUrl('/analytics');
              }
              return false;
            }
            this.router.navigateByUrl('/administrativo');
          }
        })
      );
  }
}
