import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { ModulePermissions } from "../models/configuracao.interface";

@Injectable({
  providedIn: 'root'
})
export class DomainService {
  private modulePermissions: ModulePermissions = null;
  public get getModulePermissions(): ModulePermissions {
    return this.modulePermissions;
  }

  constructor(private firestore: AngularFirestore) {}

  public retrieveModulePermissions(domain: string): Promise<boolean> {
    return this.firestore.collection(domain).doc('configuration').ref.get().then(doc => {
      if (!doc.exists) { return false; }
      const data: any = doc.data();
      this.modulePermissions = data.modulePermissions;
      return true;
    }).catch(error => {
      console.log('error get module permissions --> ', error);
      return false;
    });
  }
}
