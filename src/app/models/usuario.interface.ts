import { Pessoa } from './pessoa.interface';
import { Relacionamento } from './relacionamento.interface';
import { TipoViolencia } from './violencia.interface';
import { Seguranca } from './seguranca.interface';

export interface Usuario extends Pessoa, Relacionamento, TipoViolencia, Seguranca {
  telefones: string[];
  identificacaoSexual: 'Cis' | 'Trans';
  deficiencias?: string[];
  filhos?: number;
  dataAgressao: Date;
  horaAgressao: string;
  relatoViolencia: string;
  localAgressao: {
    cep: string,
    uf: string,
    cidade: string,
    bairro: string,
    endereco: string,
  };
  midias?: Attachment[];
}

export interface Attachment {
  path: string;
  originalName: string;
}
