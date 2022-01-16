import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { DirAgilResponse } from 'src/app/models/direito-agil.response';
import { firstValueFrom } from 'rxjs';
import { IProfessionalUser, ProfessionalUser } from 'src/app/models/professional-user.interface';

@Injectable()
export class UserFormService {
  constructor(private http: HttpClient, private userService: UserService) {}

  public async saveUser(user: IProfessionalUser | ProfessionalUser, create: boolean): HttpEvent<DirAgilResponse> {
    const token = await this.userService.getIdToken();
    const headers: any = {
      headers: {
        authorization: `${token}`
      }
    };
    if (create) {
      return firstValueFrom(this.http.post(
        `${environment.urlEndpoint}/accounts/create`,
        {
          ...user,
          domain: this.userService.getUserClaims.domain,
        },
        headers
      ));
    } else {
      return firstValueFrom(this.http.post(
        `${environment.urlEndpoint}/accounts/update-claims`,
        {
          ...user,
          domain: this.userService.getUserClaims.domain,
          updateUserFields: {displayName: user.name, email: user.email}
        },
        headers
      ));
    }
  }

  public async deleteUser(uid: string) {
    const token = await this.userService.getIdToken();
    const headers: any = {
      headers: {
        authorization: `${token}`
      }
    };
    return firstValueFrom(this.http.post(
      `${environment.urlEndpoint}/accounts/delete`,
      {
        uid,
        domain: this.userService.getUserClaims.domain,
      },
      headers
    ));
  }
}