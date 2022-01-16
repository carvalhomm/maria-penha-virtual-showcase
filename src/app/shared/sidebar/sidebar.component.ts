import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DomainService } from 'src/app/services/domain.service';
import { UserService } from 'src/app/services/user.service';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'mpv-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private defaultModules = { 'configuracoes': true };
  private sidebarObservable: Subscription;
  @ViewChild('sidenav') public sidebar: MatSidenav;
  constructor(private userService: UserService, private router: Router, private sidebarService: SidebarService,
    private domainService: DomainService) { }

  ngOnInit(): void {
    this.listenToSidebarChanges();
  }

  ngOnDestroy(): void {
    this.sidebarObservable.unsubscribe();
  }

  private listenToSidebarChanges() {
    this.sidebarObservable = this.sidebarService.sidebarStatusObservable.subscribe((next) => {
      if (next === undefined) { return; }
      if (this.sidebar.opened) {
        this.sidebar.close();
      } else {
        this.sidebar.open();
      }
    });
  }

  public hasPermission(key: string): boolean {
    if (!this.domainService.getModulePermissions) { return false; }
    return this.domainService.getModulePermissions[key] || this.defaultModules[key];
  }

  public close() {
    this.sidebar.close();
  }

  public navigateTo(route: string) {
    if (this.hasPermission(route)) {
      this.router.navigateByUrl(route);
      this.close();
    }
  }

  public async logout() {
    await this.userService.logout();
    this.router.navigateByUrl('/login');
    this.close();
  }

}
