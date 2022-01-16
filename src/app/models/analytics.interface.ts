export interface AnalyticsConvoy {
  totalPedidosFeitos: number;
  totalPedidosDeferidos: number;
  totalPedidosIndeferidos: number;
  pedidosFeitosBairro: {name: string, value: number}[];
  violenciasPedidosFeitos: {name: string, value: number}[];
  perfisAgressorPedidosFeitos: {name: string, value: number}[];
  relacionamentosPedidosFeitos: {name: string, value: number}[];
  medidasAnterioresPedidosFeitos: {name: string, value: number}[];
}

export interface ChartData {
  chartType: ChartType;
  data: {name: string, value: number}[] | number;
}

export type ChartType = 'text' | 'line' | 'pie' | 'vertical-bar' | 'horizontal-bar' | 'area' | 'gauge';