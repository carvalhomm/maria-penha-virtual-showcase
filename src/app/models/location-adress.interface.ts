export interface LocationAddress {
  endereco: string;
  localizacao: any;
  endereco_map: {
    rua: { long_name: string, short_name: string, types: string[] },
    bairro: { long_name: string, short_name: string, types: string[] },
    cidade: { long_name: string, short_name: string, types: string[] },
    estado: { long_name: string, short_name: string, types: string[] }
  };
}
