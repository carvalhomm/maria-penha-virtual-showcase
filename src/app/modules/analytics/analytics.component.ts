import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnalyticsConvoy, ChartData } from 'src/app/models/analytics.interface';
import { DirAgilResponse } from 'src/app/models/direito-agil.response';
import { AnalyticsService } from './analytics.service';

@Component({
  selector: 'mpv-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  providers: [AnalyticsService]
})
export class AnalyticsComponent implements OnInit {
  public formGroup: FormGroup;
  public totalPedidosIndeferidos: ChartData = null;
  public totalPedidosDeferidos: ChartData = null;
  public totalPedidosFeitos: ChartData = null;
  public pedidosPorBairro: ChartData = null;
  public perfilAgressorPorPedido: ChartData = null;
  public relacionamentoAgressorPorPedido: ChartData = null;
  public medidasAnterioresPorPedido: ChartData = null;
  constructor(private fb: FormBuilder, private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.initForm();
    this.getAnalyticsData();
  }

  private initForm() {
    this.formGroup = this.fb.group({
      minRange: [null],
      maxRange: [null],
      decisionFilter: [false],
      juizado: ['ALL']
    });
  }

  private setupCharts(analytics: AnalyticsConvoy) {
    this.totalPedidosFeitos = {chartType: 'text', data: analytics.totalPedidosFeitos};
    this.totalPedidosDeferidos = {chartType: 'text', data: analytics.totalPedidosDeferidos};
    this.totalPedidosIndeferidos = {chartType: 'text', data: analytics.totalPedidosIndeferidos};
    this.pedidosPorBairro = {chartType: 'vertical-bar', data: analytics.pedidosFeitosBairro};
    this.perfilAgressorPorPedido = {chartType: 'vertical-bar', data: analytics.perfisAgressorPedidosFeitos};
    this.relacionamentoAgressorPorPedido = {chartType: 'vertical-bar', data: analytics.relacionamentosPedidosFeitos};
    this.medidasAnterioresPorPedido = {chartType: 'pie', data: analytics.medidasAnterioresPedidosFeitos};
  }

  public refreshFilters() {
    this.formGroup.get('minRange').reset();
    this.formGroup.get('maxRange').reset();
    this.formGroup.get('decisionFilter').reset();
    this.formGroup.get('juizado').reset();
    this.getAnalyticsData();
  }

  public getAnalyticsData() {
    const minRange = this.formGroup.get('minRange').value ? `${this.formGroup.get('minRange').value.getTime()}` : '*';
    const maxRange = this.formGroup.get('maxRange').value ? `${this.formGroup.get('maxRange').value.getTime()}` : '*';
    const decisionFilter = this.formGroup.get('decisionFilter').value;
    const juizado = this.formGroup.get('juizado').value;
    this.analyticsService.getAnalyticsData(minRange, maxRange, decisionFilter ? 'True' : 'False', juizado).then(response => {
      console.log('resposta analytics ----> ', response);
      const resp = (response as any) as DirAgilResponse;
      if (resp.status === 'OK') {
        this.setupCharts(resp.data as AnalyticsConvoy);
      }
    }).catch(error => {
      console.log('error getting analytics data --> ', error);
    });
  }

}
