import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Documento } from 'src/app/models/documento.interface';
import { UserService } from 'src/app/services/user.service';
import { IdDocumento } from './processos.component';

@Injectable()
export class ProcessosService {

  constructor(private firestore: AngularFirestore, private userService: UserService) {}

  private generateDocument(id: string, doc: Documento): IdDocumento {
    const timestampDate = doc.dataCriacao as any;
    return {...doc, id, dataCriacao: timestampDate.toDate() };
  }

  public getProcessos(mode: string, juizado: string): Promise<IdDocumento[]> {
    if (juizado === '') {
      return this.firestore.collection(this.userService.getUserClaims.domain).doc('pedidos').collection(mode).ref.where('done', '!=', true).orderBy('dataCriacao', 'desc').get().then(processosDoc => {
        if (processosDoc.empty) { return []; }
        const processos: IdDocumento[] = [];
        for (const doc of processosDoc.docs) {
          const dados = doc.data() as Documento;
          processos.push(this.generateDocument(doc.id, dados));
        }
        return processos;
      }).catch(error => {
        console.log('error getting processos list --> ', error);
        return null;
      });
    } else {
      return this.firestore.collection(this.userService.getUserClaims.domain).doc('pedidos').collection(mode).ref.where('done', '!=', true).where('juizadoResponsavel', '==', juizado).orderBy('dataCriacao', 'desc').get().then(processosDoc => {
        if (processosDoc.empty) { return []; }
        const processos: IdDocumento[] = [];
        for (const doc of processosDoc.docs) {
          const dados = doc.data() as Documento;
          processos.push(this.generateDocument(doc.id, dados));
        }
        return processos;
      }).catch(error => {
        console.log('error getting processos list --> ', error);
        return null;
      });
    }
  }
}
