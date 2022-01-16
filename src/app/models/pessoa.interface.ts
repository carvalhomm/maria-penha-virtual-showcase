import { EnderecoModel } from './endereco.model';

export interface Pessoa {
  nomeCompleto: string;
  dataNascimento?: Date;
  cpf?: string;
  rg?: string;
  email?: string;
  nacionalidade: string;
  corRaca: CorRaca;
  estadoCivil: 'Casada' | 'Solteira';
  profissao: string;
  endereco: EnderecoModel;
}

export type CorRaca = 'branca' | 'parda' | 'preta' | 'amarelaOriental' | 'indigena';
