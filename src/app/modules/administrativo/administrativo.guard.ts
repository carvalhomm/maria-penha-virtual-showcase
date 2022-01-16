import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CanActivate, Router } from '@angular/router';
import { ModulePermissions } from 'src/app/models/configuracao.interface';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UserService,
    private firestore: AngularFirestore
  ) {}

  async canActivate(): Promise<boolean> {
    let user = this.userService.getUser;
    if (!user) {
      let contador = 0;
      while (!user && contador <= 6000) {
        await new Promise((resolve) => setTimeout(() => {
          resolve(true);
          contador += 100;
        }, 100));
        user = this.userService.getUser;
      }
    }
    return user.getIdTokenResult().then(result => {
      if (!result.claims || !result.claims.role || !result.claims.domain) { return false; }
      return this.firestore.collection(result.claims.domain).doc('configuration').ref.get().then(doc => {
        if (!doc.exists) { return false; }
        const data: any = doc.data();
        const permissions: ModulePermissions = data.modulePermissions;
        if (permissions.administrativo) {
          return true;
        } else if (permissions.analytics) {
          this.router.navigateByUrl('/analytics');
        }
        this.router.navigateByUrl('/login');
        return false;
      }).catch(error => {
        console.log('error get module permissions --> ', error);
        return false;
      });
    });
  }
}