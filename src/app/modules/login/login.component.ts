import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DomainService } from 'src/app/services/domain.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'mpv-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loading = false;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder, private userService: UserService, private domainService: DomainService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initFormGroup();
  }

  private initFormGroup() {
    this.formGroup = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      pass: [null, [Validators.required]]
    });
  }

  public login() {
    if (this.loading) { return; }
    this.loading = true;
    const form = this.formGroup.getRawValue();
    this.userService.login(form.email, form.pass).then(result => {
      this.loading = false;
      if (result) {
        const modules = this.domainService.getModulePermissions;
        if (modules.administrativo) {
          this.router.navigate(['administrativo']);
        } else if (modules.analytics) {
          this.router.navigate(['analytics']);
        }
      } else {
        this.snackBar.open('Email ou senha inválidos', null, {duration: 5000});
      }
    });
  }

  public forgotPassword() {
    if (this.formGroup.get('email').invalid) {
      this.snackBar.open('Por favor preencha o campo de email para recuperar sua senha', null, {duration: 5000});
    }
    const email = this.formGroup.get('email').value;
    this.userService.emailResetPassword(email).then(() => {
      this.snackBar.open('Email de recuperação de senha enviado com sucesso', null, {duration: 5000});
    }).catch(() => {
      this.snackBar.open('Erro ao enviar email de recuperação de senha. Por favor confirme as informações e tente novamente.', null, {duration: 5000});
    });
  }

}
