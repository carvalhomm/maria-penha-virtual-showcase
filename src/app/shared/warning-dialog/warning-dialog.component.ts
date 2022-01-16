import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'mpv-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string, message: string }) { }

  ngOnInit(): void {
  }

}
