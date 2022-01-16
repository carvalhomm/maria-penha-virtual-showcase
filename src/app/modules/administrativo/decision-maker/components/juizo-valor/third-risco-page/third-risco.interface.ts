export interface ThirdRisco {
  afastamentoDomicilio: {label: string, marked: boolean};
  educacaoRecuperacao: {label: string, marked: boolean};
  pensao: {label: string, marked: boolean};
  proibicaoDeContato: {label: string, marked: boolean};
  suspensaoPorteArma: {label: string, marked: boolean};
  suspensaoVisitaFilhos: {label: string, marked: boolean};
  outrasMedidasDeferidas?: {[key: string]: {label: string, marked: boolean}};
}
