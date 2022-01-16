import { Pessoa } from './pessoa.interface';

export interface Agressor extends Pessoa {
  usaDrogas: boolean;
  usaAlcool: boolean;
  agressivo: boolean;
  controlador: boolean;
  ciumento: boolean;
  crimeOrganizado: boolean;
}
