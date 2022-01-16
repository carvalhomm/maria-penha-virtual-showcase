export interface Juiz {
  violenciasSofridas?: {
    violenciaMoral?: boolean;
    violenciaSexual?: boolean;
    violenciaPatrimonial?: boolean;
    violenciaFisica?: boolean;
    violenciaPsicologica?: boolean;
  };
  violenciasFisicasSofridas?: string[];
  comportamentosAgressor?: {
    agressivo: boolean;
    ciumento: boolean;
    controlador: boolean;
    crimeOrganizado: boolean;
    usaAlcool: boolean;
    usaDrogas: boolean;
  };
  decisaoJuiz?: {decideNow: boolean, waitForContraditory: boolean};
  riscoViolencia?: boolean;
  perfilRequerido?: boolean;
  casoAutos?: string;
  medidasDeferidas?: {[key: string]: {label: string, marked: boolean}};
  minutaDecisao?: string;
}