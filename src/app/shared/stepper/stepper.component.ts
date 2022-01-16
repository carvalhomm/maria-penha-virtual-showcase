import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mpv-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  @Input() public set setPage(page: number) {
    this.page = page;
  }
  @Input() public set setProcesso(processo: string) {
    this.processo = processo;
  }
  @Input() public set setTipo(tipo: string) {
    this.tipo = tipo;
  }
  public page: number;
  public processo: string;
  public tipo: string;
  constructor() { }

  ngOnInit(): void {
  }

}
