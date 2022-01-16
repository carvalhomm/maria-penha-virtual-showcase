import { Agressor } from "./agressor.interface";
import { Juiz } from "./Juiz.interface";
import { Usuario } from "./usuario.interface";

export interface DocumentoDenuncia {
  agressor: Agressor;
  dataCriacao: number;
  usuario: Usuario;
  juiz?: Juiz;
  numeroProcesso?: number;
}
