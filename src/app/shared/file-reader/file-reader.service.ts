import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";
import { UserService } from "src/app/services/user.service";
import { environment } from "src/environments/environment";

@Injectable({providedIn: 'platform'})
export class FileReaderService {
  constructor(private storage: AngularFireStorage, private http: HttpClient, private userService: UserService) {}

  private downloadFile(path: string): Promise<string> {
    return this.storage.ref(path).getDownloadURL().toPromise();
  }

  public download(path: string) : Promise<string> {
    return this.downloadFile(path);
  }

  public downloadBlobFile(path: string): Promise<ArrayBuffer> {
    return this.userService.getIdToken().then(idToken => {
      const headers: any = {
        responseType: 'arraybuffer',
        headers: {
          authorization: `${idToken}`
        }
      };
      return this.http.get(environment.urlEndpoint + '/files/download' + `?path=${path}`, headers).toPromise().then(file => {
        return file;
      }).catch(error => {
        console.log('error in endpoint --> ', error);
        return null;
      });
    }).catch(err => {
      console.log('error retrieving token --> ', err);
      return null;
    });
  }
}
