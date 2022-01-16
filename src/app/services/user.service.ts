import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserClaims } from '../models/UserClaims.interface';
import { map, takeUntil } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { DomainService } from './domain.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private userId: string;
  private user: firebase.default.User;
  private userClaims: UserClaims;
  private userName: string;
  private onDestroy = new Subject<void>();
  public get getUserId(): string {
    return this.userId;
  }
  public get getUser(): firebase.default.User {
    return this.user;
  }
  public get getUserName(): string {
    return this.userName;
  }
  public get getUserClaims(): UserClaims {
    return this.userClaims;
  }

  constructor(private fireAuth: AngularFireAuth, private domainService: DomainService) {}

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  private retrieveUserClaims(user: firebase.default.User): Promise<boolean> {
    return user.getIdTokenResult(true).then(result => {
      if (!result.claims || !result.claims.role || !result.claims.domain) { return false; }
      this.userId = user.uid;
      this.userName = user.displayName;
      this.userClaims = {
        admin: result.claims.admin,
        domain: result.claims.domain,
        role: result.claims.role,
        city: result.claims.city,
        state: result.claims.state,
        juizadoResponsavel: result.claims.juizadoResponsavel
      };
      return this.domainService.retrieveModulePermissions(this.userClaims.domain);
    });
  }

  public getIdToken(): Promise<string> {
    return this.user.getIdToken(true);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.fireAuth.user.pipe(
      takeUntil(this.onDestroy),
      map(user => {
        const loggedIn = user !== null;
        if (loggedIn) {
          this.user = user;
          this.userId = user.uid;
          this.retrieveUserClaims(user);
        }
        return loggedIn;
      })
    );
  }

  public login(email: string, password: string): Promise<boolean> {
    return this.fireAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        this.user = value.user;
        return this.retrieveUserClaims(value.user);
      }).catch(err => {
        console.log('error logging in ----> ', err);
        return false;
      });
  }

  public emailResetPassword(email: string): Promise<boolean> {
    return this.fireAuth.sendPasswordResetEmail(email).then(() => true);
  }

  public logout(): Promise<void> {
    return this.fireAuth.signOut();
  }
}
