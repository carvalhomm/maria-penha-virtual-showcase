import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { firstValueFrom, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DirAgilError } from "src/app/models/direito-agil.error";
import { DirAgilResponse, DirAgilResponseCode } from "src/app/models/direito-agil.response";
import { UserService } from "src/app/services/user.service";
import { WarningDialogComponent } from "src/app/shared/warning-dialog/warning-dialog.component";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'root'})
export class GlobalHttpInterceptor implements HttpInterceptor {
  private errorLibrary: {[key: string]: {title: string; message: string}} = {
    'auth/forbidden': { title: 'Erro de Permissão de Acesso', message: 'Você tentou acessar um recurso de acesso restrito.' },
    'auth/user-not-found': { title: 'Erro de Permissão de Acesso', message: 'O seu usuário não foi encontrado na base de dados ou não tem token de acesso válido. Verifique se você está logado com as credencias corretas.' },
    'auth/user-not-has-permission': { title: 'Erro de Permissão de Acesso', message: 'O seu usuário não tem permissão de acesso ao recurso solicitado. Se você acha que deveria ter permissão, peça ao seu administrador.' },
    'client/mandatory-field-missing': { title: 'Erro no Sistema do Cliente', message: 'Você enviou uma requisição faltando alguma informação obrigatória. Verifique se você preencheu todos os campos corretamente e se a configuração da sua conta está correta.' },
    'config/user-not-has-domain': { title: 'Erro de Configuração do Domínio', message: 'O seu usuário não tem um domínio cadastrado. Por favor peça ao seu administrador para corrigir o seu cadastro.' },
    'config/module-not-has-configurations': { title: 'Erro de Configuração do Domínio', message: 'O seu domínio não tem configurações cadastradas corretamente. Por favor contate o administrador do seu domínio.' },
    'config/not-has-module-permissions': { title: 'Erro de Configuração do Domínio', message: 'O seu domínio não tem permissões de acesso aos módulos corretamente configuradas. Por favor contate o administrador do seu domínio.' },
    'server/error': { title: 'Erro no Servidor', message: 'Erro executando a requisição no servidor. Por favor tente novamente mais tarde. Caso o erro persista, contate o suporte.' }
  };
  constructor(private dialog: MatDialog, private userService: UserService, private http: HttpClient) {}

  private logError(code: DirAgilResponseCode, data: string) {
    this.userService.getIdToken().then(token => {
      const bodyError: DirAgilError = {
        data: new Date().getTime(),
        code: code,
        domain: this.userService.getUserClaims.domain,
        message: data,
        space: 'server'
      };
      firstValueFrom(this.http.post(environment.urlEndpoint + '/errors/save-error', { bodyError: bodyError }, {headers: {authorization: token}}));
    }).catch(errToken => {
      console.error('error getting token --> ', errToken);
    });
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<DirAgilResponse | ArrayBuffer>> {
    return next.handle(request).pipe(map((resp) => {
      if (resp instanceof HttpResponse) {
        if (resp.body.status && resp.body.status === 'ERROR') {
          const response = resp.body as DirAgilResponse;
          const error = response.code ? this.errorLibrary[response.code] : {title: 'ERRO NA CONSULTA', message: resp.statusText};
          this.dialog.open(WarningDialogComponent, {
            data: {title: error.title, message: error.message}
          });
          this.logError(response.code, error.message);
        } else if (!resp.ok) {
          this.dialog.open(WarningDialogComponent, {
            data: {title: 'ERRO NA CONSULTA', message: resp.statusText}
          });
          this.logError('server/error', resp.statusText);
        }
        return resp;
      }
    }));
  }
}
