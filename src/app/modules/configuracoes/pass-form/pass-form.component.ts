import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PassFormService } from './pass-form.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'mpv-pass-form',
  templateUrl: './pass-form.component.html',
  styleUrls: ['./pass-form.component.scss'],
  providers: [PassFormService]
})
export class PassFormComponent implements OnInit {
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder, private passService: PassFormService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      pass: [null, [Validators.required]]
    });
  }

  createNewPassword() {
    if (this.formGroup.get('pass').invalid) {
      this.formGroup.get('pass').markAsTouched();
      return;
    }
    this.passService.setNewPassword(this.formGroup.get('pass').value),then(() =>
      this.snackBar.open('Senha alterada com sucesso', null, {duration: 5000})
    );
  }

}
