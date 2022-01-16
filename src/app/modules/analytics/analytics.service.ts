import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";
import { DirAgilResponse } from "src/app/models/direito-agil.response";
import { AngularFirestore } from "@angular/fire/firestore";
import { firstValueFrom } from "rxjs";

@Injectable()
export class AnalyticsService {
  constructor(private http: HttpClient, private userService: UserService, private firestore: AngularFirestore) {}

  public async getAnalyticsData(minRange: string, maxRange: string, decision: string, juizado: string): Promise<HttpEvent<DirAgilResponse>> {
    const token = await this.userService.getIdToken();
    const headers: any = {
      headers: {
        authorization: `${token}`
      }
    };
    return firstValueFrom(this.http.get<DirAgilResponse>(
      `${environment.urlEndpoint}/analytics/fetch-data?domain=${this.userService.getUserClaims.domain}&comarca=${juizado}&decisao=${decision}&minRange=${minRange}&maxRange=${maxRange}`,
      headers
    ));
  }

  public getComarcas(domain: string) {
    this.firestore.collection(domain).doc('configuration').collection('juizados').ref.get().then(comarcas => {

    });
  }
}