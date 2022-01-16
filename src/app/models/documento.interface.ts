import { Agressor } from './agressor.interface';
import { Usuario } from './usuario.interface';
import { Juiz } from "./Juiz.interface";

export interface Documento {
    usuario: Usuario;
    agressor: Agressor;
    dataCriacao: Date;
    juizadoResponsavel: string;
    juiz?: Juiz;
    numeroProcesso?: number;
    pedidoAnalisado?: {
        juizResponsavel: string;
        nomeJuizResponsavel: string;
        data: Date;
    };
}
