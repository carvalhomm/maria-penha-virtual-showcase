import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { DirAgilResponse } from "src/app/models/direito-agil.response";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Injectable()
export class PassFormService {
    constructor(private http: HttpClient, private userService: UserService) {}

    public async setNewPassword(password: string): Promise<HttpEvent<DirAgilResponse>> {
        const token = await this.userService.getIdToken();
        const headers: any = {
            headers: {
                authorization: `${token}`
            }
        };
        return firstValueFrom(this.http.post<DirAgilResponse>(
            `${environment.urlEndpoint}/accounts/change-password`,
            {
                uid: this.userService.getUserId,
                updateUserFields: {password}
            },
            headers
        ));
    }
}