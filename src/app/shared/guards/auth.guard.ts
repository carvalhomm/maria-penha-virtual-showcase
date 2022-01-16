import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomainService } from 'src/app/services/domain.service';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.userService.isLoggedIn()
      .pipe(
        map(res => {
          if (res) {
            return res;
          } else {
            this.router.navigateByUrl('/login');
            return false;
          }
        })
      );
  }
}
