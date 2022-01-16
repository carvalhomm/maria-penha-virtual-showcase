export interface TipoViolencia {
  tapas: boolean;
  puxaoCabelo: boolean;
  empurrao: boolean;
  esganadura: boolean;
  queimadura: boolean;
  afogamento: boolean;
  estrangulamento: boolean;
  empurraoCabelo: boolean;
  socosChutes: boolean;
  porrete: boolean;
  revolver: boolean;
  outros: boolean;
  maisDetalhes?: string;
  violenciaMoral?: boolean;
  violenciaSexual?: boolean;
  violenciaPatrimonial?: boolean;
  violenciaFisica?: boolean;
  violenciaPsicologica?: boolean;
  violenciasFisicasSofridas?: string[];
}
