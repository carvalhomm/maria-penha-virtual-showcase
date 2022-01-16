import { Component, OnInit } from '@angular/core';
import { Juizado } from 'src/app/models/juizado.interface';
import { ILocation } from 'src/app/models/location.interface';
import { IProfessionalUser } from 'src/app/models/professional-user.interface';
import { UserService } from 'src/app/services/user.service';
import { ConfiguracoesService } from './configuraoes.service';

@Component({
  selector: 'mpv-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
  providers: [ConfiguracoesService]
})
export class ConfiguracoesComponent implements OnInit {
  private locations: ILocation;
  public get getLocations(): ILocation {
    return this.locations;
  }
  private users: IProfessionalUser[];
  public get getUsers(): IProfessionalUser[] {
    return this.users;
  }
  private juizados: Juizado[];
  public get getJuizados(): Juizado[] {
    return this.juizados;
  }
  public admin: boolean;
  constructor(private userService: UserService, private configService: ConfiguracoesService) { }

  ngOnInit(): void {
    this.admin = this.userService.getUserClaims.admin;
    this.retrieveData();
  }

  private retrieveData() {
    const domain = this.userService.getUserClaims.domain;
    this.configService.getLocations(domain).then((locations: ILocation) => this.locations = locations);
    this.configService.getComarcas(domain).then((juizados: Juizado[]) => this.juizados = juizados);
    this.configService.getUsers(domain).then((users: IProfessionalUser[]) => this.users = users);
  }

}
