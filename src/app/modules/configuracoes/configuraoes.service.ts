import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable()
export class ConfiguracoesService {
    constructor(private firestore: AngularFirestore) {}

    public getLocations(domain: string) {
        this.firestore.collection(domain).doc('configuration').collection('locations').ref.get().then(states => {

        });
    }

    public getComarcas(domain: string) {
        this.firestore.collection(domain).doc('configuration').collection('juizados').ref.get().then(comarcas => {

        });
    }

    public getUsers(domain: string) {
        this.firestore.collection(domain).doc('configuration').collection('users').ref.get().then(users => {

        });
    }
}