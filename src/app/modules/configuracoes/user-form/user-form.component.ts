import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Juizado } from 'src/app/models/juizado.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ILocation } from 'src/app/models/location.interface';
import { IProfessionalUser, ProfessionalUser } from 'src/app/models/professional-user.interface';
import { UserRole } from 'src/app/models/UserClaims.interface';
import { UserFormService } from './user-form.service';

@Component({
  selector: 'mpv-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  @Input() mode(mode: boolean) {
    this.createMode = mode;
  }
  @Input() set setLocations(locations: ILocation) {
    this.locations = locations;
    if (this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initFormGroup(null);
    } else if (!this.createMode && this.locations && this.users && this.juizados) {
      this.loading = false;
      this.initUserSelect();
    }
  }
  @Input() set setJuizados(juizados: Juizado[]) {
    this.juizados = juizados;
    if (this.createMode && this.locations && this.juizados) {
      this.loading = false;
      this.initFormGroup(null);
    } else if (!this.createMode && this.locations && this.users && this.juizados) {
      this.loading = false;
      this.initUserSelect();
    }
  }
  @Input() set setUsers(users: IProfessionalUser[]) {
    this.users = users;
    if (!this.createMode && this.locations && this.users && this.juizados) {
      this.loading = false;
      this.initUserSelect();
    }
  }
  public createMode: boolean;
  public roles: UserRole[] = ['juiz', 'analista', 'ti'];
  public locations: ILocation;
  public juizados: Juizado[];
  public users: IProfessionalUser[];
  public user: IProfessionalUser;
  public loading: boolean = true;
  public selectUserForm: FormGroup;
  public formGroup: FormGroup;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private userFormService: UserFormService) { }

  ngOnInit(): void {}

  private initUserSelect() {
    this.selectUserForm = this.fb.group({
      userSelection: [{value: null, disabled: false}, [Validators.required]]
    });
  }

  private initFormGroup(user: IProfessionalUser) {
    this.formGroup = this.fb.group({
      name: [user ? user.name : null, [Validators.required]],
      email: [user ? user.email : null, [Validators.required, Validators.email]],
      admin: [user ? user.admin : null, [Validators.required]],
      state: [user ? user.state : null, [Validators.required]],
      city: [user ? user.city : null, [Validators.required]],
      role: [user ? user.role : null, [Validators.required]],
      password: [null, !user ? [Validators.required] : undefined],
      juizadoResponsavel: [user ? user.juizadoResponsavel : null]
    });
    this.adminSelected();
  }

  public userSelected(user: IProfessionalUser) {
    console.log(this.selectUserForm);
    this.user = user;
    this.initFormGroup(user);
  }

  public adminSelected() {
    const control = this.formGroup.get('admin');
    if (control.value) {
      this.formGroup.get('state').disable();
    } else {
      this.formGroup.get('state').enable();
    }
  }

  public saveUser() {
    if (this.formGroup.invalid) { return; }
    const user = this.formGroup.getRawValue();
    if (user.admin) {
      user.juizadoResponsavel = '';
    }
    if (!this.createMode) {
      delete user.password;
    }
    this.userFormService.saveUser(user, this.createMode).then(() => {
      this.snackBar.open('Usuário salvo com sucesso', null, {duration: 5000})
    });
  }

  public deleteUser() {
    if (this.createMode) { return; }
    if (this.formGroup.invalid) { return; }
    this.userFormService.deleteUser(this.user.uid).then(() => {
      this.snackBar.open('Usuário deletado com sucesso', null, {duration: 5000})
    });
  }

}
