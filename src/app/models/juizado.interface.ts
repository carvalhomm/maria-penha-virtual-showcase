export interface Juizado {
  key: string;
  nome: string;
  email?: string;
  juizTitular: string;
  bairrosAbrangidos?: string[];
  cidadesAbrangidas?: string[];
}
