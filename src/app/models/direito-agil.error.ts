import { DirAgilResponseCode } from "./direito-agil.response";

export interface DirAgilError {
  data: number;
  code: DirAgilResponseCode;
  message: string;
  space: 'client' | 'server';
  domain: string;
}
