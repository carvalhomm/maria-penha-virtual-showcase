import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { Documento } from 'src/app/models/documento.interface';
import { DenunciaUpdateEvent } from 'src/app/models/update-denuncia.interface';
import { UserService } from 'src/app/services/user.service';

@Injectable({providedIn: 'root'})
export class DecisionMakerService {
  private documento: Documento = null;
  private documentoId: string;
  public get getDocumento() {
    return this.documento;
  }
  public get getDocumentoId(): string {
    return this.documentoId;
  }
  public set setDocumentoId(id: string) {
    this.documentoId = id;
  }
  public set setDocumento(documento: Documento) {
    this.documento = documento;
  }
  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  private getDocument(id: string): Promise<Documento> {
    return this.firestore.collection(this.userService.getUserClaims.domain).doc('pedidos').collection('feitos').doc(id).ref.get().then(doc => {
      return doc.exists ? doc.data() as Documento : null;
    });
  }

  private getPath(collectionStatus: 'feitos' | 'completos', id: string): AngularFirestoreDocument<DocumentReference> {
    return this.firestore.collection(this.userService.getUserClaims.domain).doc('pedidos').collection(collectionStatus).doc(id);
  }

  private getCompletedDenuncia() {
    const documento = this.documento;
    return {
      ...documento,
      pedidoAnalisado: {
        juizResponsavel: this.userService.getUserId,
        nomeJuizResponsavel: this.userService.getUserName,
        data: new Date()
      }
    };
  }

  public async getDenuncia(id: string): Promise<Documento> {
    if (!id) { return Promise.resolve(null); }
    this.documentoId = id;
    const doc = await this.getDocument(id);
    this.documento = doc;
    return doc;
  }

  public updateDenuncia(dataUpdate: DenunciaUpdateEvent): boolean {
    if (!dataUpdate || !dataUpdate.update || !dataUpdate.innerKey) { return false; }
    if (this.documento && this.documento[dataUpdate.innerKey] && typeof this.documento[dataUpdate.innerKey] === 'object') {
      const object: any = this.documento[dataUpdate.innerKey];
      this.documento[dataUpdate.innerKey as string] = {...object, ...dataUpdate.update};
    } else {
      this.documento[dataUpdate.innerKey as string] = dataUpdate.update;
    }
    return true;
  }

  public saveDenuncia(): Promise<{status: boolean, message: string}> {
    const userRole = this.userService.getUserClaims.role;
    if (userRole === 'analista') {
      const documento = this.documento;
      return this.getPath('feitos', this.documentoId).ref.update(documento).then(() => {
        return {status: true, message: 'Alterações salvas com sucesso'};
      }).catch(err => {
        console.log('error updating document --> ', err);
        return {status: false, message: 'Erro na atualização das informações. Tente novamente.'};
      });
    } else {
      return Promise.resolve({status: false, message: 'Você não tem permissão para realizar essa operação'});
    }
  }

  public completeDenuncia(): Promise<{status: boolean, message: string}> {
    const userRole = this.userService.getUserClaims.role;
    if (userRole === 'direitoAgil' || userRole === 'juiz') {
      return this.getPath('feitos', this.documentoId).ref.update({...this.getCompletedDenuncia(), done: true}).then(() => {
        return this.getPath('completos', this.documentoId).ref.set(this.getCompletedDenuncia() as any).then(() => {
          return {status: true, message: 'Decisão feita'};
        });
      }).catch(err => {
        console.log('error completando denuncia --> ', err);
        return {status: true, message: 'Erro na completando a decisão. Tente novamente.'};
      });
    } else {
      return Promise.resolve({status: false, message: 'Você não tem permissão para realizar essa operação'});
    }
  }
}
