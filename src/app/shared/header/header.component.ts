import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'mpv-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private sidebarService: SidebarService) { }
  ngOnInit(): void {}

  public openSidebar() {
    this.sidebarService.sidebarStatusObservable.next(true);
  }

  public isNotInLoginPage(): boolean {
    return !location.href.includes('/login');
  }

}
