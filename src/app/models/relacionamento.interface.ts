export interface Relacionamento {
  tipoRelacionamento: TipoRelacionamento | string;
}

export type TipoRelacionamento = 'Casamento' | 'União Estável' | 'Namoro' | 'Parentesco' ;
