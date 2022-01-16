import { Injectable } from "@angular/core";
import { HttpClient, HttpEvent } from "@angular/common/http";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";
import { DirAgilResponse } from "src/app/models/direito-agil.response";
import { firstValueFrom } from "rxjs";
import { Juizado } from '../../../models/juizado.interface';

@Injectable()
export class ComarcaFormService {

  constructor(private http: HttpClient, private userService: UserService) {}

  public async saveComarca(juizado: Juizado): HttpEvent<DirAgilResponse> {
    const token = await this.userService.getIdToken();
    const headers: any = {
      headers: {
        authorization: `${token}`
      }
    };
    return firstValueFrom(this.http.post(`${environment.urlEndpoint}/juizados/manage`, {juizado}, headers));
  }

  public async deleteComarca(juizado: Juizado): HttpEvent<DirAgilResponse> {
    const token = await this.userService.getIdToken();
    const headers: any = {
      headers: {
        authorization: `${token}`
      }
    };
    return firstValueFrom(this.http.post(`${environment.urlEndpoint}/juizados/delete`, {juizado}, headers));
  }

}