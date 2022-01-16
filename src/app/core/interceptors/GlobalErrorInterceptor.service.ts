import { HttpClient } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { firstValueFrom } from 'rxjs';
import { DirAgilError } from 'src/app/models/direito-agil.error';
import { UserService } from 'src/app/services/user.service';
import { WarningDialogComponent } from 'src/app/shared/warning-dialog/warning-dialog.component';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class GlobalErrorInterceptor implements ErrorHandler {
  constructor(private dialog: MatDialog, private http: HttpClient, private userService: UserService) {}

  public handleError(error) {
    this.dialog.open(WarningDialogComponent, {
      data: {title: 'Erro Inesperado na Aplicação', message: 'Um erro inesperado aconteceu. Por favor, tente novamente mais tarde ou abra um chamado sobre o problema.\n\n Código do erro: ' + error}
    });
    this.userService.getIdToken().then(token => {
      const bodyError: DirAgilError = {
        data: new Date().getTime(),
        code: 'client/error',
        domain: this.userService.getUserClaims.domain,
        message: error,
        space: 'client'
      };
      firstValueFrom(this.http.post(environment.urlEndpoint + '/errors/save-error', { bodyError: bodyError }, {headers: {authorization: token}}));
    }).catch(errToken => {
      console.error('error getting token --> ', errToken);
    });
  }
}