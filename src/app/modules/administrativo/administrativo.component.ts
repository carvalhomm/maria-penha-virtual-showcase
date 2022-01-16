import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mpv-administrativo',
  templateUrl: './administrativo.component.html',
  styleUrls: ['./administrativo.component.scss'],
})
export class AdministrativoComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {}

  public enterProcessosPage(mode: string) {
    this.router.navigate(['/administrativo/processos'], {state: {mode}});
  }
}
